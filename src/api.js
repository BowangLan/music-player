const ALBUM_QUERY_TEMPLATE =
  "https://itunes.apple.com/search?limit=125&term={searchTerm}&entity=album&attribute=allArtistTerm";

export const search_itunes = (term, options) => {
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

  return fetch(url).then((response) => {
    return response.json();
  }).catch(err => err);
};

export const getSpotifyLoginURL = () => {
  const client_id = "ea880b1b5cf443a3b8ab487aeb98fe1a";
  const scope = "streaming,user-read-private,user-read-email,user-read-playback-state";
  const redirect_uri = "http://localhost:3000/callback";

  const params = {
    client_id: client_id,
    response_type: "token",
    redirect_uri: redirect_uri,
    scope: scope,
    show_dialog: true
    // state: state
  };

  let url = 'https://accounts.spotify.com/authorize?'
  Object.keys(params).forEach((k, i) => {
    let s = i === 0 ? '' : '&'
    s += k + '=' + params[k]
    url += s
  })
  
  return url;
};

export const spotify_get_album = (id) => {

}