import { ArrowRight, Heart, Library } from "lucide-react"
import { SidebarNav } from "./SidebarNav"
import { Tracks } from "../../entities/domain/tracks"
import usePlayerStore from "../../store/useWebPlayer"
import { Switch } from "./Switch"
import { useState } from "react"

interface Props {
    favoriteTracks: Tracks[],
    tracks: Tracks[]
}

export const Sidebar = ({ favoriteTracks, tracks }: Props) => {

    const { setCurrentTrackIndex, searchQuery, filteredTracks } = usePlayerStore();
    const [isSwitchOn, setSwitchOn] = useState(false);

    const displayedTracks = searchQuery ? filteredTracks : tracks

    return (
        <aside className="w-full sm:w-72 bg-black p-2  flex flex-col gap-2">
            <SidebarNav />

            <div className="bg-zinc-900 h-full rounded-xl p-4 flex-1 overflow-y-scroll no-scrollbar">
                <div className="flex gap-2 items-center text-zinc-200">
                    <Library size={24} />
                   {/*  <span className="hidden sm:block">Música</span>
                    <span className="sm:hidden">Favoritos</span> */}
                    {window.innerWidth > 768 ? <span>Música</span> : <span>Favoritos</span>}
                    <div className="ml-auto">
                        {
                            window.innerWidth > 768 ? <ArrowRight size={24} className="cursor-pointer text-white" /> :  <Switch  isOn={isSwitchOn} onToggle={setSwitchOn} />
                        }
                    </div>
                </div>

                <div className="mt-4 flex flex-col gap-2 overflow-hidden">
                    <div className="gap-2 hidden sm:flex">
                        <div className="bg-gradient-to-br from-purple-700 to to-blue-300 w-10 h-10 items-center justify-center flex rounded-md">
                            <Heart size={24} />
                        </div>
                        <div>
                            <p className="font-bold">Canciones que te gustan</p>
                            <p className="text-sm text-zinc-400">Lista • {favoriteTracks.length} canciones</p>
                        </div>
                    </div>
                    <div className="border-b border-white/25 w-full" />
                    {
                        !isSwitchOn  && window.innerWidth < 768 ? (
                            displayedTracks.map((track) => (

                                <div className="flex gap-2 mt-1 hover:bg-zinc-800 cursor-pointer" key={track._id} onClick={() => setCurrentTrackIndex(track._id)}>
                                    <img src={track.cover} alt="Cover" className="w-10 h-10 rounded-md" />
                                    <div className="overflow-hidden">
                                        <p className="font-bold truncate hover:animate-scroll">{track.name}</p>
                                        <p className="text-sm text-zinc-400">{track.artist.name}</p>
                                    </div>
                                </div>
                            ))
                        ) : 
                        (
                            favoriteTracks.map((track) => (

                                <div className="flex gap-2 mt-1 hover:bg-zinc-800 cursor-pointer" key={track._id} onClick={() => setCurrentTrackIndex(track._id)}>
                                    <img src={track.cover} alt="Cover" className="w-10 h-10 rounded-md" />
                                    <div className="overflow-hidden">
                                        <p className="font-bold truncate hover:animate-scroll">{track.name}</p>
                                        <p className="text-sm text-zinc-400">{track.artist.name}</p>
                                    </div>
                                </div>
                            ))
                        )
                    }
                </div>
            </div>
        </aside>)
}
