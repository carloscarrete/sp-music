import { X, Save } from "lucide-react";
import { useFormik } from "formik";
import usePlayerStore from "../../store/useWebPlayer";
import { Tracks } from "../../entities/domain/tracks";
import { useEffect } from "react";
import { useQueryClient } from '@tanstack/react-query';
import { updateTrack } from "../../actions/webplayer/tracks";
import { TrackResponse } from '../../interfaces/tracks.interface';

export const EditForm = () => {
  const queryClient = useQueryClient(); 
  const {
    tracks,
    selectedTrackForEdit,
    setSelectedTrackForEdit,
    setAdminView,
  } = usePlayerStore();

  const formik = useFormik({
    initialValues: {
      _id: "",
      name: "",
      album: "",
      cover: "",
      artist: {
        name: "",
        nickname: "",
        nationality: "",
      },
      duration: {
        start: 0,
        end: 0,
      },
      audio: {
        url: "",
        filename: "",
      },
    } as Tracks,
    onSubmit: async (values) => {
      try {
        const res = await updateTrack(values);
        if (!res) {
          throw new Error('Error updating the track');
        }
        await queryClient.invalidateQueries({ queryKey: ['tracks'] });
        setAdminView(null);
      } catch (error) {
        console.error("Error updating the track:", error);
      }
    },
  });

  useEffect(() => {
    if (selectedTrackForEdit) {
      formik.setValues({
        ...selectedTrackForEdit,
        duration: {
          start: selectedTrackForEdit.duration.start,
          end: selectedTrackForEdit.duration.end,
        },
        artist: {
          name: selectedTrackForEdit.artist.name,
          nickname: selectedTrackForEdit.artist.nickname || "",
          nationality: selectedTrackForEdit.artist.nationality || "",
        },
      });
    }
  }, [selectedTrackForEdit]);

  if (!selectedTrackForEdit) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
        <div className="bg-zinc-900 p-6 rounded-xl w-96 relative">
          <X
            size={24}
            className="absolute top-4 right-4 cursor-pointer text-zinc-400 hover:text-white"
            onClick={() => setAdminView(null)}
          />
          
          <h2 className="text-xl font-bold mb-4">Select a track to edit</h2>
          
          <select
            className="w-full p-2 bg-zinc-800 rounded-lg text-white mb-4"
            onChange={(e) => {
              const track = tracks.find(t => t._id === e.target.value);
              if (track) setSelectedTrackForEdit(track);
            }}
          >
            <option value="">Select a track to edit</option>
            {tracks.map(track => (
              <option key={track._id} value={track._id}>
                {track.name} - {track.artist.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-zinc-900 p-6 rounded-xl w-96 relative">
        <X
          size={24}
          className="absolute top-4 right-4 cursor-pointer text-zinc-400 hover:text-white"
          onClick={() => {
            setSelectedTrackForEdit(null);
            setAdminView(null);
          }}
        />
        
        <h2 className="text-xl font-bold mb-4">Edit track</h2>
        
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Name:</label>
            <input
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              className="w-full p-2 bg-zinc-800 rounded-lg text-white"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-1">Album:</label>
            <input
              name="album"
              value={formik.values.album}
              onChange={formik.handleChange}
              className="w-full p-2 bg-zinc-800 rounded-lg text-white"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-1">Artist:</label>
            <input
              name="artist.name"
              value={formik.values.artist.name}
              onChange={formik.handleChange}
              className="w-full p-2 bg-zinc-800 rounded-lg text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Start (seconds):</label>
              <input
                type="number"
                name="duration.start"
                value={formik.values.duration.start}
                onChange={formik.handleChange}
                className="w-full p-2 bg-zinc-800 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-1">End (seconds):</label>
              <input
                type="number"
                name="duration.end"
                value={formik.values.duration.end}
                onChange={formik.handleChange}
                className="w-full p-2 bg-zinc-800 rounded-lg text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-1">Cover:</label>
            <img
              src={formik.values.cover}
              alt="Cover"
              className="w-20 h-20 object-cover rounded-lg mb-2"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    if (event.target?.result) {
                      formik.setFieldValue("cover", event.target.result);
                    }
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="w-full text-white"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-1">Current audio:</label>
            <audio controls className="w-full mb-2">
              <source src={formik.values.audio.url} type="audio/mpeg" />
            </audio>
            <input
              type="file"
              accept="audio/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  formik.setFieldValue("audio.filename", file.name);
                  const url = URL.createObjectURL(file);
                  formik.setFieldValue("audio.url", url);
                }
              }}
              className="w-full text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 p-2 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
          >
            <Save size={18} />
            Save changes
          </button>
        </form>
      </div>
    </div>
  );
};