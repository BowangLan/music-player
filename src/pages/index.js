import React, { useState, useEffect } from "react";
// import PlayBox from "../components/PlayBox";
// import HomeBox from "../components/Box";
// import FavoriteSongTable from "../components/FavoriteSongsTable";
import dynamic from "next/dynamic";


const FavoriteTable = dynamic(() => import("../components/FavoriteTable"));
const Box = dynamic(() => import("../components/Box"));
const PlayBox = dynamic(() => import("../components/PlayBox"));

const Clock = () => {
  const getTime = () => new Date().toLocaleTimeString();
  const [str, setStr] = useState(getTime());

  useEffect(() => {
    setInterval(() => {
      setStr(() => getTime());
    }, 500);
  }, []);

  return (
    <Box className={" flex justify-center items-center"}>
      <span className="text-2xl font-bold">{str}</span>
    </Box>
  );
};

export default function Home() {
  return (
    <>
      {/* <div className="py-6"></div> */}

      <div className="w-full lg:h-[49rem] flex flex-col lg:flex-row items-stretch py-8 gap-8">
        {/* <Clock /> */}
        <FavoriteTable />
        <PlayBox />
      </div>
    </>
  );
}