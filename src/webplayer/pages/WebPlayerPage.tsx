import { Sidebar } from "../components/Sidebar";
import { PlayerScreen } from "../components/PlayerScreen";
import { Player } from "../components/Player";
import { useEffect, useRef } from "react";
import { getTracks } from "../../actions/webplayer/tracks";
import usePlayerStore from "../../store/useWebPlayer";
import { useQuery } from "@tanstack/react-query";
import { FABMenu } from "../components/FABMenu";
import { SlideMenu } from "../components/SlideMenu";

export const WebPlayerPage = () => {

  const {
    isPlaying,
    currentTrackIndex,
    currentTime,
    showSlideMenu,
    togglePlayPause,
    nextTrack,
    previousTrack,
    setAudioElement,
    setDuration,
    setCurrentTime,
    duration,
    setTracks,
    tracks,
    favoritesTracks,
    setFavoritesTracks,
    setShowSearch
  } = usePlayerStore();

  const audioRef = useRef<HTMLAudioElement>(null);


  const { data, isLoading, isError } = useQuery({
    queryKey: ['tracks'],
    queryFn: getTracks
  });

  useEffect(() => {
    if(data) setTracks(data)
    if(data) setFavoritesTracks(data)
  }, [data, setTracks, setFavoritesTracks])
  


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

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
        if (e.key === 'ArrowRight') nextTrack();
        if (e.key === 'ArrowLeft') previousTrack();
        if (e.key === 'b') togglePlayPause();
        if (e.key === 'Escape') setShowSearch(false);
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
}, [nextTrack, previousTrack, togglePlayPause]);

  return (
    <div className="flex h-screen text-white flex-col bg-black">
       <FABMenu />
       {showSlideMenu && <SlideMenu />}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar tracks={favoritesTracks}/>
        <PlayerScreen tracks={tracks}/>
      </div>
      <audio
        ref={audioRef}
        src={tracks[currentTrackIndex]?.audio?.url || ""}
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
        }} 
        onNextTrack={nextTrack}
        onPreviousTrack={previousTrack}
        tracks={tracks}
        />
    </div>
  );
};
