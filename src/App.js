import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";
import Singlemovie from "./Pages/Singlemovie";
import Watchlist from "./Pages/Watchlist";
import Login from "./Firebase/Login";
import Signup from "./Firebase/Signup";
import { useEffect, useState } from "react";
import { auth } from "./Firebase/firebase";
import { useRecoilState } from "recoil";
import { login } from "./recoil";
import Error from "./Pages/Error";

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
        <Navbar name={username} log={log} />
        <Routes>
          <Route path="/" exact  element={<Home />} />

          <Route path="/movie/:id" element={<Singlemovie />} />

          <Route path="/watchlist" element={log ? <Watchlist /> : <Login />} />

          <Route path="/login" element={<Login />} />

          <Route path="/signup" element={<Signup />} />
   
          <Route  path="/*"  element={<Error/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
