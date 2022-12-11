import React, { useEffect, useState } from "react";
import { HiOutlineHeart, HiHeart } from "react-icons/hi";
import { useFSongs, useFAlbums, useFArtists } from "../store";

const stopPropagationWrapper = (fn) => {
  return (e) => {
    e.stopPropagation();
    fn();
  };
};

const LikeButton = ({ size, item, exists, add, remove, ...props }) => {
  return (
    <>
      {exists ? (
        <HiHeart
          size={size}
          onClick={stopPropagationWrapper(() => remove(item.id))}
          {...props}
        />
      ) : (
        <HiOutlineHeart
          size={size}
          onClick={stopPropagationWrapper(() => add(item.id))}
          {...props}
        />
      )}
    </>
  );
};

export function SongLikeButton({ song, size, ...props }) {
  const { getById, addOne, removeById } = useFSongs();
  return (
    <LikeButton
      size={size}
      item={song}
      exists={getById(song.id)}
      add={addOne}
      remove={removeById}
      {...props}
    />
  );
}

export function AlbumLikeButton({ album, size }) {
  const { getById, addOne, removeById } = useFAlbums();
  return (
    <LikeButton
      size={size}
      item={album}
      exists={getById(album.id)}
      add={addOne}
      remove={removeById}
    />
  );
}

export function ArtistLikeButton({ artist, size }) {
  const { getById, addOne, removeById } = useFArtists();
  return (
    <LikeButton
      size={size}
      item={artist}
      exists={getById(artist.id)}
      add={addOne}
      remove={removeById}
    />
  );
}
