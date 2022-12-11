import React, { useRef, useState, useEffect } from "react";
import useSWR from "swr";

const contruct_url_query = (query) => {
  let output = "";
  let init = true;
  Object.keys(query).forEach((key) => {
    if (!query[key]) return;
    if (!init) output += "&";
    output += key + "=" + query[key];
    init = false;
  });
  return output;
};

export default function useSearch(flag, term, options = {}) {
  const { data, error } = useSWR(
    flag !== 0 && "https://itunes.apple.com/search?" +
      contruct_url_query({ term: term && term.replace(" ", "+"), ...options })
  );
  const [shouldAddData, setShouldAddData] = useState(false);

  const [allData, setAllData] = useState([]);

  useEffect(() => {
    allData
  }, [])

  const loadNext = () => {
    setShouldAddData(true);
  }

  
  return { data, error, loadNext };
}
