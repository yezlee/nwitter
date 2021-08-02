// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGIN_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;
export const authService = firebase.auth();
// const auth = fbase.auth(); // App.js에서 이렇게 해주거나 아님 fbase.js안에서 authService 변수를 만들어서 export해주거나
// 여기다가 이렇게 하는 이유는, auth서비스를 많이 호출할 예정이어서.
// 이렇게 하면 다른곳에서 authService를 이용할때마다 firebase.auth()를 호출해야하는데 여기서 호출해고 그걸 export해버리면 다른곳에서 import만 하면 되니까

export const dbService = firebase.firestore();
export const storageService = firebase.storage();
