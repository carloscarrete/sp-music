import { Shuffle, SkipBack, Play, SkipForward, Repeat, Pause } from "lucide-react"
import { CurrentSong } from "./CurrentSong"
import { VolumeAudio } from "./VolumeAudio"
import { Tracks } from "../../entities/domain/tracks";

interface Props {
    isPlaying: boolean;
    togglePlayPause: () => void;
    currentTime: number;
    duration: number;
    onSeek: (time: number) => void;
    onNextTrack: () => void;
    onPreviousTrack: () => void;
    tracks: Tracks[]
}

export const Player = ({ isPlaying, togglePlayPause, currentTime, duration, onSeek, onNextTrack, onPreviousTrack, tracks }: Props) => {
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="bg-black sm:h-14 h-30 border-t border-zinc-800 px-4 flex flex-col sm:flex-row items-center">
            <CurrentSong />

            <div className="flex w-full gap-2 flex-1 items-center flex-col">
                <div className="flex items-center gap-6">
                    <Shuffle size={window.innerWidth > 768 ? 24 : 30} className="cursor-pointer text-zinc-400 hover:text-white" />
                    <button
                        onClick={onPreviousTrack}
                        disabled={tracks.length === 0}
                    >
                        <SkipBack size={window.innerWidth > 768 ? 24 : 30} className={`cursor-pointer ${tracks.length === 0 ? 'text-zinc-600' : 'text-zinc-400 hover:text-white'}`} />                    </button>
                    <button className="w- h-10 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center text-black hover:scale-105">
                        {isPlaying ? (
                            <Pause onClick={togglePlayPause} size={window.innerWidth > 768 ? 24 : 30} />
                        ) : (
                            <Play onClick={togglePlayPause} size={window.innerWidth > 768 ? 24 : 30} />
                        )}                    </button>
                    <button onClick={onNextTrack}>
                        <SkipForward size={window.innerWidth > 768 ? 24 : 30} className="cursor-pointer text-zinc-400 hover:text-white" />
                    </button>
                    <Repeat size={window.innerWidth > 768 ? 24 : 30} className="cursor-pointer text-zinc-400 hover:text-white" />
                </div>
                <div className="w-full max-w-lg flex items-center gap-2">
                    <span className="text-sm text-zinc-400">{formatTime(currentTime)}</span>
                    {/* <div className="h-1 flex-1 bg-zinc-600 rounded-full">
                        <div className="w-0 h-full bg-white rounded-full" />
                    </div> */}
                    <input
                        type="range"
                        min="0" max={duration || 0}
                        step={0.1}
                        value={currentTime}
                        onChange={(e) => onSeek(parseFloat(e.target.value))}
                        className="w-full h-1 bg-zinc-600 rounded-full appearance-none cursor-pointer"
                    />
                    <span className="text-sm text-zinc-400">{formatTime(duration)}</span>
                </div>
            </div>

            <div>
                <VolumeAudio />
            </div>
        </div>)
}
