import { X, Trash2 } from "lucide-react";
import usePlayerStore from "../../store/useWebPlayer";
import { deleteTrack } from "../../actions/webplayer/tracks";

export const DeleteForm = () => {
  const { 
    tracks,
    setTracks,
    setAdminView,
    setSelectedTrackForDelete,
    selectedTrackForDelete,
  } = usePlayerStore();
  
  const handleDelete = async () => {
    if (!selectedTrackForDelete) return;
    
    try {
      const res = await deleteTrack(selectedTrackForDelete._id);
      if (!res) {
        throw new Error('Error al eliminar la track');
      }
      setTracks(tracks.filter(track => track._id !== selectedTrackForDelete._id));
      setAdminView(null);
    } catch (error) {
      console.error("Error eliminando canción:", error);
    }
  };

  return (
    <div className="bg-zinc-800 p-4 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">Eliminar Canción</h3>
        <X
          size={24}
          className="cursor-pointer text-zinc-400 hover:text-white"
          onClick={() => setAdminView(null)}
        />
      </div>

      {!selectedTrackForDelete ? (
        <div className="space-y-4">
          <select
            className="w-full p-2 bg-zinc-700 rounded-lg"
            onChange={(e) => {
              const track = tracks.find(t => t._id === e.target.value);
              track && setSelectedTrackForDelete(track);
            }}
          >
            <option value="">Selecciona una canción</option>
            {tracks.map(track => (
              <option key={track._id} value={track._id}>
                {track.name} - {track.artist.name}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center gap-4 bg-zinc-700 p-4 rounded-lg">
            <img
              src={selectedTrackForDelete.cover}
              alt="Cover"
              className="w-16 h-16 rounded-lg object-cover"
            />
            <div>
              <p className="font-semibold">{selectedTrackForDelete.name}</p>
              <p className="text-zinc-400 text-sm">{selectedTrackForDelete.artist.name}</p>
            </div>
          </div>

          <div className="flex gap-4 justify-end">
            <button
              onClick={() => setSelectedTrackForDelete(null)}
              className="px-4 py-2 bg-zinc-600 rounded-lg hover:bg-zinc-500 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-500 transition-colors flex items-center gap-2"
            >
              <Trash2 size={18} />
              Confirmar Eliminación
            </button>
          </div>
        </div>
      )}
    </div>
  );
};