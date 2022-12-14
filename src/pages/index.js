import React, { useState, useEffect } from "react";
import PlayBox from "../components/PlayBox";
import FavoriteBox from "../components/FavoriteBox";
import { useHeader } from "../store";

export default function Home() {
  return (
    <div className="px-8 py-8 w-full lg:h-[49rem] flex flex-col lg:flex-row items-stretch gap-8">
      <FavoriteBox />
      {/* <PlayBox /> */}
    </div>
  );
}
