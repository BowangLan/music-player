import Link from "next/link";
import { usePlayingSong } from "../../context/playingSong";
import { PlayButton } from "../../components/AudioControls";
import { milliseconds_to_ms } from "../../util";
import Image from "next/image";
import SongContainer from "./SongContainer";
import ArtistText from "./ArtistText";

const IndexOrPlayButton = ({ i, isPlaying }) => {
  return (
    <div
      className={"flex-none w-16 text-center flex justify-center items-center"}
    >
      {isPlaying ? (
        <PlayButton size={32} />
      ) : (
        <span className={"text-slate-400"}>{i + 1}</span>
      )}
    </div>
  );
};

const SongImage = ({ song: s }) => {
  return (
    <div
      className={
        "relative h-12 w-12 hidden md:block mr-4 rounded-lg overflow-hidden"
      }
    >
      <Image src={s.imgSrcSm} alt={s.imgAlt} layout="fill" />
    </div>
  );
};

const TracknameText = ({ song: s, onClick }) => {
  return (
    <span
      className="group-hover:text-blue-600 truncate transition-all duration-300"
      onClick={onClick}
    >
      {s.trackName}
    </span>
  );
};

const DurationText = ({ song: s }) => {
  return (
    <div className="w-16 text-right">
      {milliseconds_to_ms(s.trackTimeMillis)}
    </div>
  );
};

const SongItem = ({
  song: s,
  index: i,
  isPlaying,
  handleSongNameClick,
  showIndex = true,
  showCollection = true,
}) => {
  return (
    <SongContainer isPlaying={isPlaying} i={i} p="py-2 px-2">
      {/* song index / play bottom */}
      {showIndex ? (
        <IndexOrPlayButton i={i} isPlaying={isPlaying} />
      ) : (
        <div className="w-4 md:w-6"></div>
      )}

      {/* song image */}
      <SongImage song={s} />

      {/* sone name and artist */}
      <div
        className="flex-1 flex flex-col truncate"
        onClick={() => handleSongNameClick(s)}
      >
        <TracknameText song={s} />
        <ArtistText data={s} />
      </div>

      {/* collection name */}
      {showCollection && (
        <Link href={`/album/${s.collectionId}`}>
          <div className="hidden md:block pl-2 w-1/3">
            <span className="text-sm hover:underline text-slate-400 line-clamp-2">
              {s.collectionName}
            </span>
          </div>
        </Link>
      )}

      {/* song duration */}
      <div className="block flex-none justify-self-end mr-6 gap-8">
        {/* <span className="hidden lg:block md:w-12 flex-none text-slate-500 ">${s.trackPrice}</span> */}
        <DurationText song={s} />
      </div>
    </SongContainer>
  );
};

export default function SongList({
  songs,
  className = "",
  showIndex,
  showCollection,
}) {
  const {
    playingSong,
    setPlayingSong,
    // togglePlaying,
    // isPlaying,
    setQueue,
    audioRef,
  } = usePlayingSong();

  const handleSongNameClick = (s) => {
    if (playingSong && playingSong.id === s.id) {
      // togglePlaying();
    } else {
      setQueue(songs);
      setPlayingSong(() => s);
    }
  };

  console.log("render song list", songs);

  return (
    <div className={`flex flex-col w-full ${className}`}>
      {songs.map((s, i) => (
        <SongItem
          song={s}
          key={`${i} - ${s.trackName}`}
          index={i}
          isPlaying={playingSong && playingSong.trackId === s.trackId}
          handleSongNameClick={handleSongNameClick}
          showIndex={showIndex}
          showCollection={showCollection}
        />
      ))}
    </div>
  );
}
