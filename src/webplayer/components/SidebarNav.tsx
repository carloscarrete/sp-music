import { Home, LogOut, Search } from 'lucide-react'
import usePlayerStore from '../../store/useWebPlayer'
import { useAuthStore } from '../../store/useAuthStore';

export const SidebarNav = () => {

    const { setShowSearch, showSearch, setSearchQuery, } = usePlayerStore();
    const {logout} = useAuthStore();

    return (
        <nav className="bg-zinc-900 p-4 flex flex-col gap-1.5 rounded-xl">
            <h1>Bienvenido: 'username'</h1>
            <button className="text-zinc-200 flex items-center gap-4 text-lg hover:text-white" onClick={() => { setSearchQuery(''), setShowSearch(false) }}><Home size={24} />Inicio</button>
            <button className="text-zinc-200 flex items-center gap-4 text-lg hover:text-white" onClick={() => setShowSearch(!showSearch)}><Search size={24} />Buscar</button>
            <button className="text-zinc-200 flex items-center gap-4 text-lg hover:text-red-600" onClick={logout}> <LogOut /> Cerrar sesión </button>
        </nav>
    )
}
