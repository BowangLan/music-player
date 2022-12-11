import { useEffect } from "react";
import create from "zustand";
import { persist } from "zustand/middleware";
import { FARTIST_KEY, FSONGS_KEY, FALBUMS_KEY } from "../constants";

const listStoreFactory = (key) => {
  return create((set, get) => ({
    list: [],

    data: [],

    setList: (n) => {
      set({ list: n });
      window.localStorage.setItem(key, JSON.stringify(n));
    },

    setData: (d) => {
      set({ data: d });
    },

    getById: (id) => {
      console.log(get().list);
      const t = get().list.filter((e1) => e1 === id);
      return t[0];
    },

    addOne: (e) => {
      console.log("add to list", e);
      if (get().getById(e)) {
        console.log("already added", get().getById(e));
      }
      get().setList([e, ...get().list]);
      console.log("added");
    },

    removeById: (id) => {
      console.log("remove by id", id);
      if (!get().getById(id)) return;
      get().setList(get().list.filter((e) => e !== id));
    },

    load: () => {
      const t = localStorage.getItem(key);
      set({ list: JSON.parse(t) || []});
    }
  }));
};

export const useFSongs = listStoreFactory(FSONGS_KEY);

export const useFAlbums = listStoreFactory(FALBUMS_KEY);

export const useFArtists = listStoreFactory(FARTIST_KEY);

export const useHeader = create((set, get) => ({
  title: "JT Music Player",
  background: "bg-white",
  headerAbsolute: "",

  setTitle: (t) => {
    set({ title: t });
  },

  setBackground: (bg) => {
    console.log('zustand set background', bg);
    set({ background: bg });
  },

  setBackgroundToDefault: () => {
    set({ background: "bg-white" });
  },

  setHeaderAbsolute: (isAbs) => {
    set({ headerAbsolute: isAbs ? 'absolute top-0 left-0' : '' });
  }
}))