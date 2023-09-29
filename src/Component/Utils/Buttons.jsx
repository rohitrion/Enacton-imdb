import React from "react";

// NextButton component
export const NextButton = ({ onClick }) => {
  return (
    <button
      className="slick-arrow  slick-next text-white bg-fuchsia-100 "
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
    className="slick-arrow slick-prev text-white bg-fuchsia-100 "
  >
    Previous
  </button>
);
