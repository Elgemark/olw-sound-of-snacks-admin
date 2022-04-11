import { useState, useEffect } from "react";
import { collection, query, getDocs, where } from "firebase/firestore";
import { getDb } from "../firebase";
import _ from "lodash";

export const useGetWinners = ({ week }) => {
  const [winners, setWinners] = useState([]);

  const fetch = async ({ week }) => {
    const _query = query(collection(getDb(), "winners"), where("week", "==", week));
    const documentSnapshots = await getDocs(_query);
    setWinners(documentSnapshots.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
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
