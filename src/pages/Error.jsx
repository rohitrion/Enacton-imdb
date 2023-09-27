import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-2xl text-gray-600 mb-8">Page Not Found</p>
        <Link
          to="/"
          className="bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 rounded-full text-lg"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default Error;
