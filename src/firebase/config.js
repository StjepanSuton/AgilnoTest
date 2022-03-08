import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAb0n8j8j2tD8-c6Wv1vESblJlnkSlH3HI",
  authDomain: "agilno.firebaseapp.com",
  projectId: "agilno",
  storageBucket: "agilno.appspot.com",
  messagingSenderId: "1092295169236",
  appId: "1:1092295169236:web:7a33f745e340279fc85741",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore();
export const colRef = collection(db, "posts");
export const userRef = collection(db, "users");
export const storage = getStorage(initializeApp(firebaseConfig));
