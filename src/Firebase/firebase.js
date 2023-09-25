import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyBu3Fx0LqeGIbCUpt2uLWI6JBMJY3os-MA",
//   authDomain: "auth-44ac1.firebaseapp.com",
//   projectId: "auth-44ac1",
//   storageBucket: "auth-44ac1.appspot.com",
//   messagingSenderId: "320889190081",
//   appId: "1:320889190081:web:17fb7b9dfb92f18397c640",
//   measurementId: "G-FQGT9PZKHJ",
// };

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

export { app, auth };
