import axios, { AxiosResponse } from "axios";

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
