import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDXIZ8Y_kDN-Wf9P_h1MhWafQzC7dPpMU",
  authDomain: "blog-3cd4f.firebaseapp.com",
  projectId: "blog-3cd4f",
  storageBucket: "blog-3cd4f.appspot.com",
  messagingSenderId: "523817500243",
  appId: "1:523817500243:web:58ee0e4661e49154ef90a6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Function used to sign in with Google
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        user_id: Math.floor(Math.random() * 10),
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
    toast("Logged in successfully");
  } catch (err) {
    console.error(err);
    toast(err.message);
  }
};

// Function used to login with Email and Password (if registered)
const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    toast("Logged in successfully");
  } catch (err) {
    console.error(err);
    toast(err.message);
  }
};

// Function used to Register using email
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      user_id: Math.floor(Math.random() * 10),
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    toast("Logged in successfully");
  } catch (err) {
    console.error(err);
    toast(err.message);
  }
};

// Function used for logout 
const logout = () => {
  signOut(auth);
  toast("Logged out");
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  logout,
};