import { ArrowRight, Heart, Home, Library, Play, Repeat, Search, Shuffle, SkipBack, SkipForward, Volume } from "lucide-react";
import { useEffect } from "react";
import webPlayerApi from "../../api/webPlayerApi";

export const WebPlayerPage = () => {

  return (
    <div className="flex h-screen text-white flex-col bg-black">
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-72 bg-black p-2  flex flex-col gap-2">
          <nav className="bg-zinc-900 p-4 flex flex-col gap-1.5 rounded-xl">
            <a href="#" className="text-zinc-200 flex items-center gap-4 text-lg hover:text-white"><Home size={24} />Inicio</a>
            <a href="#" className="text-zinc-200 flex items-center gap-4 text-lg hover:text-white"><Search size={24} />Buscar</a>
          </nav>

          <div className="bg-zinc-900 h-full rounded-xl p-4 flex-1">
            <div className="flex gap-2 items-center text-zinc-200">
              <Library size={24} />
              <span>Música</span>
              <div className="ml-auto">
                <ArrowRight size={24} className="cursor-pointer text-white" />
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2">
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
                <div>
                  <p className="font-bold">Canción de prueba 2</p>
                  <p className="text-sm text-zinc-400">Artista de prueba 2</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

        <main className="bg-black flex-1 p-2">
          <div className="bg-zinc-900 flex h-screen rounded-xl p-4">
          <div className="grid grid-cols-5 md:grid-cols-4 sm:grid-cols-2 lg:grid-cols-5 gap-6 auto-rows-min">
          <div className="h-40 w-40 bg-black auto-cols-fr"/>
            <div className="h-40 w-40 bg-black auto-cols-fr"/>
            <div className="h-40 w-40 bg-black auto-cols-fr"/>
            <div className="h-40 w-40 bg-black auto-cols-fr"/>
            <div className="h-40 w-40 bg-black auto-cols-fr"/>
            <div className="h-40 w-40 bg-black auto-cols-fr"/>

           </div>
          </div>
        </main>

      </div>
      <div className="bg-black h-14  border-t border-zinc-800 px-4 flex items-center">
        <div className="flex gap-3 w-80 items-center">
          <img src="https://i.pinimg.com/736x/05/04/fd/0504fd9653ed3c9ee66c9feba0d03773.jpg" alt="Cover" className="w-10 h-10 rounded-md" />
          <div>
            <p className="font-bold">Canción de prueba 2</p>
            <p className="text-sm text-zinc-400">Artista de prueba 2</p>
          </div>
          <Heart size={24} fill="red" stroke="red" className="cursor-pointer text-white ml-3 hover:text-red-600" />
        </div>

        <div className="flex gap-2 flex-1 items-center flex-col">
          <div className="flex items-center gap-6">
            <Shuffle size={24} className="cursor-pointer text-zinc-400 hover:text-white" />
            <SkipBack size={24} className="cursor-pointer text-zinc-400 hover:text-white" />
            <button className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-black hover:scale-105">
              <Play size={24} />
            </button>
            <SkipForward size={24} className="cursor-pointer text-zinc-400 hover:text-white" />
            <Repeat size={24} className="cursor-pointer text-zinc-400 hover:text-white" />
          </div>
          <div className="w-full max-w-lg flex items-center gap-2">
            <span className="text-sm text-zinc-400">0:00</span>
            <div className="h-1 flex-1 bg-zinc-600 rounded-full">
              <div className="w-0 h-full bg-white rounded-full" />
            </div>
            <span className="text-sm text-zinc-400">3:17</span>
          </div>
        </div>

        <div className="w-80 flex justify-end items-center gap-4">
          <Volume size={24} className="cursor-pointer text-zinc-400 hover:text-white" />
          <div className="w-24 h-1 bg-zinc-600 rounded-full">
            <div className="w-1/2 h-full bg-white rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
