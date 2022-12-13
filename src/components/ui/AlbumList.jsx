import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import ArtistText from "./ArtistText";

const coverVariants = {
  hidden: {
    opacity: 0,
    x: -10,
  },
  show: (i) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: 0.05 * i,
    },
  }),
  hover: {
    scale: 1.05,
  },
};

export default function AlbumList({ data }) {
  return (
    <div className="pb-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-8 gap-y-8">
      {data.map((item, i) => (
        <motion.div
          className="cursor-pointer group"
          custom={i}
          variants={coverVariants}
          initial="hidden"
          animate="show"
          whileHover="hover"
          key={`${i} ${item.collectionId}}`}
        >
          <Link href={`/album/${item.collectionId}`} >
            <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-slate-200 shadow-md group-hover:shadow-lg">
              <Image
                src={item.imgSrcMd}
                alt={item.collectionName}
                layout="fill"
              />
              <div className="absolute inset-0 bg-slate-200 -z-10 animate-pulse"></div>
            </div>
          </Link>
          <Link href={`/album/${item.collectionId}`} >
            <div className="truncate text-md pt-2">
              {item.collectionName}
            </div>
          </Link>
          <div className="flex items-center gap-4">
            <ArtistText data={item} />
            {/* <span className="truncate text-sm text-slate-500">
              {item.trackCount} Tracks
            </span> */}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
