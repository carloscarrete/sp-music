import { Heart } from "lucide-react"
import usePlayerStore from "../../store/useWebPlayer";
import { useEffect, useState } from "react";

export const CurrentSong = () => {

    const { tracks, currentTrackIndex, setFavoriteCurrentTrack } = usePlayerStore();
    const currentTrack = tracks[currentTrackIndex];
    const [isAnimating, setIsAnimating] = useState(false);

    const handleFavorite = () => {
        if (!currentTrack) return;
        setIsAnimating(true);
        setFavoriteCurrentTrack(currentTrack._id)
    }

    useEffect(() => {
        if (isAnimating) {
            setTimeout(() => {
                setIsAnimating(false);
            }, 600);
        }
    }, [isAnimating])


    return (
        <div className="flex gap-3 w-full sm:w-80 items-center">
            <img src={currentTrack?.cover} alt="Cover" className="w-10 h-10 rounded-md object-cover" />
            <div className="overflow-hidden w-3/5">
                <p className="font-bold truncate hover:animate-scroll">{currentTrack?.name}</p>
                <p className="text-sm text-zinc-400">{currentTrack?.artist.name}</p>
            </div>
            <Heart
                onClick={handleFavorite}
                size={window.innerWidth > 768 ? 24 : 30}                fill={currentTrack?.favorite ? "red" : "none"}
                stroke="red"
                className={`cursor-pointer text-white ml-3 hover:text-red-600 ${isAnimating ? 'animate-heartbeat' : ''}`}
            />
        </div>)
}



