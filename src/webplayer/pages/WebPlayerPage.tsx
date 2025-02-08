import { Sidebar } from "../components/Sidebar";
import { PlayerScreen } from "../components/PlayerScreen";
import { Player } from "../components/Player";
import { useEffect, useRef } from "react";
import { getTracks } from "../../actions/webplayer/tracks";
import usePlayerStore from "../../store/useWebPlayer";

export const WebPlayerPage = () => {

  const {
    isPlaying,
    currentTrackIndex,
    currentTime,
    tracks,
    togglePlayPause,
    nextTrack,
    previousTrack,
    setAudioElement,
    setDuration,
    setCurrentTime,
    duration
  } = usePlayerStore();

  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    setAudioElement(audio);

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const updateDuration = () => {
      setDuration(audio.duration);
    }

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };



  }, [setCurrentTime, setDuration]);

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
        onTimeUpdate={() => setCurrentTime(audioRef.current?.currentTime || 0)}
        onLoadedMetadata={() => setDuration(audioRef.current?.duration || 0)}
      />
      <Player
        isPlaying={isPlaying}
        togglePlayPause={togglePlayPause}
        currentTime={currentTime}
        duration={duration}
        onSeek={(time) => {
          if (audioRef.current) {
            audioRef.current.currentTime = time;
            setCurrentTime(time);
          }
        }} />
    </div>
  );
};
