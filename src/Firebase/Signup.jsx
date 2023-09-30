import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "./firebase";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
  });

  const [error, setError] = useState(""); // for error state
  const [submitDisabled, setSubmitDisabled] = useState(false); // for disable button for API

  const handleSubmit = () => {
    if (!values.name || !values.email || !values.pass) {
      setError("Please Fill All Fields");
      return
    }
    setError("");
    setSubmitDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then((res) => {
        setSubmitDisabled(false);
        const user = res.user;
        updateProfile(user, {
          displayName: values.name,
        });
        console.log(res);
        navigate("/watchlist");
      })
      .catch((err) => {
        setSubmitDisabled(false);
        setError(err.message);
      });
  };

  return (
    <>
      <div>
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-500">
          <div className="bg-white shadow-md rounded-lg max-w-md p-6 w-full space-y-4">
            <h2 className="text-2xl font-semibold text-center">
              Create an account
            </h2>
            <div>
              <input
                className="border border-gray-300 p-2 w-full rounded-md"
                placeholder="Your Name"
                type="text"
                required
                value={values.name}
                onChange={(e) => {
                  setValues({ ...values, name: e.target.value });
                }}
              />
            </div>
            <div>
              <input
                className="border border-gray-300 p-2 w-full rounded-md"
                placeholder="Your Email"
                type="email"
                required
                value={values.email}
                onChange={(e) => {
                  setValues({ ...values, email: e.target.value });
                }}
              />
            </div>
            <div>
              <input
                className="border border-gray-300 p-2 w-full rounded-md"
                placeholder="Password"
                type="password"
                value={values.pass}
                onChange={(e) => {
                  setValues({ ...values, pass: e.target.value });
                }}
              />
            </div>
            <div className="text-red-600 text-center">{error}</div>
            <button
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-md w-full"
              disabled={submitDisabled}
              onClick={handleSubmit}
            >
              Register
            </button>
            <div className="mt-3 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link to="/login">
                  <span className="text-blue-500 font-semibold">Sign In</span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
