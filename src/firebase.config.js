// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4s1Azxt0FN9ez7-88IC17lEW634U4JG4",
  authDomain: "admin-f99a4.firebaseapp.com",
  projectId: "admin-f99a4",
  storageBucket: "admin-f99a4.appspot.com",
  messagingSenderId: "746801427523",
  appId: "1:746801427523:web:7c49a528781a1fab9250f6",
  measurementId: "G-HH5XWX95ZJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);