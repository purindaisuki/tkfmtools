import firebase from "firebase/app";
import "firebase/storage";
import "firebase/firestore";
import { nanoid } from "nanoid";

const firebaseConfig = {
  apiKey: "AIzaSyBJg2fnt42fxBIeuNWDfn7xvECq_stsmo8",
  authDomain: "tkfmtools.firebaseapp.com",
  databaseURL: "https://tkfmtools-default-rtdb.firebaseio.com",
  projectId: "tkfmtools",
  storageBucket: "tkfmtools.appspot.com",
  messagingSenderId: "664931200398",
  appId: "1:664931200398:web:469c5cd9b7174a68d008df",
  measurementId: "G-PP7G8BKLDP",
};

firebase.initializeApp(firebaseConfig);

export const teamsRef = firebase.firestore().collection("teams");
export const Timestamp = firebase.firestore.Timestamp;

const storageRef = firebase.storage().ref();

export const getShortLink = async (url) => {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  const body = {
    longDynamicLink: `https://tkfmtools.page.link/?link=${url}`,
    suffix: {
      option: "SHORT",
    },
  };

  const response = await fetch(
    `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${firebaseConfig.apiKey}`,
    {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    }
  );

  const { shortLink } = await response.json();
  return shortLink;
};

export const uploadLineup = async (lineup) => {
  const file = new File([JSON.stringify(lineup)], "lineup", {
    type: "application/json",
  });
  const fileName = nanoid(6);
  const snapshot = await storageRef.child(`lineups/${fileName}.json`).put(file);

  return fileName;
};

export const downloadLineup = async (fileName) => {
  const url = await storageRef
    .child(`lineups/${fileName}.json`)
    .getDownloadURL();
  const json = await fetch(url).then((res) => res.json());

  return json;
};
