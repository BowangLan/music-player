import React, { useState, useEffect } from "react";
import HomeBox from "./Box";
import { FALBUMS_KEY, FARTIST_KEY, FSONGS_KEY } from "../constants";
import SongList from "./ui/SongList";
import ArtistList from "./ArtistList";
import AlbumList from "./ui/AlbumList";
import { useFSongs, useFAlbums, useFArtists } from "../store";
import Spinner from "./icons/Spinner";
import { process_api_data } from "../util";
import { useQuery } from "react-query";
import { lookup_multiple } from "../api";

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
    albumContainer: "flex-none w-1/4",
    durationContainer:
      "hidden md:block flex-none justify-self-end flex mr-6 gap-8",
    duration: "w-16 text-right",
  },
};

const BoxTitle = ({ tab, changeTab, tabs }) => {
  return (
    <div className="flex-none flex md:items-center flex-col items-right md:flex-row pb-4">
      <span className="inline-block flex-1 text-xl font-bold">
        My Favorites
      </span>
      <div className="flex">
        <div className="flex">
          {tabs.map((t, i) => (
            <div
              key={i}
              className={
                "w-24 text-center py-2 " +
                (tab === i ? "bg-slate-200" : "") +
                " cursor-pointer"
              }
              onClick={() => changeTab(i)}
            >
              {t.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const BoxContent = ({ data, dataType }) => {
  if (!data || data.length === 0) return <></>;
  switch (dataType) {
    case 0:
      return <SongList songs={data} />;
    case 1:
      return <AlbumList data={data} />
    case 2:
      return <ArtistList data={data} />
  }
};

const tabHookList = [useFSongs, useFAlbums, useFArtists];

export default function FavoriteBox() {
  const tabs = [
    { label: "Songs", dataLabel: FSONGS_KEY },
    { label: "Albums", dataLabel: FALBUMS_KEY },
    { label: "Artists", dataLabel: FARTIST_KEY },
  ];

  const [tab, setTab] = useState(0);
  // const [idList, setIdList] = useState([]);
  const [init, setInit] = useState(true);
  const { list: idList, load } = tabHookList[tab]();
  // const { data, error } = useLookUp(idList);
  const { data, error } = useQuery(idList, () => lookup_multiple(idList), {
    enabled: idList.length > 0,
  })

  useEffect(() => {
    if (init) {
      setInit(false);
      load();
      // getTabData(tab);
    }
  }, [init]);

  const changeTab = (i) => {
    setTab(i);
    // getTabData(i);
  };

  useEffect(() => {
    console.log("useEffect id list", idList);
  }, [idList]);

  console.log("render f box data", data);

  return (
    <HomeBox className="w-full py-6 flex flex-col self-stretch ">
      <BoxTitle tabs={tabs} tab={tab} changeTab={changeTab} />
      {idList.length === 0 ? (
        <div></div>
      ) : error ? (
        <div>{error}</div>
      ) : data ? (
        <BoxContent data={process_api_data(data.results)} dataType={tab} />
      ) : (
        <div className="w-full h-1/3 flex justify-center items-center">
          <Spinner size={38} />
        </div>
      )}
    </HomeBox>
  );
}
