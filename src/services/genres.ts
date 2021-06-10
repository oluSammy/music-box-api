import axios, { AxiosResponse, AxiosTransformer } from "axios";

// fetch genres from deezer using axios call
export const fetchGenres = async (): Promise<AxiosResponse<any>> => {
  const url = process.env.GENRE_URL as string;
  const response = await axios.get(url);
  return response;
};

// fetch a single genre from deezer api using axios
export const fetchOne = async (id: number): Promise<AxiosResponse<any>> => {
  const url = process.env.GENRE_URL as string;
  try {
    const response = await axios.get(`${url}/${id}`);
    return response;
  } catch (error) {
    throw new Error(error.data.error.message);
  }
};

// fetch user query from deezer api
export const fetchAllQuery = async (
  search: string
): Promise<AxiosTransformer[]> => {
  const albumUrl = process.env.SEARCH_ALBUM_URL;
  const playlistUrl = process.env.SEARCH_PLAYLIST_URL;
  const artistUrl = process.env.SEARCH_ARTIST_URL;
  try {
    const responseAlbum = await axios.get(`${albumUrl}${search}`);
    const responsePlaylist = await axios.get(`${playlistUrl}${search}`);
    const responseArtist = await axios.get(`${artistUrl}${search}`);
    const responseResult = Promise.all([
      responseAlbum.data,
      responsePlaylist.data,
      responseArtist.data,
    ]);
    return responseResult;
  } catch (error) {
    throw new Error(error.response);
  }
};
