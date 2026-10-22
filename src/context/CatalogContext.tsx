import React, { createContext, useContext, useState, useEffect } from 'react';
import { GALLERY_ITEMS, GalleryItem } from '../data/galleryData';

const STORAGE_KEY = 'artemdf_custom_catalog_v2';

interface CatalogContextType {
  items: GalleryItem[];
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  editingItemId: string | null;
  setEditingItemId: (id: string | null) => void;
  updateItem: (id: string, updates: Partial<GalleryItem>) => void;
  updatePrice: (id: string, newPrice: number) => void;
  updatePhoto: (id: string, newImageUrl: string) => void;
  addItem: (item: Omit<GalleryItem, 'id'> & { id?: string }) => GalleryItem;
  deleteItem: (id: string) => void;
  bulkAdjustPrices: (percentage: number, category?: string) => void;
  resetToDefaults: () => void;
  exportCatalogJson: () => void;
  importCatalogJson: (jsonString: string) => { success: boolean; message: string; count?: number };
  lastActionMessage: string | null;
  clearActionMessage: () => void;
}

const CatalogContext = createContext<CatalogContextType | undefined>(undefined);

// Helper to convert Google Drive sharing link to a direct embeddable URL
export function formatDriveOrExternalUrl(url: string): string {
  if (!url) return url;
  const trimmed = url.trim();

  // Check if it's a Google Drive link
  // Formats:
  // https://drive.google.com/file/d/FILE_ID/view...
  // https://drive.google.com/open?id=FILE_ID
  // https://drive.google.com/uc?id=FILE_ID
  // https://docs.google.com/uc?id=FILE_ID
  const driveRegex = /(?:drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?id=|thumbnail\?id=)|docs\.google\.com\/uc\?id=)([a-zA-Z0-9_-]+)/;
  const match = trimmed.match(driveRegex);
  if (match && match[1]) {
    const fileId = match[1];
    // Google's reliable thumbnail / direct CDN format
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }

  // Fallback for general id parameter in Google Drive URLs
  if (trimmed.includes('google.com')) {
    const paramMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (paramMatch && paramMatch[1]) {
      return `https://lh3.googleusercontent.com/d/${paramMatch[1]}`;
    }
  }

  return trimmed;
}

// Helper to compress an uploaded image file to a sensible DataURL size
export async function compressImageFile(file: File, maxWidth = 1200, quality = 0.85): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };
      img.onerror = () => reject(new Error('No se pudo procesar la imagen'));
      img.src = e.target?.result as string;
    };
    reader.onerror = () => reject(new Error('Error al leer el archivo'));
    reader.readAsDataURL(file);
  });
}

export const CatalogProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<GalleryItem[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const existingIds = new Set(parsed.map((i: GalleryItem) => i.id));
          const missingDefaults = GALLERY_ITEMS.filter(gi => !existingIds.has(gi.id));
          return [...parsed, ...missingDefaults];
        }
      }
    } catch (e) {
      console.warn('Error loading custom catalog from localStorage:', e);
    }
    return GALLERY_ITEMS;
  });

  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [lastActionMessage, setLastActionMessage] = useState<string | null>(null);

  // Sync to localStorage whenever items change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error('Error saving catalog to localStorage (storage quota might be exceeded):', e);
    }
  }, [items]);

  const notify = (msg: string) => {
    setLastActionMessage(msg);
    setTimeout(() => {
      setLastActionMessage((current) => (current === msg ? null : current));
    }, 4000);
  };

  const clearActionMessage = () => setLastActionMessage(null);

  const updateItem = (id: string, updates: Partial<GalleryItem>) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const updated = { ...item, ...updates };
          return updated;
        }
        return item;
      })
    );
    notify(`Pieza actualizada correctamente.`);
  };

  const updatePrice = (id: string, newPrice: number) => {
    const validPrice = Math.max(0, Math.round(newPrice));
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, estimatedPriceMxn: validPrice };
        }
        return item;
      })
    );
    const item = items.find((i) => i.id === id);
    notify(`Precio de "${item?.title || id}" actualizado a $${validPrice} MXN`);
  };

  const updatePhoto = (id: string, newImageUrl: string) => {
    const formattedUrl = formatDriveOrExternalUrl(newImageUrl);
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, image: formattedUrl };
        }
        return item;
      })
    );
    const item = items.find((i) => i.id === id);
    notify(`Foto de "${item?.title || id}" actualizada`);
  };

  const addItem = (newItemData: Omit<GalleryItem, 'id'> & { id?: string }): GalleryItem => {
    const id =
      newItemData.id && newItemData.id.trim().length > 0
        ? newItemData.id.trim()
        : `mdf-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;

    const newItem: GalleryItem = {
      ...newItemData,
      id,
      image: formatDriveOrExternalUrl(newItemData.image || '/gallery/artemdf_01_20241026_094119.jpg'),
      estimatedPriceMxn: Math.max(0, Math.round(newItemData.estimatedPriceMxn || 0))
    };

    setItems((prev) => [newItem, ...prev]);
    notify(`Nueva pieza "${newItem.title}" agregada al catálogo.`);
    return newItem;
  };

  const deleteItem = (id: string) => {
    const target = items.find((i) => i.id === id);
    setItems((prev) => prev.filter((i) => i.id !== id));
    notify(`Pieza "${target?.title || id}" eliminada del catálogo.`);
  };

  const bulkAdjustPrices = (percentage: number, category?: string) => {
    if (isNaN(percentage) || percentage === 0) return;
    const factor = 1 + percentage / 100;

    setItems((prev) =>
      prev.map((item) => {
        if (!category || category === 'Todos' || item.category === category) {
          const newPrice = Math.round(item.estimatedPriceMxn * factor);
          return { ...item, estimatedPriceMxn: newPrice };
        }
        return item;
      })
    );
    const catLabel = category && category !== 'Todos' ? `en categoría "${category}"` : 'en todo el catálogo';
    notify(`Precios ajustados ${percentage > 0 ? '+' : ''}${percentage}% ${catLabel}.`);
  };

  const resetToDefaults = () => {
    setItems(GALLERY_ITEMS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    notify(`Catálogo restablecido a las 54 piezas originales de fábrica.`);
  };

  const exportCatalogJson = () => {
    try {
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(items, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute('download', `catalogo_artemdf_${new Date().toISOString().slice(0, 10)}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      notify(`Copia de seguridad del catálogo descargada.`);
    } catch (e) {
      console.error('Error exporting catalog:', e);
      notify(`Error al exportar catálogo.`);
    }
  };

  const importCatalogJson = (jsonString: string): { success: boolean; message: string; count?: number } => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        return { success: false, message: 'El archivo JSON no contiene una lista válida de piezas.' };
      }

      // Basic validation
      const validItems: GalleryItem[] = parsed.filter(
        (it) => it && typeof it === 'object' && typeof it.id === 'string' && typeof it.title === 'string'
      );

      if (validItems.length === 0) {
        return { success: false, message: 'No se encontraron piezas con estructura válida en el archivo.' };
      }

      setItems(validItems);
      notify(`Se importaron ${validItems.length} piezas correctamente.`);
      return { success: true, message: `Se importaron ${validItems.length} piezas con éxito.`, count: validItems.length };
    } catch (e) {
      return { success: false, message: 'El archivo no tiene formato JSON válido.' };
    }
  };

  return (
    <CatalogContext.Provider
      value={{
        items,
        isAdminOpen,
        setIsAdminOpen,
        editingItemId,
        setEditingItemId,
        updateItem,
        updatePrice,
        updatePhoto,
        addItem,
        deleteItem,
        bulkAdjustPrices,
        resetToDefaults,
        exportCatalogJson,
        importCatalogJson,
        lastActionMessage,
        clearActionMessage
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
};

export const useCatalog = () => {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error('useCatalog must be used within a CatalogProvider');
  }
  return context;
};
