// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-36c0f.firebaseapp.com",
  projectId: "mern-estate-36c0f",
  storageBucket: "mern-estate-36c0f.firebasestorage.app",
  messagingSenderId: "518461382078",
  appId: "1:518461382078:web:857e32d936a1a15125adef",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


