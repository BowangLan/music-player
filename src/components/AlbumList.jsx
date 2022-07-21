import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AlbumList({ data }) {
  return (
    <div className="pb-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-x-8 gap-y-8">
      {data.map((item, i) => (
        <Link href={`/album/${item.collectionId}`} key={i}>
          <motion.div className="hover:scale-105 transition-all duration-300 cursor-pointer">
            <div className="relative w-full rounded-lg overflow-hidden bg-slate-200">
              <img
                className="w-full aspect-square object-cover"
                src={item.imgSrcMd}
                alt={item.collectionName}
                title={item.collectionName}
              />
              <div className="absolute inset-0 bg-slate-200 -z-10 animate-pulse"></div>
            </div>
            <div className="truncate text-md font-semibold pt-2">
              {item.collectionName}
            </div>
            <div className="flex items-center gap-4">
              <span className="flex-1 truncate text-sm text-slate-500">
                {item.artistName}
              </span>
              <span className="truncate text-sm text-slate-500">
                {item.trackCount} Tracks
              </span>
            </div>
          </motion.div>
        </Link>
      ))}
    </div>
  );
}
