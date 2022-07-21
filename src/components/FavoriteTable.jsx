// import { useState, useEffect } from 'react';
import { usePlayingSong } from "../context/playingSong";
import { useFSongs, useFAlbums } from "../context/favorite";
// import { PlayButton } from './AudioControls';
import SongList from "./SongList";
import HomeBox from "./Box";

const songListConfig = {
  classes: {
    row: (playing) =>
      (playing
        ? "lg:border-blue-500 bg-blue-50"
        : "lg:border-transparent bg-transparent") +
      ` group py-1 flex-1 lg:border-l-2 cursor-pointer flex items-center hover:bg-white transition-all duration-300 `,
    number: "text-slate-400",
    numberContainer:
      "hidden flex-none w-16 text-center lg:flex justify-center items-center",
    img: "h-10 aspect-square object-contain rounded-lg",
    imgContainer: "hidden lg:block py-2 mr-4",
    nameContainer: "flex-1 flex flex-col overflow-hidden",
    name: "group-hover:text-blue-500 truncate",
    author: "text-slate-500 group-hover:text-blue-400 truncate",
    albumContainer: 'flex-none w-1/4',
    durationContainer:
      "hidden md:block flex-none justify-self-end flex mr-6 gap-8",
    duration: "w-16 text-right",
  },
};

export default function FavoriteTable() {
  const { fSongs } = useFSongs();
  const { fAlbums } = useFAlbums();
  const { playingSong, setPlayingSong, togglePlaying, playQueue } =
    usePlayingSong();
    
  console.log("render favorite table", { fSongs });

  return (
    <HomeBox className="w-full py-6 flex flex-col self-stretch ">
      <div className="flex-none flex items-center pb-4">
        <span className="inline-block flex-1 text-xl font-bold">
          My Favorites
        </span>
        <div
          className="w-28 py-2 flex justify-center items-center bg-slate-600 text-white rounded-lg cursor-pointer"
          onClick={() => playQueue(fSongs)}
        >
          Play All
        </div>
      </div>
      {fSongs && (
        <div className="flex-1 flex flex-col items-stretch overflow-y-scroll">
          <SongList songs={fSongs} config={songListConfig} />
        </div>
      )}
    </HomeBox>
  );
}
