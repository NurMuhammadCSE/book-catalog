/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCw-CGtU4m8cXKcJ5em_LNLHcd879PTnuE",
  authDomain: "book-f83bc.firebaseapp.com",
  projectId: "book-f83bc",
  storageBucket: "book-f83bc.appspot.com",
  messagingSenderId: "675338450168",
  appId: "1:675338450168:web:56b3b84bd141b2bce4f70d"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
