

import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, Moviedata } from "../recoil";
import { useRecoilState, useRecoilValue } from "recoil";
import { PlusIcon } from "./Utils/icons";
import { auth } from "../Firebase/firebase";
import "react-loading-skeleton/dist/skeleton.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
const Card = ({ movie }) => {
  const [cart, setCart] = useRecoilState(Moviedata);
  const [toggle, settoggle] = useState(true);
  const log = useRecoilValue(login);
  const navigate = useNavigate();
  const user = auth.currentUser;

  function hanldeadd() {
    if (!log) {
      navigate("/login");
    } else {
      const userUID = user.uid;

      const storedWatchlist = localStorage.getItem(`watchlist_${userUID}`);
      const userWatchlist = storedWatchlist ? JSON.parse(storedWatchlist) : [];

      const itemExists = userWatchlist.some((item) => item.id === movie.id);

      if (!itemExists) {
        // If the item is not in the watchlist, add it
        const updatedWatchlist = [...userWatchlist, movie];
        setCart(updatedWatchlist);
        settoggle(false);

        localStorage.setItem(
          `watchlist_${userUID}`,
          JSON.stringify(updatedWatchlist)
        );
      } else {
        const updatedWatchlist = userWatchlist.filter(
          (item) => item.id !== movie.id
        );
        setCart(updatedWatchlist);
        settoggle(true);

        localStorage.setItem(
          `watchlist_${userUID}`,
          JSON.stringify(updatedWatchlist)
        );
      }
    }
  }

  useEffect(() => {
    if (log) {
      if (cart.some((el) => el.id == movie.id)) {
        settoggle(false);
      }
    }
  }, []);


  return (
    <div className="relative">
      <Link to={`/movie/${movie.id}`}>
    
          <div className="flex flex-col gap-4 justify-center w-56 rounded-sm">
            <div className="">
              <img
                src={`https://image.tmdb.org/t/p/original${movie && movie.poster_path 
                  }`}
                alt={movie && movie.original_title }
              />
            </div>

            <div className="text-white">
              <h1>{movie && movie.original_title}</h1>
              <span>⭐{movie && movie.vote_average}</span>
              <p> {movie && movie.overview.slice(0, 118) + "..." }</p>
            </div>
          </div>

      </Link>

      <div
        className="absolute top-2 left-2  cursor-pointer  "
        onClick={hanldeadd}
      >
        {toggle ? <PlusIcon /> : <span className="text-[30px]">✅</span>}
      </div>
    </div>
  );
};

export default Card;
