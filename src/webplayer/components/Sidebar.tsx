import { ArrowRight, Heart, Home, Library, Search } from "lucide-react"
import { SidebarNav } from "./SidebarNav"
import { Tracks } from "../../entities/domain/tracks"
import usePlayerStore from "../../store/useWebPlayer"

interface Props {
    tracks: Tracks[]
}

export const Sidebar = ({ tracks }: Props) => {

    const { setCurrentTrackIndex } = usePlayerStore();

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
                            <p className="text-sm text-zinc-400">Lista • {tracks.length} canciones</p>
                        </div>
                    </div>
                    <div className="border-b border-white/25 w-full" />
                    {
                        tracks.map((track, index) => (
                            
                            <div className="flex gap-2 mt-1 hover:bg-zinc-800 cursor-pointer" key={track._id} onClick={() => setCurrentTrackIndex(track._id)}>
                                <img src={track.cover} alt="Cover" className="w-10 h-10 rounded-md" />
                                <div className="overflow-hidden">
                                    <p className="font-bold truncate hover:animate-scroll">{track.name}</p>
                                    <p className="text-sm text-zinc-400">{track.artist.name}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </aside>)
}
