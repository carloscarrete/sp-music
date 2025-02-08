import { Heart } from "lucide-react"

export const CurrentSong = () => {
    return (
        <div className="flex gap-3 w-80 items-center">
            <img src="https://i.pinimg.com/736x/05/04/fd/0504fd9653ed3c9ee66c9feba0d03773.jpg" alt="Cover" className="w-10 h-10 rounded-md" />
            <div>
                <p className="font-bold">Canción de prueba 2</p>
                <p className="text-sm text-zinc-400">Artista de prueba 2</p>
            </div>
            <Heart size={24} fill="red" stroke="red" className="cursor-pointer text-white ml-3 hover:text-red-600" />
        </div>)
}
