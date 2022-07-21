import React from "react";
import Link from "next/link";
import { usePlayingSong } from "../context/playingSong";
import LikeButton from "./SongLikeButton";
import AudioControls from "./AudioControls";

const SideBarPlayer = () => {
  const { playingSong } = usePlayingSong();

  if (!playingSong) {
    return <></>;
  }

  return (
    <div className="flex-none py-8 flex flex-col gap-4">
      <Link href="/">
        <img src={playingSong.imgSrcMd}
          className="w-full rounded-xl aspect-square object-cover"
        />
      </Link>
      <div className="h-12 flex items-center">
        {/* Title left */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="line-clamp-1 font-bold">{playingSong.name}</div>
          <a
            href={playingSong.artistViewUrl}
            target="_blank"
            className="inline-block text-slate-500 text-base truncate"
            rel="noreferrer"
          >
            {playingSong.artistName}
          </a>
        </div>
        {/* Title right */}
        <div className="flex-none flex justify-center items-center ml-2">
          <LikeButton song={playingSong} size={28} />
        </div>
      </div>
      <AudioControls size={38} className="" />
    </div>
  );
};

export default function SideBar() {
  const navItems = [
    { text: "Home", url: "/" },
    { text: "Search", url: "/search" },
  ];

  return (
    <aside className="w-64 flex-none flex flex-col items-stretch px-6">
      <section className="py-6">
        <span className="text-xl font-bold">Music App</span>
      </section>
      <hr />
      <section className="py-6 flex flex-col gap-4">
        {navItems.map((item, i) => (
          <Link key={i} href={item.url} passHref>
            <a className="py-2 px-3 bg-slate-200 rounded-lg hover:bg-slate-300 ">
              {item.text}
            </a>
          </Link>
        ))}
      </section>
      <div className="flex-1"></div>
      <SideBarPlayer />
    </aside>
  );
}
