import React from "react";
import Link from "next/link";
import { usePlayingSong } from "../context/playingSong";
import { PlayButton } from "../components/AudioControls";
import { milliseconds_to_ms } from "../util";
import { LayoutGroup, motion } from "framer-motion";

export default function SongList({ songs, config }) {
  const { classes } = config;
  const { playingSong, setPlayingSong, togglePlaying, isPlaying, setQueue } =
    usePlayingSong();

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
    <div className=" ">
      {/* <div className="flex-1 py-3 bg-slate-300 flex">
        <span className="inline-block w-16 flex-none text-center">#</span>
        <span className="inline-block w-4/6">Song Name</span>
        <span className="inline-block w-48 flex-none mr-2">Author</span>
        <span className="inline-block flex-none">Price</span>
      </div> */}
      <div className="flex flex-col overflow-x-scroll">
        {songs.map((s, i) => (
          <motion.div
            initial={{
              x: "-5%",
              opacity: 0,
            }}
            animate={{
              x: 0,
              opacity: 1,
            }}
            transition={{
              ease: "easeIn",
              delay: 0.05 * i,
            }}
            key={i}
            className={classes.row(playingSong && playingSong.id === s.id)}
          >
              <div className={classes.numberContainer}>
                {playingSong && playingSong.id === s.id ? (
                  <PlayButton size={32} />
                ) : (
                  <span className={classes.number}>{i + 1}</span>
                )}
              </div>
              <div className={classes.imgContainer}>
                <img src={s.imgSrcSm} alt={s.imgAlt} className={classes.img} />
              </div>
              <div
                className={classes.nameContainer}
                onClick={() => handleSongNameClick(s)}
              >
                <motion.span className={classes.name} whileHover={{
                  x: 4,
                  ease: 'easeOut'
                }}>{s.trackName}</motion.span>
                <span className={classes.author}>{s.artistName}</span>
              </div>
              {s.collectionId && (
                <Link href={`/album/${s.collectionId}`}>
                  <div className={classes.albumContainer}>
                    <span className={classes.album}>{s.collectionName}</span>
                  </div>
                </Link>
              )}
              <div className={classes.durationContainer}>
                <div className={classes.duration}>
                  {milliseconds_to_ms(s.trackTimeMillis)}
                </div>
                {/* <span className="hidden lg:block md:w-12 flex-none text-slate-500 ">${s.trackPrice}</span> */}
              </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
