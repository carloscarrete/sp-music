import { create } from "zustand";
import { Tracks } from "../entities/domain/tracks";

interface PlayState {
    isPlaying: boolean;
    volume: number;
    currentTime: number;
    currentTrackIndex: number;
    tracks: Tracks[];
    audioElement: HTMLAudioElement | null;
    duration: number;
    togglePlayPause: () => void;
    stop: () => void;
    nextTrack: () => void;
    previousTrack: () => void;
    setVolume: (volume: number) => void;
    setAudioElement: (element: HTMLAudioElement) => void;
    setDuration: (duration: number) => void;
    setCurrentTime: (currentTime: number) => void;
    setTracks: (tracks: Tracks[]) => void;
}

const usePlayerStore = create<PlayState>((set, get) => ({
    isPlaying: false,
    volume: 1,
    duration: 0,
    currentTime: 0,
    currentTrackIndex: 0,
    audioElement: null,
    tracks: [],
    togglePlayPause: () => {
        const {audioElement, isPlaying} = get();
        if(!audioElement) return;
        if(isPlaying){
            audioElement.pause();
        }else{
            audioElement.play();
        }
        set({isPlaying: !isPlaying});
    },

    stop: () => {
        const {audioElement} = get();
        if (audioElement) {
            audioElement.pause();
            audioElement.currentTime = 0;
        }
        set({ isPlaying: false, currentTime: 0 });
    },
    nextTrack: async () => {
        const { currentTrackIndex, tracks, audioElement } = get();
        if (tracks.length === 0) return;

        await new Promise(resolve => setTimeout(resolve, 100));

        const newIndex = (currentTrackIndex + 1) % tracks.length;

        if(audioElement){
          audioElement.pause();
          audioElement.src = tracks[newIndex].audio.url;
          audioElement.load();
          audioElement.play().catch((error) => {
            console.error('Error al reproducir el audio:', error);
          });
        }

        set({ currentTrackIndex: newIndex, isPlaying: true, currentTime: 0 });
      },
      previousTrack: () => {
        const { currentTrackIndex, tracks } = get();
        const newIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
        set({ currentTrackIndex: newIndex, isPlaying: true });
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
        set({tracks})
      }
}))

export default usePlayerStore;