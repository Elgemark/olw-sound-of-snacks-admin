import { useState, useEffect } from "react";
import { collection, query, orderBy, startAfter, limit as fbLimit, getDocs } from "firebase/firestore";
import { getDb } from "../firebase";

const getSongs = async ({ limit, fromSong }) => {
  const defaultQuery = query(collection(getDb(), "songs"), fbLimit(limit));
  const fromQuery = fromSong && query(collection(getDb(), "songs"), fbLimit(limit), startAfter(fromSong));
  const documentSnapshots = await getDocs(fromQuery || defaultQuery);
  const lastSong = documentSnapshots.docs[documentSnapshots.docs.length - 1];
  const songs = documentSnapshots.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return { songs, lastSong };
};

export const useGetSongs = ({ fromSong, limit = 20 }) => {
  const [songs, setSongs] = useState([]);
  const [lastSong, setLastSong] = useState();

  useEffect(() => {
    getSongs({ limit, fromSong: lastSong }).then((res) => {
      setSongs(res.songs);
      setLastSong(res.lastSong);
    });
  }, [limit, fromSong]);

  return { songs, lastSong };
};
