import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = { 
  apiKey: "AIzaSyD_Cozpk1N3VhXb3gJPumum3BWLXkaLZQ8",
  authDomain: "social-board-622ca.firebaseapp.com",
  projectId: "social-board-622ca",
  storageBucket: "social-board-622ca.appspot.com",
  messagingSenderId: "897426652872",
  appId: "1:897426652872:web:802c61992aab864dbbaffd",
};


const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const db=getFirestore(app)
