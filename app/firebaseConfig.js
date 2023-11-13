// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAs3IM0VjU31ouu3xRFm9_EOGsRp5f6XmQ",
  authDomain: "student-dash-3841e.firebaseapp.com",
  projectId: "student-dash-3841e",
  databaseURL: "https://student-dash-3841e-default-rtdb.firebaseio.com/",
  storageBucket: "student-dash-3841e.appspot.com",
  messagingSenderId: "1025734364982",
  appId: "1:1025734364982:web:490d243f4ce54eb697ed97"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
export {database}