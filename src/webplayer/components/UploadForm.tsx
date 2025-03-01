import { X, Upload } from "lucide-react";
import { useFormik } from "formik";
import usePlayerStore from "../../store/useWebPlayer";
import { useAuthStore } from "../../store/useAuthStore";
import { useEffect, useState } from "react";
import { uploadFile } from "../../actions/webplayer/storage";
import { createTrack } from "../../actions/webplayer/tracks";
import { useQueryClient } from "@tanstack/react-query";

export const UploadForm = () => {
  const queryClient = useQueryClient();
  const { setAdminView } = usePlayerStore();
  const { user } = useAuthStore();
  const [audioPreview, setAudioPreview] = useState<string | null>(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      album: '',
      cover: '',
      artist: {
        name: '',
        nickname: '',
        nationality: ''
      },
      duration: {
        start: 0,
        end: 0
      },
      audioFile: null as File | null,
      mediaId: ''
    },
    onSubmit: async (values) => {
      try {
        const formDataAudio = new FormData();
        formDataAudio.append('myfile', values.audioFile ?? '');

        const audioResponse = await uploadFile(formDataAudio);
        if (!audioResponse || !audioResponse._id) {
          throw new Error('Error uploading the audio');
        }

        const track = await createTrack({
          album: values.album,
          artist: values.artist,
          cover: values.cover,
          duration: values.duration,
          name: values.name,
          mediaId: audioResponse._id,
          favorite: false,

        });
        if (!track) {
          throw new Error('Error creating the track');
        }

        await queryClient.invalidateQueries({ queryKey: ['tracks'] });
        setAdminView(null);
      } catch (error) {
        console.error("Error uploading the track:", error);
      }
    }
  });

  /*    useEffect(() => {
       if (formik.values.cover) {
         const reader = new FileReader();
         reader.onload = () => setPreviewImage(reader.result as string);
         reader.readAsDataURL(formik.values.cover);
       } else {
         setPreviewImage(null);
       }
     }, [formik.values.cover]); */

  useEffect(() => {
    if (formik.values.audioFile) {
      const url = URL.createObjectURL(formik.values.audioFile);
      setAudioPreview(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [formik.values.audioFile]);

  if (user?.role !== 'admin') return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-zinc-900 p-6 rounded-xl w-96 relative">
        <X
          size={24}
          className="absolute top-4 right-4 cursor-pointer text-zinc-400 hover:text-white"
          onClick={() => setAdminView(null)}
        />

        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Upload size={20} />
          Upload new track
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-zinc-400 mb-1">Song name *</label>
            <input
              name="name"
              required
              className="w-full p-2 bg-zinc-800 rounded-lg text-white focus:ring-2 focus:ring-green-500"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-1">Artist name *</label>
            <input
              name="artist.name"
              required
              className="w-full p-2 bg-zinc-800 rounded-lg text-white focus:ring-2 focus:ring-green-500"
              onChange={formik.handleChange}
              value={formik.values.artist.name}
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-1">Album *</label>
            <input
              name="album"
              required
              className="w-full p-2 bg-zinc-800 rounded-lg text-white focus:ring-2 focus:ring-green-500"
              onChange={formik.handleChange}
              value={formik.values.album}
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-1">Cover URL *</label>
            <div className="flex items-center gap-4">
              {formik.values.cover && (
                <img
                  src={formik.values.cover}
                  alt="Preview"
                  className="w-16 h-16 object-cover rounded-lg"
                />
              )}
              <input
                type="text"
                name="cover"
                required
                className="w-full p-2 bg-zinc-800 rounded-lg text-white focus:ring-2 focus:ring-green-500"
                onChange={formik.handleChange}
                value={formik.values.cover}
                placeholder="https://ejemplo.com/imagen.jpg"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Artist nickname *</label>
              <input
                name="artist.nickname"
                required
                className="w-full p-2 bg-zinc-800 rounded-lg text-white focus:ring-2 focus:ring-green-500"
                onChange={formik.handleChange}
                value={formik.values.artist.nickname}
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-1">Nationality *</label>
              <input
                name="artist.nationality"
                required
                className="w-full p-2 bg-zinc-800 rounded-lg text-white focus:ring-2 focus:ring-green-500"
                onChange={formik.handleChange}
                value={formik.values.artist.nationality}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Start time (seg) *</label>
              <input
                type="number"
                name="duration.start"
                required
                min="0"
                className="w-full p-2 bg-zinc-800 rounded-lg text-white focus:ring-2 focus:ring-green-500"
                onChange={formik.handleChange}
                value={formik.values.duration.start}
              />
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-1">End time (seg) *</label>
              <input
                type="number"
                name="duration.end"
                required
                min="0"
                className="w-full p-2 bg-zinc-800 rounded-lg text-white focus:ring-2 focus:ring-green-500"
                onChange={formik.handleChange}
                value={formik.values.duration.end}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-1">Audio file (MP3/WAV) *</label>
            <div className="flex flex-col gap-2">
              {audioPreview && (
                <audio controls className="w-full">
                  <source src={audioPreview} type="audio/mpeg" />
                </audio>
              )}
              <input
                type="file"
                accept="audio/*"
                required
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  formik.setFieldValue("audioFile", file);
                }}
                className="text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 p-2 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2 mt-4"
          >
            <Upload size={18} />
            Upload track
          </button>
        </form>
      </div>
    </div>
  );
};