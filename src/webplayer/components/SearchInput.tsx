import { useEffect } from 'react'
import usePlayerStore from '../../store/useWebPlayer'

export const SearchInput = () => {
  const { searchQuery, setSearchQuery, setFilteredTracks, tracks, showSearch, setShowSearch } = usePlayerStore()
  
  // Debounce para la búsqueda
  useEffect(() => {
    const debounce = setTimeout(() => {
      const filtered = tracks.filter(track => 
        track.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        track.artist.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredTracks(filtered)
    }, 300)

    return () => clearTimeout(debounce)
  }, [searchQuery, tracks, setFilteredTracks])

  // Ocultar después de 3 segundos de inactividad
  useEffect(() => {
    const timeout = setTimeout(() => {
        setShowSearch(false)
      
    }, 3000)

    return () => clearTimeout(timeout)
  }, [searchQuery, setShowSearch])

  if (!showSearch) return null

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 w-1/2">
      <input
        type="text"
        placeholder="Buscar canciones..."
        className={`bg-zinc-800 text-white px-4 py-2 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300 ${
          showSearch ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        autoFocus
      />
    </div>
  )
}