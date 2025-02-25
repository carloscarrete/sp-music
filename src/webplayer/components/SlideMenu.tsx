import { X } from "lucide-react";
import usePlayerStore from "../../store/useWebPlayer";
import { useAuthStore } from "../../store/useAuthStore";
import { UploadForm } from "./UploadForm";
import { EditForm } from "./EditForm";
import { useEffect } from "react";
import { DeleteForm } from "./DeleteForm";

export const SlideMenu = () => {
  const { 
    showSlideMenu,
    setShowSlideMenu,
    adminView,
    setAdminView,
  } = usePlayerStore();
  
  const { user } = useAuthStore();

  useEffect(() => {
    if (showSlideMenu) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showSlideMenu]);

  if (user?.role !== 'admin' || !showSlideMenu) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 transition-opacity duration-300"
        onClick={() => {
          setShowSlideMenu(false);
          setAdminView(null);
        }}
      />
      
      {/* Menú principal */}
      <div className="absolute right-0 top-0 h-full w-96 bg-zinc-900 transform transition-transform duration-300">
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Panel Admin</h2>
            <X 
              size={28}
              className="cursor-pointer text-zinc-400 hover:text-white transition-colors"
              onClick={() => {
                setShowSlideMenu(false);
                setAdminView(null);
              }}
            />
          </div>

          {!adminView && (
            <div className="flex-1 space-y-6">
              <button
                onClick={() => setAdminView('upload')}
                className="w-full p-4 bg-zinc-800 rounded-xl flex items-center gap-3
                         hover:bg-zinc-700 transition-colors text-left"
              >
                <span className="text-2xl">🎵</span>
                <div>
                  <h3 className="font-semibold">Subir Canción</h3>
                  <p className="text-sm text-zinc-400">Agregar nueva música al catálogo</p>
                </div>
              </button>

              <button
                onClick={() => setAdminView('edit')}
                className="w-full p-4 bg-zinc-800 rounded-xl flex items-center gap-3
                         hover:bg-zinc-700 transition-colors text-left"
              >
                <span className="text-2xl">✏️</span>
                <div>
                  <h3 className="font-semibold">Editar Canción</h3>
                  <p className="text-sm text-zinc-400">Modificar información existente</p>
                </div>
              </button>

              <button
                onClick={() => setAdminView('delete')}
                className="w-full p-4 bg-zinc-800 rounded-xl flex items-center gap-3
                         hover:bg-zinc-700 transition-colors text-left"
              >
                <span className="text-2xl">🗑️</span>
                <div>
                  <h3 className="font-semibold">Eliminar Canción</h3>
                  <p className="text-sm text-zinc-400">Remover contenido del sistema</p>
                </div>
              </button>
            </div>
          )}

          {/* Vistas de administración */}
          <div className="flex-1">
            {adminView === 'upload' && <UploadForm />}
            {adminView === 'edit' && <EditForm />}
            {adminView === 'delete' && <DeleteForm />}
          </div>
        </div>
      </div>
    </div>
  );
};