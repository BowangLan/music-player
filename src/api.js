const ALBUM_QUERY_TEMPLATE =
  "https://itunes.apple.com/search?limit=125&term={searchTerm}&entity=album&attribute=allArtistTerm";

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

const fetch_json = (...params) => {
  return fetch(...params).then((res) => res.json());
};

export const search_itunes = (term, { ...options }) => {
  let url = "https://itunes.apple.com/search?term=" + term;
  const allowed_option_keys = [
    "limit",
    "offset",
    "entity",
    "attribute",
    "country",
  ];

  Object.keys(options)
    .filter((k) => allowed_option_keys.includes(k))
    .forEach((k) => {
      url += "&" + k + "=" + options[k];
    });

  console.log("url: " + url);

  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .catch((err) => err);
};

// const lookup = (id, entity, limit) => {
//   return fetch_json(`https://itunes.apple.com/lookup?id=${id}&entity=${entity}`)
// }
export const lookup_multiple = (id_list) => {
  return fetch_json("https://itunes.apple.com/lookup?id=" + id_list.join(","));
};

export const get_album = (id) => {
  return fetch_json(
    `https://itunes.apple.com/lookup?id=${id}&limit=50&entity=song`
  );
};

export const get_artist = (id) => {
  return fetch_json(`https://itunes.apple.com/lookup?id=${id}`);
};

export const get_artist_songs = (id, limit = 50, entity = "music") => {
  return fetch_json(`https://itunes.apple.com/lookup?id=${id}&entity=song`);
};

export const get_artist_albums = (id, limit = 50, entity = "music") => {
  return fetch_json(`https://itunes.apple.com/lookup?id=${id}&entity=album`);
};
