import { MoreVertical } from "lucide-react";
import usePlayerStore from "../../store/useWebPlayer";
import { useAuthStore } from "../../store/useAuthStore";

export const FABMenu = () => {
  const { user } = useAuthStore();
  const { setShowSlideMenu } = usePlayerStore();

  if (user?.role !== 'admin') return null;

  return (
    <button
      onClick={() => setShowSlideMenu(true)}
      className="fixed right-6 bottom-24 p-3 bg-green-600 rounded-full hover:bg-green-500 transition-all shadow-xl z-40
                 animate-bounce hover:animate-none"
    >
      <MoreVertical 
        size={28} 
        className="text-white stroke-[3]" 
      />
    </button>
  );
};