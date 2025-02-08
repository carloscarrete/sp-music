import { Heart, Shuffle, SkipBack, Play, SkipForward, Repeat, Volume } from "lucide-react"
import { CurrentSong } from "./CurrentSong"
import { VolumeAudio } from "./VolumeAudio"

interface Props{
    isPlaying: boolean,
    togglePlayPause: () => void
}

export const Player = ({isPlaying, togglePlayPause}: Props) => {
    return (
        <div className="bg-black h-14  border-t border-zinc-800 px-4 flex items-center">
            <CurrentSong />

            <div className="flex gap-2 flex-1 items-center flex-col">
                <div className="flex items-center gap-6">
                    <Shuffle size={24} className="cursor-pointer text-zinc-400 hover:text-white" />
                    <SkipBack size={24} className="cursor-pointer text-zinc-400 hover:text-white" />
                    <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black hover:scale-105">
                        <Play onClick={togglePlayPause} size={24} />
                    </button>
                    <SkipForward size={24} className="cursor-pointer text-zinc-400 hover:text-white" />
                    <Repeat size={24} className="cursor-pointer text-zinc-400 hover:text-white" />
                </div>
                <div className="w-full max-w-lg flex items-center gap-2">
                    <span className="text-sm text-zinc-400">0:00</span>
                    <div className="h-1 flex-1 bg-zinc-600 rounded-full">
                        <div className="w-0 h-full bg-white rounded-full" />
                    </div>
                    <span className="text-sm text-zinc-400">3:17</span>
                </div>
            </div>

            <VolumeAudio />
        </div>)
}
