import { Home, Search } from 'lucide-react'

export const SidebarNav = () => {
    return (
        <nav className="bg-zinc-900 p-4 flex flex-col gap-1.5 rounded-xl">
            <a href="#" className="text-zinc-200 flex items-center gap-4 text-lg hover:text-white"><Home size={24} />Inicio</a>
            <a href="#" className="text-zinc-200 flex items-center gap-4 text-lg hover:text-white"><Search size={24} />Buscar</a>
        </nav>
    )
}
