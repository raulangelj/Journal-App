// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjDFUL9UNSvYyKzHA7BChzCcVVOMyC9BM",
  authDomain: "journal-app-curso-46e61.firebaseapp.com",
  projectId: "journal-app-curso-46e61",
  storageBucket: "journal-app-curso-46e61.appspot.com",
  messagingSenderId: "742570713645",
  appId: "1:742570713645:web:2edecda59b73769ac58ea4",
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
