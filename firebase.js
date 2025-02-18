// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCXcMnk3Yfd_ncHuW7wKmH-kSPHqo3PK2A",
  authDomain: "my-portfolio-multiplayer.firebaseapp.com",
  databaseURL: "https://my-portfolio-multiplayer-default-rtdb.firebaseio.com",
  projectId: "my-portfolio-multiplayer",
  storageBucket: "my-portfolio-multiplayer.firebasestorage.app",
  messagingSenderId: "355855716440",
  appId: "1:355855716440:web:9534f4d576070615d23a2d",
  measurementId: "G-7RMH2FYCTZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
console.log("Firebase initialized!");


export {database};