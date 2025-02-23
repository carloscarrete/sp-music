import { create } from "zustand";
import { Tracks } from "../entities/domain/tracks";
import { setFavoriteTrack } from "../actions/webplayer/tracks";
import { AdminStatus } from "../interfaces/admin.status";

interface PlayState {
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  currentTrackIndex: number;
  tracks: Tracks[];
  favoritesTracks: Tracks[];
  audioElement: HTMLAudioElement | null;
  duration: number;
  showSearch: boolean;
  searchQuery: string;
  filteredTracks: Tracks[];
  showSlideMenu: boolean;

  adminView: AdminStatus
  selectedTrackForEdit: Tracks | null;
  selectedTrackForDelete: Tracks | null;

  togglePlayPause: () => void;
  stop: () => void;
  nextTrack: () => void;
  previousTrack: () => void;
  setVolume: (volume: number) => void;
  setAudioElement: (element: HTMLAudioElement) => void;
  setDuration: (duration: number) => void;
  setCurrentTime: (currentTime: number) => void;
  setTracks: (tracks: Tracks[]) => void;
  setFavoritesTracks: (tracks: Tracks[]) => void;
  setCurrentTrackIndex: (trackId: string) => void;
  setFavoriteCurrentTrack: (trackId: string) => void;
  setShowSearch: (showSearch: boolean) => void;
  setSearchQuery: (query: string) => void;
  setFilteredTracks: (tracks: Tracks[]) => void;
  setShowSlideMenu: (show: boolean) => void;

  setAdminView: (view: PlayState['adminView']) => void;
  setSelectedTrackForEdit: (track: Tracks | null) => void;
  setSelectedTrackForDelete: (track: Tracks | null) => void;
}

const usePlayerStore = create<PlayState>((set, get) => ({
  adminView: null,
  selectedTrackForEdit: null,
  selectedTrackForDelete: null,

  isPlaying: false,
  volume: 1,
  duration: 0,
  currentTime: 0,
  currentTrackIndex: 0,
  audioElement: null,
  tracks: [],
  favoritesTracks: [],
  showSearch: false,
  searchQuery: '',
  filteredTracks: [],
  showSlideMenu: false,
  togglePlayPause: () => {
    const { audioElement, isPlaying } = get();
    if (!audioElement) return;
    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
    set({ isPlaying: !isPlaying });
  },

  stop: () => {
    const { audioElement } = get();
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
    }
    set({ isPlaying: false, currentTime: 0 });
  },
  nextTrack: async () => {
    const { currentTrackIndex, tracks, audioElement } = get();
    if (tracks.length === 0) return;

    const newIndex = (currentTrackIndex + 1) % tracks.length;

    if (audioElement) {
      try {
        audioElement.pause();
        set({ currentTrackIndex: newIndex, currentTime: 0 });
        audioElement.src = tracks[newIndex].audio.url;

        await new Promise((resolve, reject) => {
          audioElement.oncanplay = resolve;
          audioElement.load();
        })
        audioElement.play();
        set({ isPlaying: true });
      } catch (error) {
        console.error('Error al reproducir el audio:', error);
        set({ isPlaying: false });
      }
    }

    set({ currentTrackIndex: newIndex, isPlaying: true, currentTime: 0 });
  },
  previousTrack: async () => {
    const { currentTrackIndex, audioElement, tracks } = get();
    if (tracks.length === 0) return;
    const newIndex = (currentTrackIndex + 1) % tracks.length;

    if (audioElement) {
      try {
        audioElement.pause();
        set({ currentTrackIndex: newIndex, currentTime: 0 })
        audioElement.src = tracks[newIndex].audio.url,

          await new Promise((resolve, reject) => {
            audioElement.oncanplay = resolve;
            audioElement.load();
          })

        audioElement.play();
        set({ isPlaying: true });

      } catch (error) {
        console.log(error);
        set({ isPlaying: false })
      }
    }
  },
  setVolume: (volume: number) => {
    const { audioElement } = get();
    if (audioElement) {
      audioElement.volume = volume;
    }
    set({ volume });
  },

  setAudioElement: (element: HTMLAudioElement) => {
    set({ audioElement: element });
  },

  setCurrentTime: (time: number) => {
    set({ currentTime: time });
  },

  setDuration: (duration: number) => {
    set({ duration });
  },

  setTracks: (tracks: Tracks[]) => {
    set({ tracks })
  },

  setCurrentTrackIndex: async (trackId: string) => {
    const { audioElement, tracks } = get();

    const index = tracks.findIndex(track => track._id === trackId);

    if (index === -1) return;

    if (audioElement) {
      try {
        audioElement.pause();
        set({ currentTrackIndex: index, currentTime: 0 })
        audioElement.src = tracks[index].audio.url,

          await new Promise((resolve, reject) => {
            audioElement.oncanplay = resolve;
            audioElement.load();
          })
        audioElement.play();
        set({ isPlaying: true });
      } catch (error) {
        console.log(error);
      }
    }
  },
  setFavoritesTracks: (tracks: Tracks[]) => {
    set({ favoritesTracks: tracks.filter((track) => track.favorite) });
  },
  setFavoriteCurrentTrack: async (trackId: string) => {
    try {
      const { tracks } = get();
      const res = await setFavoriteTrack(trackId);

      if (res.data.acknowledged && res.data.modifiedCount > 0) {
        const updatedTracks = tracks.map(track =>
          track._id === trackId ? { ...track, favorite: !track.favorite } : track
        );

        set({
          tracks: updatedTracks,
          favoritesTracks: updatedTracks.filter(track => track.favorite)
        });
      }
    } catch (error) {
      console.error(error);
    }
  },
  setShowSearch: (show: boolean) => set({ showSearch: show }),
  setSearchQuery: (term: string) => {
    set({ searchQuery: term })
    if (term === '') {
      set({ filteredTracks: [] })
    }
  },
    setFilteredTracks: (tracks: Tracks[]) => set({ filteredTracks: tracks }),
    setShowSlideMenu: (show: boolean) => set({ showSlideMenu: show }),
    setAdminView: (view) => set({ adminView: view }),
    setSelectedTrackForEdit: (track) => set({ selectedTrackForEdit: track }),
    setSelectedTrackForDelete: (track) => set({ selectedTrackForDelete: track }),
}))

export default usePlayerStore;