import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";
import { ThreeDots } from "react-loader-spinner";
import EmailInput from "./Emailinput";
import PasswordInput from "./Passwordinput";
import { Logindesign } from "../Component/Utils/icons";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [submitDisable, setSubmitDisable] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleEmailFocus = () => {
    setError("");
  };

  const handlePasswordFocus = () => {
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

 

    if (!email || !pass) {
      setError("Please Fill All Fields");
      return;
    }

    setSubmitDisable(true);

    signInWithEmailAndPassword(auth, email, pass)
      .then((res) => {
        setSubmitDisable(false);
        navigate("/watchlist");
        console.log(res);
      })
      .catch((err) => {
        setSubmitDisable(false);
        setError("Invalid UserName or Password");
      });
  };

  return (
    <div className="flex items-center justify-center h-[600px] bg-gray-100">
      <div className="w-full max-w-md">
        <div className="text-center">
          <Logindesign />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Log in</h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{" "}
            <Link to="/signup" className="font-medium text-indigo-600">
              Register here
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <EmailInput
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={handleEmailFocus}
            />
            <br />
            <PasswordInput
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              showPassword={showPassword}
              togglePasswordVisibility={togglePasswordVisibility}
              onFocus={handlePasswordFocus}
            />
          </div>
          <div className="text-sm text-center text-[30px] text-red-600">
            {error}
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link to="/reset" className="font-medium text-indigo-600">
                Forgot password?
              </Link>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={submitDisable}
            >
              {submitDisable ? (
                <ThreeDots
                  height="20"
                  width="40"
                  radius="9"
                  color="#4fa94d"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClassName=""
                  visible={true}
                />
              ) : (
                "Log in"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
