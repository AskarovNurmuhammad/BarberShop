// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBbpZTCxRF1uGTae0FOXCJvy6kZoH6s6o",
  authDomain: "barbershop-d8ae1.firebaseapp.com",
  projectId: "barbershop-d8ae1",
  storageBucket: "barbershop-d8ae1.firebasestorage.app",
  messagingSenderId: "661468104398",
  appId: "1:661468104398:web:a8b862361cf8bf4bc9329f",
  measurementId: "G-99T2DQYT83",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db, collection, getDocs, addDoc, updateDoc, deleteDoc, doc };
