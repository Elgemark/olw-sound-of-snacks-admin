import { useState, useEffect } from "react";
import { collection, query, startAfter, limit as fbLimit, getDocs, where as fbWhere } from "firebase/firestore";
import { getDb } from "../firebase";
import _ from "lodash";

// HELPERS

const getSongs = async ({ limit, fromDoc }) => {
  const defaultQuery = query(collection(getDb(), "songs"), fbLimit(limit));
  const fromQuery = fromDoc && query(collection(getDb(), "songs"), fbLimit(limit), startAfter(fromDoc));
  const documentSnapshots = await getDocs(fromQuery || defaultQuery);
  return documentSnapshots;
};

const getSongsForDates = async ({ startDate, endDate }) => {
  const query = query(
    collection(getDb(), "songs"),
    fbWhere("servertime", ">=", startDate),
    fbWhere("servertime", "<=", endDate)
  );

  const documentSnapshots = await getDocs(query);
  debugger;
  return documentSnapshots;
};

// HOOKS

export const useGetSongs = ({ skip = 0, limit = 20 }) => {
  const [docs, setDocs] = useState([]);
  const [songs, setSongs] = useState([]);
  const fromDoc = docs[skip - 1];

  useEffect(() => {
    getSongs({ limit, fromDoc }).then((documentSnapshots) => {
      const uniqueDocs = _.uniqBy(_.flatten([docs, documentSnapshots.docs]), (doc) => doc.id);
      setDocs(uniqueDocs);
      setSongs(uniqueDocs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  }, [limit, skip]);

  return songs.slice(skip, skip + limit);
};

export const useGetSongsForDates = ({ fromDate, toDate }) => {
  const [docs, setDocs] = useState([]);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    getSongsForDates({ fromDate, toDate }).then((documentSnapshots) => {
      const uniqueDocs = _.uniqBy(_.flatten([docs, documentSnapshots.docs]), (doc) => doc.id);
      setDocs(uniqueDocs);
      setSongs(uniqueDocs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
  }, [fromDate, toDate]);

  return songs;
};
