// Import the functions you need from the SDKs you need
import { initializeApp,getApps,getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtGTkv5ILN_i4cLfvjCAUePQWkhaTOsX8",
  authDomain: "photogram-fc3eb.firebaseapp.com",
  projectId: "photogram-fc3eb",
  storageBucket: "photogram-fc3eb.appspot.com",
  messagingSenderId: "417356971553",
  appId: "1:417356971553:web:d5c08d143aa7f30d74ad60"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export {app, db,storage};