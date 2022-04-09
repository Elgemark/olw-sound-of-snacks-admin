import { useState, useEffect } from "react";
import { collection, query, orderBy, startAfter, limit as fbLimit, getDocs } from "firebase/firestore";
import { getDb } from "../firebase";
import _ from "lodash";

const getSongs = async ({ limit, fromDoc }) => {
  const defaultQuery = query(collection(getDb(), "songs"), fbLimit(limit));
  const fromQuery = fromDoc && query(collection(getDb(), "songs"), fbLimit(limit), startAfter(fromDoc));
  const documentSnapshots = await getDocs(fromQuery || defaultQuery);
  return documentSnapshots;
};

export const useGetSongs = ({ skip = 0, limit = 20 }) => {
  const [docs, setDocs] = useState([]);
  const [songs, setSongs] = useState([]);
  const fromDoc = docs[skip - 1];

  useEffect(() => {
    getSongs({ limit, fromDoc }).then((documentSnapshots) => {
      const uniqueDocs = _.uniqBy(_.flatten([docs, documentSnapshots.docs]), (doc) => doc.id);
      setDocs(uniqueDocs);
      setSongs(uniqueDocs.map((doc, index) => ({ id: doc.id, index: index + skip, ...doc.data() })));
    });
  }, [limit, skip]);

  return songs.slice(skip, skip + limit);
};
