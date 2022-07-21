import React from "react";
import useLocalList from "../hooks/useLocalList";

const FSongContext = React.createContext();
const FAlbumContext = React.createContext();

export const useFSongs = () => {
  return React.useContext(FSongContext);
};

export const useFAlbums = () => {
  return React.useContext(FAlbumContext);
};

export const FSongContextWrapper = ({ children }) => {
  const FAVORITE_SONGS_KEY = "fsongs";
  const {
    list: fSongs,
    getById: songInFavorite,
    addOne: addSongToFavorite,
    removeById: removeSongFromFavorite,
  } = useLocalList(FAVORITE_SONGS_KEY);

  return (
    <FSongContext.Provider
      value={{
        fSongs,
        addSongToFavorite,
        songInFavorite,
        removeSongFromFavorite,
      }}
    >
      {children}
    </FSongContext.Provider>
  );
};



export const FAlbumContextWrapper = ({ children }) => {
  const FAVORITE_ALBUMS_KEY = "falbums";
  const {
    list: fAlbums,
    getById: albumInFavorite,
    addOne: addAlbumToFavorite,
    removeById: removeAlbumFromFavorite,
  } = useLocalList(FAVORITE_ALBUMS_KEY);

  return (
    <FAlbumContext.Provider
      value={{
        fAlbums,
        addAlbumToFavorite,
        albumInFavorite,
        removeAlbumFromFavorite,
      }}
    >
      {children}
    </FAlbumContext.Provider>
  );
};


export const FArtistContextWrapper = ({ children }) => {
  const FAVORITE_ALBUMS_KEY = "falbums";
  const {
    list: fAlbums,
    getById: albumInFavorite,
    addOne: addAlbumToFavorite,
    removeById: removeAlbumFromFavorite,
  } = useLocalList(FAVORITE_ALBUMS_KEY);

  return (
    <FAlbumContext.Provider
      value={{
        fAlbums,
        addAlbumToFavorite,
        albumInFavorite,
        removeAlbumFromFavorite,
      }}
    >
      {children}
    </FAlbumContext.Provider>
  );
};
