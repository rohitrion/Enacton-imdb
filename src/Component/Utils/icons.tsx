import React from "react";

export const PlusIcon = () => {
  return (
    <>
      <svg
      className="ipc-watchlist-ribbon__bg"
        width="39px"
        height="53px"
        fill="#DCB116"
        viewBox="0 0 24 34"
        xmlns="http://www.w3.org/2000/svg"
        role="presentation"
      >
        <polygon
        className="ipc-watchlist-ribbon__bg-ribbon"
          fill="#DCB116"
          points="24 0 0 0 0 32 12.2436611 26.2926049 24 31.7728343"
        ></polygon>
        <polygon
        className="ipc-watchlist-ribbon__bg-hover"
          points="24 0 0 0 0 32 12.2436611 26.2926049 24 31.7728343"
        ></polygon>
        <polygon
        className="ipc-watchlist-ribbon__bg-shadow"
          points="24 31.7728343 24 33.7728343 12.2436611 28.2926049 0 34 0 32 12.2436611 26.2926049"
        ></polygon>
      </svg>
    </>
  );
};


export  const Rel=()=>{
  return (
    <>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" className="w-6 h-6 undefined"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path></svg>
    </>
  )
}