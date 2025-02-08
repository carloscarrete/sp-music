import { Volume } from 'lucide-react'

export const VolumeAudio = () => {
  return (
    <div className="w-80 flex justify-end items-center gap-4">
    <Volume size={24} className="cursor-pointer text-zinc-400 hover:text-white" />
    <div className="w-24 h-1 bg-zinc-600 rounded-full">
        <div className="w-1/2 h-full bg-white rounded-full" />
    </div>
</div>  )
}
