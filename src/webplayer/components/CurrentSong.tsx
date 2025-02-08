import { Heart } from "lucide-react"
import usePlayerStore from "../../store/useWebPlayer";

export const CurrentSong = () => {

    const { tracks, currentTrackIndex } = usePlayerStore();
    const currentTrack = tracks[currentTrackIndex];


    return (
        <div className="flex gap-3 w-80 items-center">
            <img src={currentTrack?.cover} alt="Cover" className="w-10 h-10 rounded-md" />
            <div>
                <p className="font-bold">{currentTrack?.name}</p>
                <p className="text-sm text-zinc-400">{currentTrack?.artist.name}</p>
            </div>
            <Heart size={24} fill="red" stroke="red" className="cursor-pointer text-white ml-3 hover:text-red-600" />
        </div>)
}
