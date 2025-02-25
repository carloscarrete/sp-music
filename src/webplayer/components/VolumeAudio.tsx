import {  Volume1, Volume2, VolumeX } from 'lucide-react'
import usePlayerStore from '../../store/useWebPlayer'

export const VolumeAudio = () => {

  const {volume, setVolume} = usePlayerStore();

  const onChangeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
  }

  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeX size={24} className="cursor-pointer text-zinc-400 hover:text-white" />;
    if (volume < 0.5) return <Volume1 size={24} className="cursor-pointer text-zinc-400 hover:text-white" />;
    return <Volume2 size={24} className="cursor-pointer text-zinc-400 hover:text-white"/>;
  };

  return (
    <div className="w-80 flex justify-center sm:justify-end items-center gap-4">
      {getVolumeIcon()}
    {/* <div className="w-24 h-1 bg-zinc-600 rounded-full">
        <div className="w-1/2 h-full bg-white rounded-full" />
    </div> */}
    <input type="range" 
        min={0}
        max={1}
        defaultValue={volume}
        onChange={onChangeVolume}
        step={0.1}
        className="w-3/4 sm:w-24 h-1 bg-zinc-600 rounded-full"
     />
</div>  )
}
