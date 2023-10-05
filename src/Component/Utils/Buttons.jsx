import React from "react";


export const NextButton = ({ onClick }) => {
  return (
    <button
      className="next-button text-white bg-blue-500 hover:bg-blue-600 rounded-md px-2 py-1 cursor-pointer custom-next-button "
      onClick={onClick}
    >
      Next
    </button>
  );
};


export const PreviousButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="prev-button text-white bg-blue-500 hover:bg-blue-600 rounded-md px-2 py-1 mb-4 cursor-pointer custom-previous-button"
  >
    Previous
  </button>
);
