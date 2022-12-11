import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AlbumLikeButton } from "../../LikeButton";
import ArtistText from "../../ui/ArtistText";

const extract_colors_from_img = (img) => {
  if (img == null) return;
  console.log("extract color from img", img);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, 1, 1);
  const i = ctx.getImageData(0, 0, 1, 1).data;
  const c1 = `rgba(${i[0]},${i[1]},${i[2]},${i[3]})`;
  return c1;
};

const PlayAlbumButton = ({ album, playAlbum }) => {
  return (
    <button
      className="w-full py-2 sm:py-3 text-center bg-blue-900/80 hover:bg-blue-800/70 rounded-xl text-white cursor-pointer shadow-md hover:shadow-lg transition-all duration-300"
      onClick={playAlbum}
    >
      Play
    </button>
  );
};

const AlbumPageHeader = ({ album, playAlbum }) => {
  const imgSrc = album.artworkUrl100.replace("100x100", "270x270");
  const [coverColor, setCoverColor] = useState();
  useEffect(() => {
    setTimeout(() => {
      const img = document.querySelector(".cover-image");
      const imgColor = extract_colors_from_img(img);
      console.log("img color", imgColor);
      setCoverColor(imgColor);
    }, 1500);
  }, [album.artworkUrl100]);
  return (
    <div className={`w-full pt-20 pb-4 relative`}>
      <div className="px-6 sm:px-8 py-4 w-full h-full flex flex-col gap-6 bg-transparent z-10">
        <div className="w-full h-full flex gap-6">
          {/* Album image */}
          <div className="relative w-28 h-28 sm:w-44 sm:h-44 md:w-52 md:h-52 z-10">
            <Image
              src={imgSrc}
              alt="Album Cover"
              layout="fill"
              className="rounded-3xl cover-image"
            />
          </div>

          {/* Album info */}
          <div className="z-10 flex-1 self-stretch flex flex-col justify-between sm:gap-1">
            {/* Upper content */}
            <div className="sm:text-lg md:text-2xl font-medium line-clamp-2">
              {album.collectionName}
            </div>
            <div className="flex mb-1">
              <ArtistText data={album} />
            </div>
            <div className="flex">
              <span className="inline-block px-3 sm:px-4 py-1 text-xs bg-blue-400/40 hover:bg-blue-400/60 rounded-full transition-all duration-300 cursor-pointer">
                {album.primaryGenreName}
              </span>
            </div>

            {/* Spacer */}
            <div className="flex-1"></div>

            {/* Bottom content */}
            <div className="z-10 flex gap-6 items-center">
              <div className="hidden sm:block sm:w-36">
                <PlayAlbumButton album={album} playAlbum={playAlbum} />
              </div>
              <AlbumLikeButton album={album} size={28} />
            </div>
          </div>
        </div>
        <div className="sm:hidden w-full z-10">
          <PlayAlbumButton album={album} playAlbum={playAlbum} />
        </div>
      </div>
      <div
        className={`absolute inset-0 opacity-20`}
        // style={{ background: `linear-gradient(0deg, ${coverColor} 0%, white 100%)`}}
      >
        <div className="relative w-full h-full">
          <Image
            src={album.artworkUrl100}
            alt="Album Cover Layer"
            layout="fill"
          />
        </div>
      </div>
      <div className="absolute inset-0 backdrop-blur-2xl z-0 "></div>
    </div>
  );
};

export default AlbumPageHeader;
