// PasswordInput.js
import React from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
function PasswordInput({ value, onChange, showPassword, togglePasswordVisibility }) {
  return (
    <div className="relative">
      <input
        id="password"
        name="password"
        type={showPassword ? "text" : "password"}
        autoComplete="current-password"
        required
        className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        placeholder="your Password"
        value={value}
        onChange={onChange}
      />
      <button
        type="button"
        className="absolute inset-y-0 right-0 pr-3 flex items-center"
        onClick={togglePasswordVisibility}
      >
        {showPassword ? (
          <FiEyeOff className="h-5 w-5 text-gray-500" />
        ) : (
          <FiEye className="h-5 w-5 text-gray-500" />
        )}
      </button>
    </div>
  );
}

export default PasswordInput;
