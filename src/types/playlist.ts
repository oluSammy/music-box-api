interface Playlist {
  name: string;
  genre_id: string;
  isPublic: boolean;
  owner_id?: string;
  tracks?: string[];
  likes?: string[];
}

export default Playlist;
