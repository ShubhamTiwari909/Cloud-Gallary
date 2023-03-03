// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import {getFirestore} from "firebase/firestore"
import { getAuth} from "firebase/auth"
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGfRqpC40MqnvrA4tCPPpT2R-4XRr6gIo",
  authDomain: "wdrive-f9ee0.firebaseapp.com",
  projectId: "wdrive-f9ee0",
  storageBucket: "wdrive-f9ee0.appspot.com",
  messagingSenderId: "277286483457",
  appId: "1:277286483457:web:3473a08c457d1f5128f200"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const database = getFirestore(app)
const storage = getStorage(app);
export default storage;