
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./Component/Navbar";
import Singlemovie from "./pages/Singlemovie";
import Watchlist from "./pages/Watchlist";
import Login from "./Firebase/Login";
import Signup from "./Firebase/Signup";
import { auth } from "./Firebase/firebase";
import { useRecoilState } from "recoil";
import { Name, login } from "./recoil";
import Error from "./pages/Error";
import { Layout } from "./Layout";
import { Footer, routes } from "./Config/routes";

function App() {
  const [log, setLog] = useRecoilState(login);
  const [name, setname] = useRecoilState(Name);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setname(user.displayName);
        setLog(true);
      } else {
        setname("");
        setLog(false);
      }
    });
  }, []);

  return (
    <>
      <BrowserRouter>
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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
