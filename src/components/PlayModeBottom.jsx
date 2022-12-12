import { usePlayingSong } from "../context/playingSong";
import { ImShuffle, ImLoop, ImLoop2 } from "react-icons/im";
import IconContainer from "./icons/IconContainer";

const play_mode_to_icon = {
  0: <ImLoop size={24} />,
  1: (
    <div className="relative">
      <ImLoop2 size={24} />
      <div className="absolute inset-0 flex justify-center items-center z-10">
        <span className="text-xs font-medium select-none">1</span>
      </div>
    </div>
  ),
  2: <ImShuffle size={24} />,
};

export default function PlayModeBottom() {
  const {
    playingSong,
    setPlayingSong,
    // togglePlaying,
    // isPlaying,
    setQueue,
    audioRef,
    playMode,
    handleClickPlayMode,
  } = usePlayingSong();

  return (
    <IconContainer
      onClick={(e) => {
        e.stopPropagation();
        handleClickPlayMode();
      }}
    >
      {play_mode_to_icon[playMode]}
    </IconContainer>
  );
}
