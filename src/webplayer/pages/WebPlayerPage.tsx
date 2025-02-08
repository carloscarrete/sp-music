import { Sidebar } from "../components/Sidebar";
import { PlayerScreen } from "../components/PlayerScreen";
import { Player } from "../components/Player";
import { useEffect, useRef } from "react";
import { getTracks } from "../../actions/webplayer/tracks";
import usePlayerStore from "../../store/useWebPlayer";

export const WebPlayerPage = () => {

  const {
    isPlaying,
    volume,
    currentTrackIndex,
    currentTime,
    tracks,
    togglePlayPause,
    stop,
    nextTrack,
    previousTrack,
    setVolume,
    setAudioElement
  } = usePlayerStore();

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;


  }, []);
  
  console.log(currentTime)

  return (
    <div className="flex h-screen text-white flex-col bg-black">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <PlayerScreen />
      </div>
      <audio
        ref={audioRef}
        src={tracks[currentTrackIndex].url}
        onEnded={nextTrack}
      />      <Player isPlaying={isPlaying} togglePlayPause={togglePlayPause} />
    </div>
  );
};
