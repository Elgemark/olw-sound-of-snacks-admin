import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { collection as fbCollection, doc as fbDoc, getDocs as fbGetDocs, setDoc as fbSetDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCScSxCcCgAf7mV-XlsRiJdjGqp2MMTYRc",
  authDomain: "olw-sounds-of-snacks.firebaseapp.com",
  projectId: "olw-sounds-of-snacks",
  storageBucket: "olw-sounds-of-snacks.appspot.com",
  messagingSenderId: "1083260717770",
  appId: "1:1083260717770:web:9540a73babc48b1c848233",
  measurementId: "G-EVJFTG1H9G",
};

let _app, _analytics, _db;

export const init = () => {
  _app = initializeApp(firebaseConfig);
  _analytics = getAnalytics(_app);
  _db = getFirestore(_app);
  return { app: _app, analytics: _analytics, db: _db };
};

export const getDocs = async ({ collection }) => {
  const querySnapshot = await fbGetDocs(fbCollection(_db, collection));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const setDoc = async ({ collection, path, data }) => {
  return await fbSetDoc(fbDoc(_db, collection, path), data);
};
