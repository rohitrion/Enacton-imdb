

import React from "react";

// NextButton component
export const NextButton = ({ onClick }) => {
  return (
    <button
      className="next-button text-white bg-blue-500 hover:bg-blue-600 rounded-md px-2 py-1 cursor-pointer "
      onClick={onClick}
    >
      Next
    </button>
  );
};

// PreviousButton component
export const PreviousButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="prev-button text-white bg-blue-500 hover:bg-blue-600 rounded-md px-2 py-1 mb-4 cursor-pointer"
  >
    Previous
  </button>
);
