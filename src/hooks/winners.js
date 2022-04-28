import { useState, useEffect } from "react";
import { collection, doc, query, getDocs, where, updateDoc } from "firebase/firestore";

import { getDb } from "../firebase";
import _ from "lodash";

const revoke = async (ids) => {
  const promises = ids.map((id) => {
    const winnersRef = doc(getDb(), "winners", id);
    return updateDoc(winnersRef, { revoked: true });
  });
  return Promise.all(promises);
};

export const useGetWinners = ({ week }) => {
  const [winners, setWinners] = useState([]);

  const fetch = async ({ week }) => {
    const _query = query(collection(getDb(), "winners"), where("week", "==", week), where("revoked", "==", false));
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
    revoke,
  };
};
