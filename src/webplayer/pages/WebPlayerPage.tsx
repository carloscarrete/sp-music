import { Sidebar } from "../components/Sidebar";
import { PlayerScreen } from "../components/PlayerScreen";
import { Player } from "../components/Player";

export const WebPlayerPage = () => {

  return (
    <div className="flex h-screen text-white flex-col bg-black">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <PlayerScreen />
      </div>
      <Player />
    </div>
  );
};
