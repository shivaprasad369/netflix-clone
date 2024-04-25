// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBKbzSwY44HHNGHA9rbj7U6BnY5act7eO8",
  authDomain: "react-netflix-clone-aa346.firebaseapp.com",
  projectId: "react-netflix-clone-aa346",
  storageBucket: "react-netflix-clone-aa346.appspot.com",
  messagingSenderId: "935514971499",
  appId: "1:935514971499:web:fb449dc13fe238cccbc02e",
  measurementId: "G-QNVDKN6SZL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const firebaseAuth=getAuth(app)