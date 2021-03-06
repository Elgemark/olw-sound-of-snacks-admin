import { useState, useEffect } from "react";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
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

  getAuth(_app);

  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    // signInFlow: "popup",
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: "/admin",
    signInOptions: [
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        disableSignUp: {
          status: true,
        },
      },
    ],
  };

  return { app: _app, analytics: _analytics, db: _db, uiConfig };
};

export const getDocs = async ({ collection, query = [] }) => {
  const _query = fbQuery(fbCollection(_db, collection), ...query);
  const querySnapshot = await fbGetDocs(_query);
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

export const getDb = () => {
  return _db;
};

export const useGetUser = ({ skip = false } = {}) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!skip) {
      const auth = getAuth();
      onAuthStateChanged(auth, (_user) => {
        if (_user) {
          setUser(_user);
        } else {
          setUser(null);
        }
        setIsLoading(false);
      });
    }
  }, [skip]);

  return { user, isLoading };
};
