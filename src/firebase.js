// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCToHvNe9lMXWV_UqfqZBBT2Ldov71s2C4",
  authDomain: "habitflow-9b65b.firebaseapp.com",
  databaseURL: "https://habitflow-9b65b-default-rtdb.firebaseio.com", // 👈 important
  projectId: "habitflow-9b65b",
  storageBucket: "habitflow-9b65b.appspot.com",
  messagingSenderId: "165934137243",
  appId: "1:165934137243:web:034fc777485b24501b6b3e",
  measurementId: "G-4MSE7W54PP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(app);

// Realtime Database
export const db = getDatabase(app);
