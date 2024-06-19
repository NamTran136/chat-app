// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "chatapp-138ad.firebaseapp.com",
  projectId: "chatapp-138ad",
  storageBucket: "chatapp-138ad.appspot.com",
  messagingSenderId: "1088081207535",
  appId: "1:1088081207535:web:16e8f49e92ffa923bf3b1a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
