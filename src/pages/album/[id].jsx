import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import useSWR from "swr";
import { usePlayingSong } from "../../context/playingSong";
import { process_itunes_album_result, process_itunes_tracks } from "../../util";
import { ImSpinner2 } from "react-icons/im";
import SongList from "../../components/SongList";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const songListConfig = {
  classes: {
    row: (playing) =>
      (playing
        ? "lg:border-blue-500 bg-blue-100"
        : "lg:border-transparent bg-slate-100") +
      ` group py-1 flex-1 lg:border-l-2 cursor-pointer flex items-center hover:bg-white transition-all duration-300 `,
    number: "text-slate-400",
    numberContainer:
      "hidden flex-none w-16 text-center lg:flex justify-center items-center",
    img: "h-12 aspect-square object-contain rounded-lg",
    imgContainer: "hidden lg:block py-2 mr-6",
    name: "group-hover:text-blue-500 truncate",
    nameContainer: "flex-1 flex flex-col overflow-hidden",
    author: "text-slate-500 group-hover:text-blue-400 truncate",
    albumContainer: 'hidden',
    durationContainer:
      "hidden md:block flex-none justify-self-end flex mr-6 gap-8",
    duration: "w-16 text-right",
  },
};

const AlbumHeader = ({ album, playAlbum }) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 py-8">
      <div>
        <img
          src={album.artworkUrl100.replace("100x100", "270x270")}
          className="rounded-3xl"
        />
      </div>
      <div className="flex flex-col justify-between">
        {/* Upper Content */}
        <div className="">
          <div className="text-4xl font-medium pb-2">
            {album.collectionName}
          </div>
          <div className="text-slate-500">
            <Link href={album} passHref>
              <a>{album.artistName}</a>
            </Link>
          </div>
        </div>
        {/* Bottom Content */}
        <div className=" ">
          <button
            className="w-full md:max-w-[12rem] py-3 text-center bg-slate-700 rounded-lg text-white font-medium cursor-pointer"
            onClick={playAlbum}
          >
            Play Album
          </button>
        </div>
      </div>
    </div>
  );
};

export default function AlbumPage() {
  const router = useRouter();
  const { id } = router.query;
  const [songs, setSongs] = useState([]);
  const [alData, setAlData] = useState();
  const { setQueue, playQueue } = usePlayingSong();

  console.log("render album page", { id });

  const { data, error } = useSWR(
    id && `https://itunes.apple.com/lookup?id=${id}&limit=50&entity=song`,
    fetcher
  );

  const playAlbum = () => {
    console.log("play album");
    console.log("first song: ", songs[0]);
    playQueue(songs);
  };

  useEffect(() => {
    if (data) {
      console.log("got data", data);
      setSongs(() => process_itunes_tracks(data.results.slice(1)));
      setAlData(() => process_itunes_album_result([data.results[0]])[0]);
    }
  }, [data]);

  return (
    <div className="">
      {!error && !data && <ImSpinner2 size={44} className="animate-spin" />}
      {alData && <AlbumHeader album={alData} playAlbum={playAlbum} />}
      {/* <div className="d-flex flex-wrap">{trackElemArray}</div> */}
      {songs.length !== 0 && <SongList songs={songs} config={songListConfig} />}
    </div>
  );
}
