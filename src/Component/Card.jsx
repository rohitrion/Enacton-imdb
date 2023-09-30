import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link, useNavigate } from "react-router-dom";
import { login, Moviedata } from "../recoil";
import { useRecoilState, useRecoilValue } from "recoil";
import { PlusIcon } from "./Utils/icons";

const Card = ({ movie }) => {
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useRecoilState(Moviedata);
  const [toggle, settoggle] = useState(true);
  const log = useRecoilValue(login);
  const navigate = useNavigate();

  function hanldeadd() {
    if (!log) {
      navigate("/login");
    } else {
      const itemExists = cart.some((item) => item.id === movie.id);

      if (!itemExists) {
        // If the item is not in the cart, add it
        setCart([...cart, movie]);
        settoggle(false);
      } else {
        const updatedCart = cart.filter((item) => item.id !== movie.id);
        setCart(updatedCart);
        settoggle(true);
      }
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 800);
  }, []);

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
        {loading ? (
          <div>
            <SkeletonTheme baseColor="#202020" highlightColor="#fff">
              <p>
                <Skeleton height={300} width={150} duration={2} />
              </p>
            </SkeletonTheme>
          </div>
        ) : (
          <div className="flex flex-col gap-4 justify-center w-56 rounded-sm">
            <div className="">
              <img
                src={`https://image.tmdb.org/t/p/original${movie ? movie.poster_path : ""
                  }`}
                alt={movie ? movie.original_title : ""}
              />
            </div>

            <div className="text-white">
              <h1>{movie ? movie.original_title : ""}</h1>
              <span>⭐{movie ? movie.vote_average : ""}</span>
              <p> {movie ? movie.overview.slice(0, 118) + "..." : ""}</p>
            </div>
          </div>
        )}
      </Link>

      <div
        className="absolute top-2 left-2  cursor-pointer  "
        onClick={hanldeadd}
      >
        {toggle ? (

          <PlusIcon />
        ) : (
          <span className="text-[30px]">✅</span>
        )}
      </div>
    </div>
  );
};

export default Card;
