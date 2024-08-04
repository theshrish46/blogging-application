// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "blogging-application-46128.firebaseapp.com",
  projectId: "blogging-application-46128",
  storageBucket: "blogging-application-46128.appspot.com",
  messagingSenderId: "415384316377",
  appId: "1:415384316377:web:25ce6a8d6f62054174d1c8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);