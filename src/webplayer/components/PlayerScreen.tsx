import { Tracks } from "../../entities/domain/tracks"
import usePlayerStore from "../../store/useWebPlayer";
import { SearchInput } from "./SearchInput";

interface Props {
    tracks: Tracks[];
}

export const PlayerScreen = ({tracks}: Props) => {

    const {setCurrentTrackIndex,filteredTracks, showSearch, searchQuery} = usePlayerStore();

    const displayedTracks = searchQuery ? filteredTracks : tracks

    return (
        <main className="bg-black flex-1 p-2">
            <SearchInput />
            <div className="bg-zinc-900  h-screen rounded-xl p-4">
                <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-6 auto-rows-min">
                {/* <div className="grid grid-cols-5 md:grid-cols-4 sm:grid-cols-2 lg:grid-cols-5 gap-6 auto-rows-min"> */}
                    {displayedTracks.map((track, index) => (
                        <div key={track._id} className="relative group overflow-hidden" onClick={()=>setCurrentTrackIndex(track._id)}>
                            <div className="transform transition-all duration-300 ease-in-out group-hover:scale-110 flex items-center justify-center overflow-hidden">
                                <img 
                                    src={track.cover} 
                                    alt={track.name} 
                                    className="w-40 h-40 bg-black rounded-xl"
                                />
                            </div>
                            
                            <div className="overflow-hidden absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-black/40 p-3 opacity-0 transition-all group-hover:opacity-100">                                <p className="text-white text-sm font-medium text-center truncate ">
                                    {track.name}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}


/* 
 <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-black/40 p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out transform translate-y-1 group-hover:translate-y-0 rounded-b-xl">
*/