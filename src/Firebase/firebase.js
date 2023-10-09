import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore  } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAhMpP2a1LLERL-OGPElce9KIYrJD5GD3k",
  authDomain: "imdb-clone-project-cdf59.firebaseapp.com",
  projectId: "imdb-clone-project-cdf59",
  storageBucket: "imdb-clone-project-cdf59.appspot.com",
  messagingSenderId: "405368514402",
  appId: "1:405368514402:web:efaa8c5023715cfa65ee3b",
  measurementId: "G-P7EXSYQZ1E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

export { app, auth, db  };

