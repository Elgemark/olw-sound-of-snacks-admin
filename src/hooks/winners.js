import { useState, useEffect } from "react";
import { collection, query, startAfter, limit as fbLimit, getDocs, where } from "firebase/firestore";
import { getDb } from "../firebase";
import _ from "lodash";

const getWinners = async ({ week }) => {
  const query = query(collection(getDb(), "winners"), where("week", "==", week));
  const documentSnapshots = await getDocs(query);
  return documentSnapshots;
};

export const useGetWinners = ({ week }) => {
  const [docs, setDocs] = useState([]);
  const [winners, setWinners] = useState([]);

  const createWinner = () => {};

  useEffect(() => {
    if (week) {
      getWinners.then((documentSnapshots) => {
        const uniqueDocs = _.uniqBy(_.flatten([docs, documentSnapshots.docs]), (doc) => doc.id);
        setDocs(uniqueDocs);
        setWinners(uniqueDocs.map((doc) => ({ id: doc.id, ...doc.data() })));
      });
    }
  }, [week]);
  return { winners, createWinner };
};
