import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { auth } from "./Firebase/firebase";
import { useRecoilState } from "recoil";
import { Name, login } from "./recoil";
import { routes } from "./Config/routes";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [log, setLog] = useRecoilState(login);
  const [name, setname] = useRecoilState(Name);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    console.log("Local Storage - isLoggedIn:", isLoggedIn);

    if (isLoggedIn === "true") {
      setLog(true);
    } else {
      setLog(false);
    }

    auth.onAuthStateChanged((user) => {
      if (user) {
        setname(user.displayName);
        setLog(true);

        localStorage.setItem("isLoggedIn", "true");
        console.log("User logged in. Local Storage - isLoggedIn: true");
      } else {
        setname("");

        localStorage.removeItem("isLoggedIn");
        console.log("User logged out. Local Storage - isLoggedIn: removed");
      }
      setIsLoading(false);
    });
  }, []);

  return (
    <BrowserRouter>
      {isLoading ? (
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
        </Routes>
      )}
    </BrowserRouter>
  );
}

export default App;
