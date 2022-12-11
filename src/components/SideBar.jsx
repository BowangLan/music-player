import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { usePlayingSong } from "../context/playingSong";
import { SongLikeButton } from "./LikeButton";
import AudioControls from "./AudioControls";
import Image from "next/image";
import { navItems } from "../constants";

const SideBarPlayer = () => {
  const { playingSong } = usePlayingSong();

  if (!playingSong) {
    return <></>;
  }

  return (
    <div className="flex-none py-8 flex flex-col gap-4">
      <Link href="/">
        <div className="w-full aspect-square relative rounded-lg overflow-hidden">
          <Image
            src={playingSong.imgSrcMd}
            alt="Playing song cover image"
            layout="fill"
          />
        </div>
      </Link>
      <div className="h-12 flex items-center">
        {/* Title left */}
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="line-clamp-1 font-bold">{playingSong.trackName}</div>
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
          <SongLikeButton song={playingSong} size={28} />
        </div>
      </div>
      <AudioControls size={38} className="" />
    </div>
  );
};

const NavItem = ({ item, i }) => {
  const router = useRouter();
  return (
    <li className="w-full relative group">
      <Link key={i} href={item.url} passHref>
        <a
          className={`w-full h-10 flex items-center px-4 rounded-lg group-hover:bg-blue-300 transition-all duration-300 ${
            router.pathname === item.url ? `bg-blue-200` : "bg-slate-100"
          }`}
        >
          {item.text}
        </a>
      </Link>
      {router.pathname === item.url && (
        <div
          className={`absolute -right-6 top-0 bottom-0 w-1.5 rounded-lg bg-blue-300 group-hover:bg-blue-400 transition-all duration-300`}
        ></div>
      )}
    </li>
  );
};

export default function SideBar() {
  return (
    <aside className="hidden lg:flex w-64 h-screen flex-col items-stretch px-6 bg-white shadow-md">
      <div className="h-16 flex items-center">
        <span className="text-xl font-bold">Music App</span>
      </div>
      <hr />
      <ul className="py-6 flex flex-col gap-2">
        {navItems.map((item, i) => (
          <NavItem key={i} item={item} i={i} />
        ))}
      </ul>
      <div className="flex-1"></div>
      <SideBarPlayer />
    </aside>
  );
}
