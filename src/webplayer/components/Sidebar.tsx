import { ArrowRight, Heart, Home, Library, Search } from "lucide-react"
import { SidebarNav } from "./SidebarNav"
import { Tracks } from "../../entities/domain/tracks"

interface Props {
    tracks: Tracks[]
}

export const Sidebar = ({tracks}:Props) => {
    return (
        <aside className="w-72 bg-black p-2  flex flex-col gap-2">
           <SidebarNav />
           
            <div className="bg-zinc-900 h-full rounded-xl p-4 flex-1">
                <div className="flex gap-2 items-center text-zinc-200">
                    <Library size={24} />
                    <span>Música</span>
                    <div className="ml-auto">
                        <ArrowRight size={24} className="cursor-pointer text-white" />
                    </div>
                </div>

                <div className="mt-4 flex flex-col gap-2 overflow-hidden">
    <div className="flex gap-2">
        <div className="bg-gradient-to-br from-purple-700 to to-blue-300 w-10 h-10 items-center justify-center flex rounded-md">
            <Heart size={24} />
        </div>
        <div>
            <p className="font-bold">Canciones que te gustan</p>
            <p className="text-sm text-zinc-400">Lista • 5 canciones</p>
        </div>
    </div>
    <div className="border-b border-white/25 w-full" />

    <div className="flex gap-2 mt-1 hover:bg-zinc-800 cursor-pointer">
        <img src="https://i.pinimg.com/736x/a2/8e/ba/a28eba952357c3a86f2ad7e410108b6d.jpg" alt="Cover" className="w-10 h-10 rounded-md" />
        <div>
            <p className="font-bold">Canción de prueba</p>
            <p className="text-sm text-zinc-400">Artista de prueba</p>
        </div>
    </div>
    <div className="flex gap-2 mt-1 hover:bg-zinc-800 cursor-pointer">
        <img src="https://i.pinimg.com/736x/23/bc/27/23bc27323d7f264713011f0501d9be29.jpg" alt="Cover" className="w-10 h-10 rounded-md" />
        <div className="overflow-hidden">
            <p className="font-bold truncate hover:animate-scroll">
                Canción de prueba 123456789101112131415
            </p>
            <p className="text-sm text-zinc-400">Artista de prueba 2</p>
        </div>
    </div>
</div>
            </div>
        </aside>)
}
