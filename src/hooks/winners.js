import { useState, useEffect } from "react";
import {
  collection,
  query,
  startAfter,
  limit as fbLimit,
  setDoc as fbSetDoc,
  doc as fbDoc,
  getDocs,
  where,
} from "firebase/firestore";
import { getDb } from "../firebase";
import _ from "lodash";

export const useGetWinners = ({ week }) => {
  const [docs, setDocs] = useState([]);
  const [winners, setWinners] = useState([]);

  const fetch = async ({ week }) => {
    const _query = query(collection(getDb(), "winners"), where("week", "==", week));
    const documentSnapshots = await getDocs(_query);
    const uniqueDocs = _.uniqBy(_.flatten([docs, documentSnapshots.docs]), (doc) => doc.id);
    setDocs(uniqueDocs);
    setWinners(uniqueDocs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  useEffect(() => {
    if (week) {
      fetch({ week });
    }
  }, [week]);
  return {
    winners,
    refetch: () => fetch({ week }),
  };
};
