import "./App.css";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./Component/Navbar";
import Singlemovie from "./pages/Singlemovie";
import Watchlist from "./pages/Watchlist";
import Login from "./Firebase/Login";
import Signup from "./Firebase/Signup";
import { useEffect, useState } from "react";
import { auth } from "./Firebase/firebase";
import { useRecoilState } from "recoil";
import { login } from "./recoil";
import Error from "./pages/Error";
import { Layout } from "./Layout";
import { Footer, routes } from "./Config/routes";

function App() {
  const [username, setUsername] = useState("");

  const [log, setLog] = useRecoilState(login);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUsername(user.displayName);
        setLog(true);
      } else {
        setUsername("");
        setLog(false);
      }
    });
  }, []);

  return (
    <>

      <BrowserRouter>
       
        <Routes>
        {routes.map((route, index) => {
        if (
          (log) 
        ) {
          return <Route key={index} path={route.path} element={route.element} />;
        }
        return null;
      })}
        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
