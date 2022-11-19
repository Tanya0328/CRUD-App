// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATF0M9innnRtWqCQtj2zGUJ4SOxz-tDu0",
  authDomain: "crud-app-107de.firebaseapp.com",
  databaseURL: "https://crud-app-107de-default-rtdb.firebaseio.com",
  projectId: "crud-app-107de",
  storageBucket: "crud-app-107de.appspot.com",
  messagingSenderId: "536399805547",
  appId: "1:536399805547:web:b91116982cf36cfe97452e",
  measurementId: "G-DF5188WTHC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);