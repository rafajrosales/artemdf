import React, { useState, useEffect } from 'react';
import { X, Search, Image as ImageIcon, Loader2, Check, ExternalLink, RefreshCw, Folder } from 'lucide-react';
import { fetchDriveImages, DriveImageFile, extractFolderIdFromUrl } from '../services/googleDriveService';

interface GoogleDrivePickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (imageUrl: string) => void;
  accessToken: string | null;
  targetItemTitle?: string;
}

const DEFAULT_FOLDER_ID = '1rmBzsIg_9_LHhlfsXHehCrmGh89A67PZ';

export const GoogleDrivePickerModal: React.FC<GoogleDrivePickerModalProps> = ({
  isOpen,
  onClose,
  onSelectImage,
  accessToken,
  targetItemTitle,
}) => {
  const [folderInput, setFolderInput] = useState<string>(DEFAULT_FOLDER_ID);
  const [activeFolderId, setActiveFolderId] = useState<string | null>(DEFAULT_FOLDER_ID);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [files, setFiles] = useState<DriveImageFile[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);

  const loadFiles = async (folderId: string | null, search: string) => {
    if (!accessToken) {
      setError('Se requiere sesión iniciada con Google para consultar Google Drive.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const items = await fetchDriveImages(accessToken, folderId, search);
      setFiles(items);
      if (items.length === 0) {
        setError('No se encontraron imágenes en esta carpeta o búsqueda.');
      }
    } catch (err: any) {
      setError(err.message || 'Error al conectar con Google Drive.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen && accessToken) {
      loadFiles(activeFolderId, searchQuery);
    }
  }, [isOpen, activeFolderId, accessToken]);

  const handleFolderSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const extracted = extractFolderIdFromUrl(folderInput) || folderInput.trim();
    setActiveFolderId(extracted || null);
    loadFiles(extracted || null, searchQuery);
  };

  const handleSelect = (file: DriveImageFile) => {
    // Direct CDN thumbnail or content URL
    const directUrl = `https://lh3.googleusercontent.com/d/${file.id}`;
    setSelectedFileId(file.id);
    onSelectImage(directUrl);
    setTimeout(() => {
      onClose();
    }, 200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-70 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 md:p-6 animate-in fade-in duration-150">
      <div className="bg-[#1A130E] border border-[#3D2C20] rounded-2xl w-full max-w-4xl h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 bg-[#231A13] border-b border-[#3D2C20] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Folder className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-sm md:text-base text-[#F7EFE6] flex items-center gap-2">
                Explorador de Fotos en Google Drive
                {targetItemTitle && (
                  <span className="text-xs font-normal text-[#E8AF50]">
                    para: {targetItemTitle}
                  </span>
                )}
              </h3>
              <p className="text-xs text-[#A89485]">
                Carpeta vinculada del taller o búsqueda directa en tu Drive.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#8F7D70] hover:text-white hover:bg-[#2F2117] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="p-4 bg-[#201711] border-b border-[#33251B] flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <form onSubmit={handleFolderSearch} className="flex-1 flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={folderInput}
                onChange={(e) => setFolderInput(e.target.value)}
                placeholder="ID o Link de carpeta Drive (ej: 1rmBzsIg_9_LHhlfsXHehCrmGh89A67PZ)"
                className="w-full pl-3 pr-8 py-2 bg-[#140E0A] border border-[#38281D] rounded-lg text-xs text-[#F7EFE6] placeholder-[#8F7D70] focus:outline-none focus:border-[#E09F3E]"
              />
              {folderInput && (
                <button
                  type="button"
                  onClick={() => {
                    setFolderInput('');
                    setActiveFolderId(null);
                  }}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8F7D70] hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-[#2B1F17] hover:bg-[#3D2C20] border border-[#4A3526] text-xs font-semibold text-[#E8AF50] rounded-lg flex items-center gap-1.5 shrink-0"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Cargar</span>
            </button>
          </form>

          <button
            type="button"
            onClick={() => {
              setFolderInput('');
              setActiveFolderId(null);
              loadFiles(null, searchQuery);
            }}
            className="px-3 py-2 bg-[#1A130E] hover:bg-[#281D15] border border-[#33251B] text-xs text-[#D8C6B6] rounded-lg text-center"
          >
            Ver todas las fotos en Drive
          </button>
        </div>

        {/* Main files grid */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          {loading ? (
            <div className="h-full flex flex-col items-center justify-center gap-3 text-[#A89485]">
              <Loader2 className="w-8 h-8 animate-spin text-[#E09F3E]" />
              <p className="text-xs">Consultando archivos de fotos en Google Drive...</p>
            </div>
          ) : error ? (
            <div className="h-full flex flex-col items-center justify-center gap-3 text-center p-6 text-[#A89485]">
              <div className="w-12 h-12 rounded-full bg-[#2A1E16] border border-[#3D2C20] flex items-center justify-center text-[#E8AF50]">
                <ImageIcon className="w-6 h-6" />
              </div>
              <p className="text-xs max-w-md">{error}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => loadFiles(activeFolderId, searchQuery)}
                  className="px-3.5 py-1.5 rounded-lg bg-[#E09F3E] text-[#17110C] text-xs font-semibold"
                >
                  Reintentar
                </button>
                <button
                  onClick={() => {
                    setFolderInput(DEFAULT_FOLDER_ID);
                    setActiveFolderId(DEFAULT_FOLDER_ID);
                    loadFiles(DEFAULT_FOLDER_ID, '');
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-[#241A13] border border-[#3D2C20] text-xs text-[#E8AF50]"
                >
                  Restaurar carpeta del taller
                </button>
              </div>
            </div>
          ) : files.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center gap-2 text-[#A89485] text-xs">
              <p>No se encontraron fotos en esta ubicación.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {files.map((file) => {
                const isSelected = selectedFileId === file.id;
                return (
                  <div
                    key={file.id}
                    onClick={() => handleSelect(file)}
                    className={`group relative bg-[#140E0A] border rounded-xl overflow-hidden cursor-pointer flex flex-col transition-all hover:scale-[1.02] ${
                      isSelected
                        ? 'border-emerald-500 ring-2 ring-emerald-500/30'
                        : 'border-[#33251B] hover:border-[#E09F3E]'
                    }`}
                  >
                    <div className="relative aspect-square w-full bg-[#0D0906] overflow-hidden">
                      <img
                        src={file.thumbnailLink}
                        alt={file.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="px-2.5 py-1 bg-[#E09F3E] text-[#17110C] font-bold text-[10px] rounded-md shadow">
                          Usar Foto
                        </span>
                      </div>
                      {isSelected && (
                        <div className="absolute top-1.5 right-1.5 bg-emerald-500 text-white p-1 rounded-full shadow">
                          <Check className="w-3 h-3" />
                        </div>
                      )}
                    </div>
                    <div className="p-2">
                      <p className="text-[11px] text-[#F7EFE6] font-medium truncate" title={file.name}>
                        {file.name}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#201711] border-t border-[#33251B] flex items-center justify-between text-xs text-[#8F7D70] shrink-0">
          <span>{files.length} fotos disponibles en Drive</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#2A1F17] hover:bg-[#382A20] text-[#D8C6B6] rounded-lg text-xs"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
