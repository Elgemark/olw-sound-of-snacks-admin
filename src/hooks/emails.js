import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";

export const useGetEmail = (id) => {
  const [email, setEmal] = useState();

  useEffect(() => {
    if (id) {
      const docRef = doc(db, "songs", id);
      getDoc(docRef).then((res) => {
        debugger;
        setEmal(res.data());
      });
    }
  }, [id]);

  return email;
};
