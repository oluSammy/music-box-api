import axios from "axios";

export const fetchTrack = async (
  id: string
): Promise<Record<string, unknown>> => {
  try {
    // Fetch song from deezer api by id
    const { data } = await axios.get(`https://api.deezer.com/track/${id}`);
    if (data.error) throw new Error("Track not found");
    const {
      title,
      duration,
      album: { title: album },
    } = data;

    return { title, duration, album };
  } catch ({ message }) {
    throw new Error(message);
  }
};
