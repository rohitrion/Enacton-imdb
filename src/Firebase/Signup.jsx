import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "./firebase";
import { Link, useNavigate } from "react-router-dom";
import PasswordInput from "./Passwordinput";
import { ThreeDots } from "react-loader-spinner";

import EmailInput from "./Emailinput";
import Nameinput from "./Nameinput";

function Signup() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
  });

  const handleEmailFocus = () => {
    setFirebaseError("");
  };

  const handlePasswordFocus = () => {
    setFirebaseError("");
  };

  const handlenameFocus = () => {
    setFirebaseError("");
  };

  const [errors, setErrors] = useState({
    lengthError: false,
    uppercaseError: false,
    lowercaseError: false,
    numberError: false,
    specialCharError: false,
  });

  const [submitDisabled, setSubmitDisabled] = useState(false); // for disable button for API
  const [showPassword, setShowPassword] = useState(false);
  const [firebaseError, setFirebaseError] = useState(null);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const isPasswordValid = (password) => {
    const lengthRegex = /.{6,}/;
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;

    const lengthValid = lengthRegex.test(password);
    const uppercaseValid = uppercaseRegex.test(password);
    const lowercaseValid = lowercaseRegex.test(password);
    const numberValid = numberRegex.test(password);
    const specialCharValid = specialCharRegex.test(password);

    setErrors({
      lengthError: !lengthValid,
      uppercaseError: !uppercaseValid,
      lowercaseError: !lowercaseValid,
      numberError: !numberValid,
      specialCharError: !specialCharValid,
    });

    return (
      lengthValid &&
      uppercaseValid &&
      lowercaseValid &&
      numberValid &&
      specialCharValid
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.name || !values.email || !isPasswordValid(values.pass)) {
      return;
    }
    setSubmitDisabled(true);
    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then((res) => {
        const user = res.user;
        updateProfile(user, {
          displayName: values.name,
        });
        console.log(res);
        navigate("/watchlist");
      })
      .catch((err) => {
        setSubmitDisabled(false);
        console.error(err);
        setFirebaseError("invalid Email ");
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
            <form onSubmit={handleSubmit}>
              <div>
                <Nameinput
                  value={values.name}
                  onFocus={handlenameFocus}
                  onChange={(e) => {
                    setValues({ ...values, name: e.target.value });
                  }}
                />
              </div>
              <br />
              <div>
                <EmailInput
                  value={values.email}
                  onFocus={handleEmailFocus}
                  onChange={(e) => {
                    setValues({ ...values, email: e.target.value });
                  }}
                />
              </div>
              <br />
              <div className="w-full rounded-md mb-5">
                <PasswordInput
                  value={values.pass}
                  onChange={(e) => {
                    setValues({ ...values, pass: e.target.value });
                  }}
                  showPassword={showPassword}
                  togglePasswordVisibility={togglePasswordVisibility}
                  onFocus={handlePasswordFocus}
                />
              </div>

              {errors.lengthError && (
                <div className="text-red-600">
                  Password must be at least 8 characters long.
                </div>
              )}
              {errors.uppercaseError && (
                <div className="text-red-600">
                  Password must contain at least one uppercase letter.
                </div>
              )}
              {errors.lowercaseError && (
                <div className="text-red-600">
                  Password must contain at least one lowercase letter.
                </div>
              )}
              {errors.numberError && (
                <div className="text-red-600">
                  Password must contain at least one number.
                </div>
              )}
              {errors.specialCharError && (
                <div className="text-red-600">
                  Password must contain at least one special character.
                </div>
              )}
              <div className="text-center mb-2 ">
                {" "}
                {firebaseError && (
                  <div className="text-red-600">{firebaseError}</div>
                )}
              </div>

              <button
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-md w-full text-center relative"
                disabled={submitDisabled}
                type="submit"
              >
                {submitDisabled ? (
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <ThreeDots
                      height={20}
                      width={40}
                      radius={9}
                      color="black"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{}}
                      wrapperClassName=""
                      visible={true}
                    />
                  </div>
                ) : (
                  "Register Here"
                )}
              </button>
              <div className="mt-3 text-center">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <Link to="/login">
                    <span className="text-blue-500 font-semibold">Sign In</span>
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
