import React, { useState, useRef } from 'react';
import { 
  X, 
  Search, 
  Upload, 
  Link as LinkIcon, 
  DollarSign, 
  Sparkles, 
  Check, 
  Trash2, 
  Plus, 
  RotateCcw, 
  Download, 
  FileUp, 
  Star, 
  Eye, 
  Edit3, 
  Percent, 
  AlertTriangle,
  FolderOpen,
  ArrowUpDown,
  Lock,
  LogOut,
  Folder,
  ShieldCheck,
  RefreshCw,
  UserCheck
} from 'lucide-react';
import { useCatalog, compressImageFile, formatDriveOrExternalUrl } from '../context/CatalogContext';
import { useAuth, PRIMARY_ADMIN_EMAIL } from '../context/AuthContext';
import { GoogleSignInButton } from './GoogleSignInButton';
import { GoogleDrivePickerModal } from './GoogleDrivePickerModal';
import { GalleryItem } from '../data/galleryData';

const CATEGORIES = [
  'Todos',
  'Altares & Tradición',
  'Lámparas & Luz',
  'Cajas & Bisagras',
  'Comercial & QR',
  'Navidad & Festivos',
  'Organizadores & Hogar',
  'Eventos & Sacro',
  'Decoración & Arte'
] as const;

export const AdminPanel: React.FC = () => {
  const {
    items,
    isAdminOpen,
    setIsAdminOpen,
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
  } = useCatalog();

  const {
    user,
    loading: authLoading,
    isAdmin,
    adminEmail,
    signInWithGoogle,
    signInWithPassword,
    signOutUser,
    authError,
    clearAuthError,
    accessToken
  } = useAuth();

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Todos');
  const [sortBy, setSortBy] = useState<'name' | 'price-asc' | 'price-desc' | 'featured'>('featured');

  // Modals inside admin
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const [isBulkPriceOpen, setIsBulkPriceOpen] = useState(false);
  const [isBackupOpen, setIsBackupOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<GalleryItem | null>(null);

  // Google Drive Picker modal state
  const [isDrivePickerOpen, setIsDrivePickerOpen] = useState(false);
  const [driveTargetItem, setDriveTargetItem] = useState<GalleryItem | null>(null);

  // Bulk price state
  const [bulkPercent, setBulkPercent] = useState<number>(10);
  const [bulkCategoryTarget, setBulkCategoryTarget] = useState<string>('Todos');

  // Photo URL popover for single item
  const [photoUrlInputId, setPhotoUrlInputId] = useState<string | null>(null);
  const [customUrlValue, setCustomUrlValue] = useState<string>('');

  // Password authentication state
  const [adminPassword, setAdminPassword] = useState<string>('');

  // File input ref for backup import
  const backupFileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isAdminOpen) return null;

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    signInWithPassword(adminPassword);
  };

  // =========================================================================
  // AUTHENTICATION GATE: User must authenticate with password
  // =========================================================================
  if (!isAdmin) {
    return (
      <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
        <div className="bg-[#1C140E] border border-[#3D2C20] w-full max-w-md rounded-2xl shadow-2xl p-6 md:p-8 space-y-6 text-center relative overflow-hidden">
          {/* Top gold bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-600 via-[#E09F3E] to-amber-500" />

          {/* Close button */}
          <button
            onClick={() => setIsAdminOpen(false)}
            className="absolute top-4 right-4 p-2 text-[#8F7D70] hover:text-white rounded-lg hover:bg-[#281E16] transition-colors"
            aria-label="Cerrar ventana de autenticación"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Icon & Title */}
          <div className="flex flex-col items-center gap-3 pt-2">
            <div className="w-16 h-16 rounded-2xl bg-[#E09F3E]/15 border border-[#E09F3E]/30 flex items-center justify-center text-[#E8AF50] shadow-inner">
              <Lock className="w-8 h-8" />
            </div>
            <div>
              <h2 className="font-display font-bold text-xl md:text-2xl text-[#F7EFE6]">
                Acceso de Administrador
              </h2>
              <p className="text-xs text-[#A89485] mt-1">
                Ingresa tu contraseña para gestionar fotos, precios y catálogo de ArteMDF
              </p>
            </div>
          </div>

          {/* Password Form */}
          <form onSubmit={handlePasswordSubmit} className="space-y-4 text-left">
            {authError && (
              <div className="bg-red-950/40 border border-red-900/40 rounded-xl p-3 text-xs text-red-200 text-left flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p>{authError}</p>
                </div>
                <button type="button" onClick={clearAuthError} className="text-red-400 hover:text-white">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs text-[#D8C6B6] font-medium block">
                Contraseña de Administrador:
              </label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Ingresa tu contraseña"
                className="w-full px-3.5 py-3 bg-[#140E0A] border border-[#3D2C20] focus:border-[#E09F3E] rounded-xl text-xs text-[#F7EFE6] placeholder-[#8F7D70] focus:outline-none"
                autoFocus
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#E09F3E] hover:bg-[#ECAE52] text-[#17110C] font-semibold text-xs transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>Entrar al Panel de Control</span>
            </button>

            <p className="text-[11px] text-[#8F7D70] text-center">
              Administrador: {adminEmail}
            </p>
          </form>

          <div className="pt-2 border-t border-[#291C13]">
            <button
              onClick={() => setIsAdminOpen(false)}
              className="text-xs text-[#8F7D70] hover:text-[#D8C6B6] transition-colors"
            >
              ← Volver a explorar el catálogo público
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // AUTHENTICATED ADMIN WORKSPACE
  // =========================================================================

  // Filtered items
  const filteredItems = items
    .filter((item) => {
      const matchesCategory = activeCategory === 'Todos' || item.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q)) ||
        item.dimensions.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.estimatedPriceMxn - b.estimatedPriceMxn;
      if (sortBy === 'price-desc') return b.estimatedPriceMxn - a.estimatedPriceMxn;
      if (sortBy === 'name') return a.title.localeCompare(b.title);
      // 'featured'
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });

  // Handle local file upload for an item
  const handleFileUpload = async (itemId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const compressedDataUrl = await compressImageFile(file);
      updatePhoto(itemId, compressedDataUrl);
    } catch (err) {
      console.error(err);
      alert('Error al procesar la imagen seleccionada. Intenta con un formato JPG o PNG.');
    } finally {
      e.target.value = '';
    }
  };

  const handleApplyCustomUrl = (itemId: string) => {
    if (!customUrlValue.trim()) return;
    updatePhoto(itemId, customUrlValue.trim());
    setPhotoUrlInputId(null);
    setCustomUrlValue('');
  };

  const handleApplyBulkPrice = () => {
    if (confirm(`¿Seguro que deseas aplicar un cambio de ${bulkPercent}% a los precios de "${bulkCategoryTarget}"?`)) {
      bulkAdjustPrices(bulkPercent, bulkCategoryTarget);
      setIsBulkPriceOpen(false);
    }
  };

  const handleBackupFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        const res = importCatalogJson(content);
        if (!res.success) {
          alert(`Error: ${res.message}`);
        } else {
          setIsBackupOpen(false);
        }
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col justify-end md:justify-center p-0 md:p-6 overflow-hidden animate-in fade-in duration-200">
      <div className="bg-[#18120D] border border-[#3D2C20] w-full max-w-7xl h-[95vh] md:h-[90vh] rounded-t-2xl md:rounded-2xl flex flex-col shadow-2xl shadow-black/80 overflow-hidden">
        
        {/* Top Header */}
        <header className="px-6 py-3.5 bg-[#211812] border-b border-[#3D2C20] flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#E09F3E]/20 border border-[#E09F3E]/40 flex items-center justify-center text-[#E8AF50]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display font-bold text-lg md:text-xl text-[#F7EFE6]">
                  Panel de Gestión de Catálogo
                </h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#E09F3E]/20 text-[#E8AF50] border border-[#E09F3E]/30">
                  {items.length} Piezas
                </span>
              </div>
              <p className="text-xs text-[#B5A192]">
                Actualiza fotos, precios en MXN y catálogo de MDF 3 mm (hasta 40 cm).
              </p>
            </div>
          </div>

          {/* Admin Identity Badge & Action Buttons */}
          <div className="flex items-center gap-2.5">
            {/* Authenticated user pill */}
            <div className="hidden sm:flex items-center gap-2 bg-[#17100B] border border-emerald-500/30 px-2.5 py-1.5 rounded-lg text-xs">
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || 'Admin'}
                  className="w-6 h-6 rounded-full border border-emerald-400 object-cover"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-emerald-600/30 text-emerald-300 flex items-center justify-center text-[10px] font-bold">
                  RR
                </div>
              )}
              <div className="flex flex-col text-left leading-tight">
                <span className="font-semibold text-[#F7EFE6] text-[11px] flex items-center gap-1">
                  {user?.displayName || 'Rafael Rosales'}
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </span>
                <span className="text-[10px] text-emerald-400 font-mono">
                  {user?.email || adminEmail}
                </span>
              </div>
            </div>

            {/* Google Drive Browser button */}
            <button
              onClick={() => {
                setDriveTargetItem(null);
                setIsDrivePickerOpen(true);
              }}
              className="px-3 py-2 rounded-lg bg-[#1F2937]/50 hover:bg-[#374151]/50 border border-blue-500/30 text-xs font-semibold text-blue-300 flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
              title="Explorar fotos en Google Drive del taller"
            >
              <Folder className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden md:inline">Google Drive</span>
            </button>

            <button
              onClick={() => setIsNewModalOpen(true)}
              className="px-3.5 py-2 rounded-lg bg-[#E09F3E] hover:bg-[#ECAE52] text-[#17110C] font-semibold text-xs flex items-center gap-1.5 transition-all shadow-sm shadow-[#E09F3E]/20 active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Nueva Pieza</span>
            </button>

            <button
              onClick={() => setIsBulkPriceOpen(!isBulkPriceOpen)}
              className={`px-3 py-2 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors ${
                isBulkPriceOpen 
                  ? 'bg-[#33251B] border-[#E09F3E] text-[#E8AF50]' 
                  : 'bg-[#261C15] border-[#3D2C20] text-[#D8C6B6] hover:text-white hover:border-[#523A2B]'
              }`}
              title="Ajuste masivo de precios por porcentaje"
            >
              <Percent className="w-3.5 h-3.5 text-[#E09F3E]" />
              <span className="hidden md:inline">Ajuste Masivo</span>
            </button>

            <button
              onClick={() => setIsBackupOpen(true)}
              className="px-3 py-2 rounded-lg bg-[#261C15] border border-[#3D2C20] text-xs font-medium text-[#D8C6B6] hover:text-white hover:border-[#523A2B] flex items-center gap-1.5 transition-colors"
              title="Copias de seguridad y opciones avanzadas"
            >
              <FolderOpen className="w-3.5 h-3.5 text-[#E09F3E]" />
              <span className="hidden lg:inline">Respaldo</span>
            </button>

            {/* Logout button */}
            <button
              onClick={signOutUser}
              className="p-2 rounded-lg text-[#A89485] hover:text-red-400 hover:bg-[#2F2117] transition-colors"
              title="Cerrar sesión de Google"
            >
              <LogOut className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-2 rounded-lg text-[#A89485] hover:text-white hover:bg-[#2F2117] transition-colors ml-1"
              aria-label="Cerrar panel de administración"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Action toast message if any */}
        {lastActionMessage && (
          <div className="px-6 py-2.5 bg-emerald-950/70 border-b border-emerald-500/30 flex items-center justify-between text-xs text-emerald-300 animate-in fade-in">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>{lastActionMessage}</span>
            </div>
            <button
              onClick={clearActionMessage}
              className="text-emerald-400 hover:text-white text-xs underline ml-4"
            >
              Entendido
            </button>
          </div>
        )}

        {/* Bulk Price Modifier Drawer / Accordion */}
        {isBulkPriceOpen && (
          <div className="bg-[#261B14] border-b border-[#3D2C20] px-6 py-3.5 flex flex-wrap items-center gap-4 text-xs animate-in slide-in-from-top-2">
            <div className="flex items-center gap-2 text-[#E8C99B] font-medium">
              <Percent className="w-4 h-4 text-[#E09F3E]" />
              <span>Modificar Precios en Masa:</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[#A89485]">Aplicar a:</span>
              <select
                value={bulkCategoryTarget}
                onChange={(e) => setBulkCategoryTarget(e.target.value)}
                className="bg-[#18110B] border border-[#3D2C20] rounded px-2.5 py-1 text-xs text-[#F7EFE6] focus:outline-none focus:border-[#E09F3E]"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[#A89485]">Porcentaje:</span>
              <div className="flex items-center gap-1 bg-[#18110B] border border-[#3D2C20] rounded px-2 py-0.5">
                <input
                  type="number"
                  value={bulkPercent}
                  onChange={(e) => setBulkPercent(Number(e.target.value))}
                  className="w-14 bg-transparent text-xs font-bold text-[#E8AF50] focus:outline-none text-right"
                  step="1"
                />
                <span className="text-[#A89485] font-semibold">%</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setBulkPercent(5)}
                className="px-2 py-0.5 rounded bg-[#1C140E] hover:bg-[#33251B] text-[#A89485] hover:text-white text-[11px]"
              >
                +5%
              </button>
              <button
                onClick={() => setBulkPercent(10)}
                className="px-2 py-0.5 rounded bg-[#1C140E] hover:bg-[#33251B] text-[#A89485] hover:text-white text-[11px]"
              >
                +10%
              </button>
              <button
                onClick={() => setBulkPercent(15)}
                className="px-2 py-0.5 rounded bg-[#1C140E] hover:bg-[#33251B] text-[#A89485] hover:text-white text-[11px]"
              >
                +15%
              </button>
              <button
                onClick={() => setBulkPercent(-5)}
                className="px-2 py-0.5 rounded bg-[#1C140E] hover:bg-[#33251B] text-[#A89485] hover:text-white text-[11px]"
              >
                -5%
              </button>
            </div>

            <div className="ml-auto flex items-center gap-2">
              <button
                onClick={() => setIsBulkPriceOpen(false)}
                className="px-3 py-1 text-xs text-[#A89485] hover:text-white"
              >
                Cancelar
              </button>
              <button
                onClick={handleApplyBulkPrice}
                className="px-3.5 py-1 rounded bg-[#E09F3E] hover:bg-[#ECAE52] text-[#17110C] font-semibold text-xs transition-colors shadow-sm"
              >
                Aplicar Ajuste a {bulkCategoryTarget}
              </button>
            </div>
          </div>
        )}

        {/* Toolbar: Search, Filters, Sorting */}
        <div className="px-6 py-3 bg-[#1E1610] border-b border-[#33251B] flex flex-wrap items-center justify-between gap-3 shrink-0">
          {/* Search Input */}
          <div className="relative flex-1 min-w-[220px] max-w-md">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8F7D70]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar pieza, altar, lámpara, medidas..."
              className="w-full pl-9 pr-8 py-1.5 bg-[#140E0A] border border-[#38281D] rounded-lg text-xs text-[#F7EFE6] placeholder-[#8F7D70] focus:outline-none focus:border-[#E09F3E] transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8F7D70] hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Sort By */}
          <div className="flex items-center gap-2 shrink-0 text-xs">
            <span className="text-[#8F7D70] hidden sm:inline flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5" /> Ordenar:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#140E0A] border border-[#38281D] rounded-lg px-2.5 py-1.5 text-xs text-[#D8C6B6] focus:outline-none focus:border-[#E09F3E]"
            >
              <option value="featured">Destacados primero</option>
              <option value="price-asc">Precio: Menor a Mayor</option>
              <option value="price-desc">Precio: Mayor a Menor</option>
              <option value="name">Alfabético (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="px-6 py-2 bg-[#1A130E] border-b border-[#2C2017] flex items-center gap-1.5 overflow-x-auto scrollbar-none shrink-0">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1 rounded-full text-[11px] whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? 'bg-[#E09F3E] text-[#17110C] font-semibold shadow-sm'
                  : 'bg-[#241A13] text-[#A89485] hover:text-[#E8AF50] hover:bg-[#2C2017]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Main Content Area - Scrollable List of Items */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-3">
          {filteredItems.length === 0 ? (
            <div className="text-center py-16 text-[#A89485] space-y-3">
              <p className="text-sm">No se encontraron piezas que coincidan con la búsqueda o categoría.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('Todos');
                }}
                className="px-3 py-1.5 rounded-lg bg-[#261C15] border border-[#3D2C20] text-xs text-[#E8AF50]"
              >
                Limpiar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {filteredItems.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  onUpdatePrice={updatePrice}
                  onFileUpload={(e) => handleFileUpload(item.id, e)}
                  onOpenUrlInput={() => {
                    setPhotoUrlInputId(item.id);
                    setCustomUrlValue(item.image.startsWith('data:') ? '' : item.image);
                  }}
                  onOpenDrivePicker={() => {
                    setDriveTargetItem(item);
                    setIsDrivePickerOpen(true);
                  }}
                  onEdit={() => setEditingItem(item)}
                  onToggleFeatured={() => updateItem(item.id, { featured: !item.featured })}
                  onDelete={() => setItemToDelete(item)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer info bar */}
        <footer className="px-6 py-3 bg-[#1A130E] border-t border-[#33251B] flex flex-wrap items-center justify-between gap-3 text-xs text-[#8F7D70] shrink-0">
          <div>
            Mostrando <strong className="text-[#F7EFE6]">{filteredItems.length}</strong> de <strong className="text-[#F7EFE6]">{items.length}</strong> piezas activas.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-emerald-400 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" />
              Guardado automático local activo
            </span>
            <button
              onClick={exportCatalogJson}
              className="text-[#E8AF50] hover:underline flex items-center gap-1"
            >
              <Download className="w-3 h-3" />
              Descargar JSON
            </button>
          </div>
        </footer>
      </div>

      {/* Popover / Modal for pasting photo URL or Google Drive link */}
      {photoUrlInputId && (
        <div className="fixed inset-0 z-60 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-[#1F1711] border border-[#3D2C20] rounded-xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-[#E09F3E]" />
                <h3 className="font-bold text-sm text-[#F7EFE6]">
                  Actualizar Foto vía URL o Google Drive
                </h3>
              </div>
              <button
                onClick={() => setPhotoUrlInputId(null)}
                className="text-[#8F7D70] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#A89485] leading-relaxed">
              Pega cualquier enlace directo de imagen web o un enlace compartido de <strong>Google Drive</strong> (ej: <code className="text-[#E8AF50]">https://drive.google.com/file/d/...</code>). El sistema lo convertirá automáticamente a formato compatible.
            </p>

            <div className="p-3 rounded-lg bg-amber-950/40 border border-amber-900/50 text-[11px] text-amber-200/90 space-y-1">
              <p className="font-semibold flex items-center gap-1.5 text-amber-300">
                <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                <span>Importante sobre Google Drive:</span>
              </p>
              <p className="text-amber-200/70">
                Para que Google Drive permita mostrar las imágenes en la web, el archivo debe tener permisos configurados como <strong>"Cualquier usuario que tenga el enlace"</strong> (Público). Si es privado, Google bloqueará la visualización.
              </p>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-semibold text-[#D8C6B6] uppercase tracking-wider">
                URL de la Imagen o Google Drive:
              </label>
              <input
                type="text"
                value={customUrlValue}
                onChange={(e) => setCustomUrlValue(e.target.value)}
                placeholder="https://drive.google.com/file/d/... o https://ejemplo.com/foto.jpg"
                className="w-full px-3 py-2 bg-[#140E0A] border border-[#3D2C20] rounded-lg text-xs text-[#F7EFE6] focus:outline-none focus:border-[#E09F3E]"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleApplyCustomUrl(photoUrlInputId);
                }}
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setPhotoUrlInputId(null)}
                className="px-3.5 py-1.5 rounded-lg border border-[#3D2C20] text-xs text-[#A89485] hover:text-white"
              >
                Cancelar
              </button>
              <button
                onClick={() => handleApplyCustomUrl(photoUrlInputId)}
                className="px-4 py-1.5 rounded-lg bg-[#E09F3E] hover:bg-[#ECAE52] text-[#17110C] font-semibold text-xs"
              >
                Guardar Foto
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Google Drive Picker Modal */}
      <GoogleDrivePickerModal
        isOpen={isDrivePickerOpen}
        onClose={() => {
          setIsDrivePickerOpen(false);
          setDriveTargetItem(null);
        }}
        accessToken={accessToken}
        targetItemTitle={driveTargetItem?.title}
        onSelectImage={(imageUrl) => {
          if (driveTargetItem) {
            updatePhoto(driveTargetItem.id, imageUrl);
          }
        }}
      />

      {/* Deep Edit Item Modal */}
      {editingItem && (
        <EditItemModal
          item={editingItem}
          accessToken={accessToken}
          onClose={() => setEditingItem(null)}
          onSave={(updates) => {
            updateItem(editingItem.id, updates);
            setEditingItem(null);
          }}
        />
      )}

      {/* New Item Modal */}
      {isNewModalOpen && (
        <NewItemModal
          accessToken={accessToken}
          onClose={() => setIsNewModalOpen(false)}
          onAdd={(newItemData) => {
            addItem(newItemData);
            setIsNewModalOpen(false);
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {itemToDelete && (
        <div className="fixed inset-0 z-60 bg-black/75 flex items-center justify-center p-4">
          <div className="bg-[#1F1711] border border-red-900/40 rounded-xl max-w-sm w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-red-400">
              <div className="w-10 h-10 rounded-full bg-red-950/60 border border-red-800/40 flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-red-400" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#F7EFE6]">¿Eliminar pieza?</h3>
                <p className="text-xs text-[#A89485]">{itemToDelete.title}</p>
              </div>
            </div>
            <p className="text-xs text-[#C4B4A5]">
              Esta pieza ya no se mostrará en la galería ni en el cotizador interactivo. Puedes restablecerla después si lo deseas.
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setItemToDelete(null)}
                className="px-3.5 py-1.5 rounded-lg border border-[#3D2C20] text-xs text-[#A89485] hover:text-white"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  deleteItem(itemToDelete.id);
                  setItemToDelete(null);
                }}
                className="px-4 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-semibold text-xs"
              >
                Sí, Eliminar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Backup & Factory Reset Modal */}
      {isBackupOpen && (
        <div className="fixed inset-0 z-60 bg-black/75 flex items-center justify-center p-4">
          <div className="bg-[#1F1711] border border-[#3D2C20] rounded-xl max-w-md w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FolderOpen className="w-4 h-4 text-[#E09F3E]" />
                <h3 className="font-bold text-sm text-[#F7EFE6]">
                  Respaldos y Opciones de Catálogo
                </h3>
              </div>
              <button
                onClick={() => setIsBackupOpen(false)}
                className="text-[#8F7D70] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              {/* Export Button */}
              <div className="p-3.5 rounded-lg bg-[#17100B] border border-[#33251B] flex items-center justify-between gap-3">
                <div>
                  <div className="font-semibold text-xs text-[#F7EFE6]">Exportar Copia de Seguridad</div>
                  <div className="text-[11px] text-[#8F7D70]">Descarga un archivo JSON con todas las fotos, precios y piezas actuales.</div>
                </div>
                <button
                  onClick={exportCatalogJson}
                  className="px-3 py-1.5 rounded bg-[#2B1F17] hover:bg-[#3D2C20] border border-[#473426] text-xs text-[#E8AF50] font-medium flex items-center gap-1.5 shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  Descargar
                </button>
              </div>

              {/* Import Button */}
              <div className="p-3.5 rounded-lg bg-[#17100B] border border-[#33251B] flex items-center justify-between gap-3">
                <div>
                  <div className="font-semibold text-xs text-[#F7EFE6]">Restaurar desde JSON</div>
                  <div className="text-[11px] text-[#8F7D70]">Carga un archivo de respaldo previo para restaurar precios y fotos.</div>
                </div>
                <div>
                  <input
                    ref={backupFileInputRef}
                    type="file"
                    accept=".json"
                    className="hidden"
                    onChange={handleBackupFileSelect}
                  />
                  <button
                    onClick={() => backupFileInputRef.current?.click()}
                    className="px-3 py-1.5 rounded bg-[#2B1F17] hover:bg-[#3D2C20] border border-[#473426] text-xs text-[#E8AF50] font-medium flex items-center gap-1.5 shrink-0"
                  >
                    <FileUp className="w-3.5 h-3.5" />
                    Cargar
                  </button>
                </div>
              </div>

              {/* Factory Reset */}
              <div className="p-3.5 rounded-lg bg-red-950/20 border border-red-900/30 flex items-center justify-between gap-3">
                <div>
                  <div className="font-semibold text-xs text-red-300 flex items-center gap-1.5">
                    <RotateCcw className="w-3.5 h-3.5 text-red-400" />
                    Restablecer de Fábrica
                  </div>
                  <div className="text-[11px] text-red-200/60">
                    Restaura las 54 piezas y fotos originales iniciales del taller.
                  </div>
                </div>
                <button
                  onClick={() => {
                    if (confirm('¿Estás seguro de restablecer el catálogo a los valores iniciales de fábrica? Se perderán las modificaciones no respaldadas.')) {
                      resetToDefaults();
                      setIsBackupOpen(false);
                    }
                  }}
                  className="px-3 py-1.5 rounded bg-red-900/40 hover:bg-red-900/60 border border-red-700/50 text-xs text-red-200 font-medium shrink-0"
                >
                  Restablecer
                </button>
              </div>
            </div>

            <div className="text-right pt-2">
              <button
                onClick={() => setIsBackupOpen(false)}
                className="px-4 py-1.5 rounded-lg bg-[#2A1F17] text-xs text-[#C4B4A5] hover:text-white"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ==========================================
// Subcomponent: Individual Item Card with Quick Controls
// ==========================================
interface ItemCardProps {
  item: GalleryItem;
  onUpdatePrice: (id: string, price: number) => void;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onOpenUrlInput: () => void;
  onOpenDrivePicker: () => void;
  onEdit: () => void;
  onToggleFeatured: () => void;
  onDelete: () => void;
}

const ItemCard: React.FC<ItemCardProps> = ({
  item,
  onUpdatePrice,
  onFileUpload,
  onOpenUrlInput,
  onOpenDrivePicker,
  onEdit,
  onToggleFeatured,
  onDelete
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [localPrice, setLocalPrice] = useState<string>(item.estimatedPriceMxn.toString());
  const [isSavedRecently, setIsSavedRecently] = useState(false);
  const [isImgError, setIsImgError] = useState(false);

  // Sync if item changes from outside
  React.useEffect(() => {
    setLocalPrice(item.estimatedPriceMxn.toString());
  }, [item.estimatedPriceMxn]);

  const handlePriceCommit = () => {
    const val = parseFloat(localPrice);
    if (!isNaN(val) && val >= 0) {
      const rounded = Math.round(val);
      if (rounded !== item.estimatedPriceMxn) {
        onUpdatePrice(item.id, rounded);
        setIsSavedRecently(true);
        setTimeout(() => setIsSavedRecently(false), 2000);
      }
    } else {
      setLocalPrice(item.estimatedPriceMxn.toString());
    }
  };

  const handleStepPrice = (delta: number) => {
    const current = parseFloat(localPrice) || 0;
    const next = Math.max(0, Math.round(current + delta));
    setLocalPrice(next.toString());
    onUpdatePrice(item.id, next);
    setIsSavedRecently(true);
    setTimeout(() => setIsSavedRecently(false), 2000);
  };

  return (
    <div className="bg-[#1C140E] border border-[#33251B] hover:border-[#4D3627] rounded-xl p-3 flex flex-col justify-between gap-3 transition-colors shadow-sm group">
      {/* Top: Image and main specs */}
      <div className="flex gap-3">
        {/* Photo with quick upload triggers */}
        <div className="relative w-24 h-24 rounded-lg bg-[#140E0A] border border-[#33251B] overflow-hidden shrink-0 group/img">
          <img
            src={isImgError ? '/gallery/artemdf_01_20241026_094119.jpg' : item.image}
            alt={item.title}
            onError={() => setIsImgError(true)}
            className="w-full h-full object-cover transition-transform group-hover/img:scale-105"
          />

          {/* Featured star badge */}
          {item.featured && (
            <div className="absolute top-1 left-1 bg-[#E09F3E] text-[#17110C] p-1 rounded-md shadow">
              <Star className="w-2.5 h-2.5 fill-current" />
            </div>
          )}

          {/* Hover overlay with photo options */}
          <div className="absolute inset-0 bg-black/80 opacity-0 group-hover/img:opacity-100 flex flex-col items-center justify-center gap-1 p-1 transition-opacity">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onFileUpload}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-0.5 rounded bg-[#E09F3E] text-[#17110C] text-[9px] font-bold flex items-center justify-center gap-1 hover:bg-[#ECAE52]"
              title="Subir archivo desde computadora"
            >
              <Upload className="w-2.5 h-2.5" />
              <span>Subir</span>
            </button>
            <button
              onClick={onOpenDrivePicker}
              className="w-full py-0.5 rounded bg-blue-600/40 border border-blue-500/40 text-blue-200 text-[9px] font-medium flex items-center justify-center gap-1 hover:bg-blue-600/60"
              title="Explorar fotos en Google Drive"
            >
              <Folder className="w-2.5 h-2.5" />
              <span>Drive</span>
            </button>
            <button
              onClick={onOpenUrlInput}
              className="w-full py-0.5 rounded bg-[#2D2017] border border-[#4A3526] text-[#E8AF50] text-[9px] font-medium flex items-center justify-center gap-1 hover:bg-[#3D2C20]"
              title="Pegar enlace de Google Drive o URL"
            >
              <LinkIcon className="w-2.5 h-2.5" />
              <span>URL</span>
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-start justify-between gap-1">
            <span className="text-[10px] font-semibold text-[#E09F3E] uppercase tracking-wider truncate">
              {item.category}
            </span>
            <div className="flex items-center gap-1 shrink-0">
              <button
                onClick={onToggleFeatured}
                className={`p-1 rounded transition-colors ${
                  item.featured ? 'text-[#E09F3E]' : 'text-[#5C4637] hover:text-[#A89485]'
                }`}
                title={item.featured ? 'Quitar de destacados' : 'Marcar como destacado'}
              >
                <Star className={`w-3.5 h-3.5 ${item.featured ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>

          <h4 className="font-semibold text-xs text-[#F7EFE6] leading-snug line-clamp-2">
            {item.title}
          </h4>

          <p className="text-[11px] text-[#8F7D70] truncate">
            {item.dimensions || 'Hasta 40 cm'}
          </p>
        </div>
      </div>

      {/* Middle: Price Quick Inline Editor */}
      <div className="pt-2 border-t border-[#2B1E16] flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 flex-1">
          <span className="text-xs font-bold text-[#E8AF50]">$</span>
          <div className="relative flex-1">
            <input
              type="number"
              value={localPrice}
              onChange={(e) => setLocalPrice(e.target.value)}
              onBlur={handlePriceCommit}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handlePriceCommit();
              }}
              className="w-full bg-[#140E0A] border border-[#38281D] focus:border-[#E09F3E] rounded px-2 py-1 text-xs font-bold text-[#F7EFE6] focus:outline-none"
            />
            {isSavedRecently && (
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-emerald-400 text-[10px] flex items-center gap-0.5">
                <Check className="w-3 h-3" />
              </span>
            )}
          </div>
          <span className="text-[10px] text-[#A89485] font-semibold">MXN</span>
        </div>

        {/* Quick step buttons */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => handleStepPrice(-10)}
            className="px-1.5 py-1 rounded bg-[#241A13] hover:bg-[#33251B] text-[#A89485] hover:text-white text-[10px] font-semibold border border-[#33251B]"
            title="Restar $10 MXN"
          >
            -10
          </button>
          <button
            onClick={() => handleStepPrice(10)}
            className="px-1.5 py-1 rounded bg-[#241A13] hover:bg-[#33251B] text-[#A89485] hover:text-white text-[10px] font-semibold border border-[#33251B]"
            title="Sumar $10 MXN"
          >
            +10
          </button>
          <button
            onClick={() => handleStepPrice(50)}
            className="px-1.5 py-1 rounded bg-[#241A13] hover:bg-[#33251B] text-[#E8AF50] hover:text-white text-[10px] font-semibold border border-[#33251B]"
            title="Sumar $50 MXN"
          >
            +50
          </button>
        </div>
      </div>

      {/* Bottom: Action buttons */}
      <div className="pt-2 border-t border-[#2B1E16] flex items-center justify-between text-xs">
        <span className="text-[10px] text-[#8F7D70]">
          {item.productionTime || '1-3 días'}
        </span>
        <div className="flex items-center gap-1.5">
          <button
            onClick={onEdit}
            className="px-2 py-1 rounded bg-[#241A13] hover:bg-[#33251B] border border-[#3A281C] text-[11px] font-medium text-[#E8AF50] flex items-center gap-1"
          >
            <Edit3 className="w-3 h-3" />
            <span>Editar</span>
          </button>
          <button
            onClick={onDelete}
            className="p-1 rounded text-[#8F7D70] hover:text-red-400 hover:bg-red-950/30 transition-colors"
            title="Eliminar del catálogo"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// Subcomponent: Edit Item Full Modal
// ==========================================
interface EditItemModalProps {
  item: GalleryItem;
  accessToken: string | null;
  onClose: () => void;
  onSave: (updates: Partial<GalleryItem>) => void;
}

const EditItemModal: React.FC<EditItemModalProps> = ({ item, accessToken, onClose, onSave }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [title, setTitle] = useState(item.title);
  const [category, setCategory] = useState(item.category);
  const [price, setPrice] = useState(item.estimatedPriceMxn.toString());
  const [dimensions, setDimensions] = useState(item.dimensions);
  const [productionTime, setProductionTime] = useState(item.productionTime || '');
  const [image, setImage] = useState(item.image);
  const [description, setDescription] = useState(item.description);
  const [tagsStr, setTagsStr] = useState(item.tags.join(', '));
  const [featured, setFeatured] = useState(item.featured || false);
  const [isDriveModalOpen, setIsDriveModalOpen] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const compressedDataUrl = await compressImageFile(file);
      setImage(compressedDataUrl);
    } catch (err) {
      alert('Error al procesar la imagen seleccionada.');
    }
  };

  const handleSave = () => {
    const parsedPrice = parseFloat(price) || item.estimatedPriceMxn;
    const finalImage = formatDriveOrExternalUrl(image.trim()) || item.image;
    const tags = tagsStr
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    onSave({
      title: title.trim() || item.title,
      category,
      estimatedPriceMxn: Math.round(parsedPrice),
      dimensions: dimensions.trim() || item.dimensions,
      productionTime: productionTime.trim() || item.productionTime,
      image: finalImage,
      description: description.trim() || item.description,
      tags: tags.length > 0 ? tags : item.tags,
      featured
    });
  };

  return (
    <div className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#1F1711] border border-[#3D2C20] rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-2xl my-8">
        <div className="flex items-center justify-between pb-3 border-b border-[#33251B]">
          <div className="flex items-center gap-2">
            <Edit3 className="w-4 h-4 text-[#E09F3E]" />
            <h3 className="font-bold text-base text-[#F7EFE6]">
              Editar Detalles de Pieza
            </h3>
          </div>
          <button onClick={onClose} className="text-[#8F7D70] hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Photo Preview & Upload */}
          <div className="space-y-2">
            <label className="text-[11px] font-semibold text-[#D8C6B6] uppercase tracking-wider block">
              Foto de la Pieza
            </label>
            <div className="w-full aspect-square rounded-xl bg-[#140E0A] border border-[#3D2C20] overflow-hidden relative group">
              <img
                src={image}
                alt="Vista previa"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-1.5 pt-1">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-1.5 rounded-lg bg-[#2D2017] border border-[#423023] hover:bg-[#3D2C20] text-xs text-[#E8AF50] font-medium flex items-center justify-center gap-1.5"
              >
                <Upload className="w-3.5 h-3.5" />
                Subir Foto Local
              </button>
              <button
                type="button"
                onClick={() => setIsDriveModalOpen(true)}
                className="w-full py-1.5 rounded-lg bg-blue-900/30 border border-blue-700/40 hover:bg-blue-900/50 text-xs text-blue-300 font-medium flex items-center justify-center gap-1.5"
              >
                <Folder className="w-3.5 h-3.5 text-blue-400" />
                Explorar en Drive
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="md:col-span-2 space-y-3.5">
            <div>
              <label className="text-[11px] font-semibold text-[#D8C6B6] uppercase tracking-wider block mb-1">
                Título de la Pieza:
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-1.5 bg-[#140E0A] border border-[#38281D] rounded-lg text-xs text-[#F7EFE6] focus:outline-none focus:border-[#E09F3E]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-[#D8C6B6] uppercase tracking-wider block mb-1">
                  Categoría:
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-1.5 bg-[#140E0A] border border-[#38281D] rounded-lg text-xs text-[#F7EFE6] focus:outline-none focus:border-[#E09F3E]"
                >
                  {CATEGORIES.filter((c) => c !== 'Todos').map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#D8C6B6] uppercase tracking-wider block mb-1">
                  Precio Estimado (MXN):
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#E8AF50] font-bold text-xs">$</span>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full pl-7 pr-3 py-1.5 bg-[#140E0A] border border-[#38281D] rounded-lg text-xs font-bold text-[#F7EFE6] focus:outline-none focus:border-[#E09F3E]"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-[#D8C6B6] uppercase tracking-wider block mb-1">
                  Dimensiones (Máx. 40cm):
                </label>
                <input
                  type="text"
                  value={dimensions}
                  onChange={(e) => setDimensions(e.target.value)}
                  placeholder="ej. 25 cm x 20 cm x 15 cm"
                  className="w-full px-3 py-1.5 bg-[#140E0A] border border-[#38281D] rounded-lg text-xs text-[#F7EFE6] focus:outline-none focus:border-[#E09F3E]"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#D8C6B6] uppercase tracking-wider block mb-1">
                  Tiempo de Fabricación:
                </label>
                <input
                  type="text"
                  value={productionTime}
                  onChange={(e) => setProductionTime(e.target.value)}
                  placeholder="ej. 2 a 3 días hábiles"
                  className="w-full px-3 py-1.5 bg-[#140E0A] border border-[#38281D] rounded-lg text-xs text-[#F7EFE6] focus:outline-none focus:border-[#E09F3E]"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-[#D8C6B6] uppercase tracking-wider block mb-1">
                URL de la Imagen o Google Drive:
              </label>
              <input
                type="text"
                value={image.startsWith('data:') ? '' : image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="Pega un enlace de Google Drive o URL web..."
                className="w-full px-3 py-1.5 bg-[#140E0A] border border-[#38281D] rounded-lg text-xs text-[#F7EFE6] focus:outline-none focus:border-[#E09F3E]"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-[#D8C6B6] uppercase tracking-wider block mb-1">
                Descripción del Proyecto:
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-1.5 bg-[#140E0A] border border-[#38281D] rounded-lg text-xs text-[#F7EFE6] focus:outline-none focus:border-[#E09F3E] resize-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-[#D8C6B6] uppercase tracking-wider block mb-1">
                Etiquetas (separadas por coma):
              </label>
              <input
                type="text"
                value={tagsStr}
                onChange={(e) => setTagsStr(e.target.value)}
                className="w-full px-3 py-1.5 bg-[#140E0A] border border-[#38281D] rounded-lg text-xs text-[#F7EFE6] focus:outline-none focus:border-[#E09F3E]"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="edit-featured-check"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="rounded accent-[#E09F3E] w-4 h-4 cursor-pointer"
              />
              <label htmlFor="edit-featured-check" className="text-xs text-[#D8C6B6] cursor-pointer">
                Destacar esta pieza en los primeros lugares del catálogo
              </label>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#33251B]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-[#3D2C20] text-xs text-[#A89485] hover:text-white"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-lg bg-[#E09F3E] hover:bg-[#ECAE52] text-[#17110C] font-semibold text-xs flex items-center gap-1.5 shadow"
          >
            <Check className="w-4 h-4" />
            Guardar Cambios
          </button>
        </div>
      </div>

      <GoogleDrivePickerModal
        isOpen={isDriveModalOpen}
        onClose={() => setIsDriveModalOpen(false)}
        accessToken={accessToken}
        targetItemTitle={title}
        onSelectImage={(url) => {
          setImage(url);
          setIsDriveModalOpen(false);
        }}
      />
    </div>
  );
};

// ==========================================
// Subcomponent: New Item Modal
// ==========================================
interface NewItemModalProps {
  accessToken: string | null;
  onClose: () => void;
  onAdd: (item: Omit<GalleryItem, 'id'>) => void;
}

const NewItemModal: React.FC<NewItemModalProps> = ({ accessToken, onClose, onAdd }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<any>('Altares & Tradición');
  const [price, setPrice] = useState('450');
  const [dimensions, setDimensions] = useState('25 cm x 20 cm x 15 cm');
  const [productionTime, setProductionTime] = useState('1 a 2 días hábiles');
  const [image, setImage] = useState('/gallery/artemdf_01_20241026_094119.jpg');
  const [description, setDescription] = useState('');
  const [tagsStr, setTagsStr] = useState('Corte láser, MDF 3mm, Ensambles');
  const [featured, setFeatured] = useState(false);
  const [isDriveModalOpen, setIsDriveModalOpen] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const compressedDataUrl = await compressImageFile(file);
      setImage(compressedDataUrl);
    } catch (err) {
      alert('Error al procesar la imagen seleccionada.');
    }
  };

  const handleCreate = () => {
    if (!title.trim()) {
      alert('Por favor ingresa un título para la nueva pieza.');
      return;
    }

    const parsedPrice = parseFloat(price) || 350;
    const finalImage = formatDriveOrExternalUrl(image.trim()) || '/gallery/artemdf_01_20241026_094119.jpg';
    const tags = tagsStr
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    onAdd({
      title: title.trim(),
      category,
      estimatedPriceMxn: Math.round(parsedPrice),
      dimensions: dimensions.trim() || 'Hasta 40 cm',
      productionTime: productionTime.trim() || '1 a 2 días hábiles',
      mdfThickness: 'MDF 3 mm',
      image: finalImage,
      description: description.trim() || 'Diseño exclusivo en MDF 3 mm cortado por láser de precisión.',
      tags: tags.length > 0 ? tags : ['Corte láser', 'MDF 3mm'],
      featured
    });
  };

  return (
    <div className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#1F1711] border border-[#3D2C20] rounded-2xl max-w-2xl w-full p-6 space-y-5 shadow-2xl my-8">
        <div className="flex items-center justify-between pb-3 border-b border-[#33251B]">
          <div className="flex items-center gap-2">
            <Plus className="w-4 h-4 text-[#E09F3E]" />
            <h3 className="font-bold text-base text-[#F7EFE6]">
              Agregar Nueva Pieza al Catálogo
            </h3>
          </div>
          <button onClick={onClose} className="text-[#8F7D70] hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Photo Preview & Upload */}
          <div className="space-y-2">
            <label className="text-[11px] font-semibold text-[#D8C6B6] uppercase tracking-wider block">
              Foto de la Pieza
            </label>
            <div className="w-full aspect-square rounded-xl bg-[#140E0A] border border-[#3D2C20] overflow-hidden relative group">
              <img
                src={image}
                alt="Vista previa"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-1.5 pt-1">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileUpload}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full py-1.5 rounded-lg bg-[#2D2017] border border-[#423023] hover:bg-[#3D2C20] text-xs text-[#E8AF50] font-medium flex items-center justify-center gap-1.5"
              >
                <Upload className="w-3.5 h-3.5" />
                Subir Foto Local
              </button>
              <button
                type="button"
                onClick={() => setIsDriveModalOpen(true)}
                className="w-full py-1.5 rounded-lg bg-blue-900/30 border border-blue-700/40 hover:bg-blue-900/50 text-xs text-blue-300 font-medium flex items-center justify-center gap-1.5"
              >
                <Folder className="w-3.5 h-3.5 text-blue-400" />
                Explorar en Drive
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="md:col-span-2 space-y-3.5">
            <div>
              <label className="text-[11px] font-semibold text-[#D8C6B6] uppercase tracking-wider block mb-1">
                Título del Producto / Pieza: *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="ej. Alhajero Geométrico con Espejo"
                className="w-full px-3 py-1.5 bg-[#140E0A] border border-[#38281D] rounded-lg text-xs text-[#F7EFE6] focus:outline-none focus:border-[#E09F3E]"
                autoFocus
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-[#D8C6B6] uppercase tracking-wider block mb-1">
                  Categoría:
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-1.5 bg-[#140E0A] border border-[#38281D] rounded-lg text-xs text-[#F7EFE6] focus:outline-none focus:border-[#E09F3E]"
                >
                  {CATEGORIES.filter((c) => c !== 'Todos').map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#D8C6B6] uppercase tracking-wider block mb-1">
                  Precio (MXN): *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#E8AF50] font-bold text-xs">$</span>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full pl-7 pr-3 py-1.5 bg-[#140E0A] border border-[#38281D] rounded-lg text-xs font-bold text-[#F7EFE6] focus:outline-none focus:border-[#E09F3E]"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-[#D8C6B6] uppercase tracking-wider block mb-1">
                  Dimensiones (Máx. 40cm):
                </label>
                <input
                  type="text"
                  value={dimensions}
                  onChange={(e) => setDimensions(e.target.value)}
                  placeholder="ej. 20 cm x 15 cm x 10 cm"
                  className="w-full px-3 py-1.5 bg-[#140E0A] border border-[#38281D] rounded-lg text-xs text-[#F7EFE6] focus:outline-none focus:border-[#E09F3E]"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-[#D8C6B6] uppercase tracking-wider block mb-1">
                  Tiempo de Fabricación:
                </label>
                <input
                  type="text"
                  value={productionTime}
                  onChange={(e) => setProductionTime(e.target.value)}
                  placeholder="ej. 1 a 2 días hábiles"
                  className="w-full px-3 py-1.5 bg-[#140E0A] border border-[#38281D] rounded-lg text-xs text-[#F7EFE6] focus:outline-none focus:border-[#E09F3E]"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-[#D8C6B6] uppercase tracking-wider block mb-1">
                URL de Imagen / Google Drive (opcional):
              </label>
              <input
                type="text"
                value={image.startsWith('data:') ? '' : image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://drive.google.com/file/d/..."
                className="w-full px-3 py-1.5 bg-[#140E0A] border border-[#38281D] rounded-lg text-xs text-[#F7EFE6] focus:outline-none focus:border-[#E09F3E]"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-[#D8C6B6] uppercase tracking-wider block mb-1">
                Descripción:
              </label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-1.5 bg-[#140E0A] border border-[#38281D] rounded-lg text-xs text-[#F7EFE6] focus:outline-none focus:border-[#E09F3E] resize-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-[#D8C6B6] uppercase tracking-wider block mb-1">
                Etiquetas (separadas por coma):
              </label>
              <input
                type="text"
                value={tagsStr}
                onChange={(e) => setTagsStr(e.target.value)}
                className="w-full px-3 py-1.5 bg-[#140E0A] border border-[#38281D] rounded-lg text-xs text-[#F7EFE6] focus:outline-none focus:border-[#E09F3E]"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <input
                type="checkbox"
                id="new-featured-check"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="rounded accent-[#E09F3E] w-4 h-4 cursor-pointer"
              />
              <label htmlFor="new-featured-check" className="text-xs text-[#D8C6B6] cursor-pointer">
                Destacar en la parte superior del catálogo
              </label>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#33251B]">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-[#3D2C20] text-xs text-[#A89485] hover:text-white"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleCreate}
            className="px-5 py-2 rounded-lg bg-[#E09F3E] hover:bg-[#ECAE52] text-[#17110C] font-semibold text-xs flex items-center gap-1.5 shadow"
          >
            <Plus className="w-4 h-4" />
            Agregar al Catálogo
          </button>
        </div>
      </div>

      <GoogleDrivePickerModal
        isOpen={isDriveModalOpen}
        onClose={() => setIsDriveModalOpen(false)}
        accessToken={accessToken}
        targetItemTitle={title}
        onSelectImage={(url) => {
          setImage(url);
          setIsDriveModalOpen(false);
        }}
      />
    </div>
  );
};
