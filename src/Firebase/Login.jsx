import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: '',
    pass: '',
  });

  const [error, setError] = useState(''); // for error state
  const [submitDisable, setSubmitDisable] = useState(false); // for disable button for API

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!values.email || !values.pass) {
      setError('Please Fill All Fields');
      return;
    }
    setError('');
    setSubmitDisable(true);
    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then((res) => {
        setSubmitDisable(false);
        navigate('/watchlist');
        console.log(res);
      })
      .catch((err) => {
        setSubmitDisable(false);
        setError(err.message);
      });
  };

  return (
    <div className="flex items-center justify-center h-[600px] bg-gray-100">
      <div className="w-full max-w-md">
        <div className="text-center">
          <svg
            class="w-16 h-16 mx-auto text-indigo-600"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M12 14l9-5-9-5-9 5 9 5z"></path>
            <path
              d="M12 14l9-5-9-5-9 5 9 5z"
              strokeLinejoin="round"
            ></path>
          </svg>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Log in
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <Link to="/signup" className="font-medium text-indigo-600">
              Register here
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={(e)=>handleSubmit(e)}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, pass: e.target.value }))
                }
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600">{error}</p>
            </div>
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
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
