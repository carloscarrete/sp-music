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
}

const usePlayerStore = create<PlayState>((set, get) => ({
    isPlaying: false,
    volume: 1,
    duration: 0,
    currentTime: 0,
    currentTrackIndex: 0,
    audioElement: null,
    tracks: [
        {
            _id: '67a6e8f98e6622283bb6c917',
            url: 'http://localhost:3200/1738991864886-Hoobastank%20-%20The%20Reason%20%20(Audio)%20[2kB3JxcZUUM].mp3',
            filename: '1738991864886-Hoobastank - The Reason  (Audio) [2kB3JxcZUUM].mp3'
        
        }
    ],
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
    nextTrack: () => {
        const { currentTrackIndex, tracks } = get();
        const newIndex = (currentTrackIndex + 1) % tracks.length;
        set({ currentTrackIndex: newIndex, isPlaying: true });
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
      }
}))

export default usePlayerStore;