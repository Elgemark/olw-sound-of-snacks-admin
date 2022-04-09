import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";

import {
  query as fbQuery,
  collection as fbCollection,
  doc as fbDoc,
  getDocs as fbGetDocs,
  setDoc as fbSetDoc,
  addDoc as fbAddDoc,
  deleteDoc as fbDeleteDoc,
} from "firebase/firestore";

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
  _app = firebase.initializeApp(firebaseConfig);
  _analytics = getAnalytics(_app);
  _db = getFirestore(_app);

  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: "/songs",
    // We will display Google and Facebook as auth providers.
    signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
  };

  return { app: _app, analytics: _analytics, db: _db, uiConfig };
};

export const getDocs = async ({ collection, query }) => {
  const _query = fbQuery(fbCollection(_db, collection), ...query);
  const querySnapshot = await fbGetDocs(query);
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const setDoc = async ({ collection, path, data }) => {
  return await fbSetDoc(fbDoc(_db, collection, path), data);
};

export const addDoc = async ({ collection, data }) => {
  return await fbAddDoc(fbCollection(_db, collection), data);
};

export const deleteDoc = async ({ collection, path }) => {
  return await fbDeleteDoc(fbDoc(_db, collection, path));
};
