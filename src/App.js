

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./Component/Navbar";
import Singlemovie from "./pages/Singlemovie";
import Watchlist from "./pages/Watchlist";
import Login from "./Firebase/Login";
import Signup from "./Firebase/Signup";
import { auth } from "./Firebase/firebase";
import { useRecoilState, useRecoilValue } from "recoil";
import { Moviedata, Name, login } from "./recoil";
import Error from "./pages/Error";
import { Layout } from "./Layout";
import { Footer, routes } from "./Config/routes";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [log, setLog] = useRecoilState(login);
  const [name, setname] = useRecoilState(Name);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check local storage for the login status on app load
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    console.log("Local Storage - isLoggedIn:", isLoggedIn);

    if (isLoggedIn === "true") {
      setLog(true);
      // Fetch and set user data here if needed
    } else {
      setLog(false);
    }

    auth.onAuthStateChanged((user) => {
      if (user) {
        setname(user.displayName);
        setLog(true);
        // Store the login status in local storage
        localStorage.setItem("isLoggedIn", "true");
        console.log("User logged in. Local Storage - isLoggedIn: true");
      } else {
        setname("");
        // Clear the login status in local storage
        localStorage.removeItem("isLoggedIn");
        console.log("User logged out. Local Storage - isLoggedIn: removed");
      }
      setIsLoading(false);
    });
  }, []);

  return (
    <BrowserRouter>
      {isLoading ? (
        // Display a loading indicator while checking authentication
        <div>Loading...</div>
      ) : (
        <Routes>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              element={
                route.isLogin ? (
                  log ? (
                    route.element
                  ) : (
                    <Navigate to="/login" replace />
                  )
                ) : (
                  route.element
                )
              }
            />
          ))}
          {/* Render the Watchlist route even if there's no data */}
          {/* <Route
            path="/watchlist"
            element={<Watchlist />}
          /> */}
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;