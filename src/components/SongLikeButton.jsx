import React, { useEffect, useState } from "react";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import { useFSongs } from '../context/favorite';

export default function LikeButton({ song, size }) {
  const { songInFavorite, addSongToFavorite, removeSongFromFavorite } = useFSongs();
  const isF = songInFavorite(song.id);
  return (
    <>
      {isF ? (
        <HiHeart size={size} onClick={() => removeSongFromFavorite(song.id)} />
      ) : (
        <HiOutlineHeart size={size} onClick={() => addSongToFavorite(song)} />
      )}
    </>
  );
}
