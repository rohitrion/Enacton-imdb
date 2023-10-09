import React from "react";


export const NextButton = ({ onClick ,name}) => {
  return (
    <button
      className="next-button text-white bg-blue-500 hover:bg-blue-600 rounded-md px-2 py-1 cursor-pointer custom-next-button "
      onClick={onClick}
    >
       {name}
    </button>
  );
};

