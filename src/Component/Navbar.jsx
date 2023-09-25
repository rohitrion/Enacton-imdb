import React, { useState, useEffect } from "react";
import imdb from "../Assets/lo.png";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Moviedata } from "../recoil";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/firebase";

const Navbar = ({ log, name }) => {
  const [num, setnum] = useRecoilState(Moviedata);
  const [movies, setMovies] = useState([]);
  const [input, setInput] = useState("");

  const navigate = useNavigate();

  function hanldeclick(id) {
    navigate(`/movie/${id}`);
    setInput("");
    setMovies([]);
  }

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Signed out successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  async function fetchMovies(query) {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=8ef0179a2b8e5afe1139a3e76972056b&language=en-US&query=${query}&page=1&include_adult=false`
      );
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  function hanldeinput(e) {
    const inputValue = e.target.value;
    setInput(inputValue);
  }

  useEffect(() => {
    localStorage.setItem("num", JSON.stringify(num));
  }, [num]);

  useEffect(() => {
    if (input) {
      fetchMovies(input);
    } else {
      setMovies([]);
    }
  }, [input]);

  return (
    <div className="bg-[#121212] text-white  ">
      <div className="container py-3 ">
        <div className="flex items-center">
          <Link to="/">
            <div className="max-w-xl ">
              <svg
                id="home_img"
                class="ipc-logo"
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="32"
                viewBox="0 0 64 32"
                version="1.1"
              >
                <g fill="#F5C518">
                  <rect x="0" y="0" width="100%" height="100%" rx="4"></rect>
                </g>
                <g
                  transform="translate(8.000000, 7.000000)"
                  fill="#000000"
                  fill-rule="nonzero"
                >
                  <polygon points="0 18 5 18 5 0 0 0"></polygon>
                  <path d="M15.6725178,0 L14.5534833,8.40846934 L13.8582008,3.83502426 C13.65661,2.37009263 13.4632474,1.09175121 13.278113,0 L7,0 L7,18 L11.2416347,18 L11.2580911,6.11380679 L13.0436094,18 L16.0633571,18 L17.7583653,5.8517865 L17.7707076,18 L22,18 L22,0 L15.6725178,0 Z"></path>
                  <path d="M24,18 L24,0 L31.8045586,0 C33.5693522,0 35,1.41994415 35,3.17660424 L35,14.8233958 C35,16.5777858 33.5716617,18 31.8045586,18 L24,18 Z M29.8322479,3.2395236 C29.6339219,3.13233348 29.2545158,3.08072342 28.7026524,3.08072342 L28.7026524,14.8914865 C29.4312846,14.8914865 29.8796736,14.7604764 30.0478195,14.4865461 C30.2159654,14.2165858 30.3021941,13.486105 30.3021941,12.2871637 L30.3021941,5.3078959 C30.3021941,4.49404499 30.272014,3.97397442 30.2159654,3.74371416 C30.1599168,3.5134539 30.0348852,3.34671372 29.8322479,3.2395236 Z"></path>
                  <path d="M44.4299079,4.50685823 L44.749518,4.50685823 C46.5447098,4.50685823 48,5.91267586 48,7.64486762 L48,14.8619906 C48,16.5950653 46.5451816,18 44.749518,18 L44.4299079,18 C43.3314617,18 42.3602746,17.4736618 41.7718697,16.6682739 L41.4838962,17.7687785 L37,17.7687785 L37,0 L41.7843263,0 L41.7843263,5.78053556 C42.4024982,5.01015739 43.3551514,4.50685823 44.4299079,4.50685823 Z M43.4055679,13.2842155 L43.4055679,9.01907814 C43.4055679,8.31433946 43.3603268,7.85185468 43.2660746,7.63896485 C43.1718224,7.42607505 42.7955881,7.2893916 42.5316822,7.2893916 C42.267776,7.2893916 41.8607934,7.40047379 41.7816216,7.58767002 L41.7816216,9.01907814 L41.7816216,13.4207851 L41.7816216,14.8074788 C41.8721037,15.0130276 42.2602358,15.1274059 42.5316822,15.1274059 C42.8031285,15.1274059 43.1982131,15.0166981 43.281155,14.8074788 C43.3640968,14.5982595 43.4055679,14.0880581 43.4055679,13.2842155 Z"></path>
                </g>
              </svg>
            </div>
          </Link>
          <div className=" flex px-[16px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              class="ipc-icon ipc-icon--menu ipc-responsive-button__icon"
              viewBox="0 0 24 24"
              fill="currentColor"
              role="presentation"
            >
              <path fill="none" d="M0 0h24v24H0V0z"></path>
              <path d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z"></path>
            </svg>
            <span className="pl-1">Menu </span>
          </div>

          <div className="flex mx-[8px] items-center bg-white  text-black w-[100%] min-h-[12px] rounded-md ">
            <div className="flex pr-1 pl-3   ">
              <span>All </span>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                class="ipc-icon ipc-icon--arrow-drop-down ipc-btn__icon ipc-btn__icon--post navbar__flyout__text-button-post-icon"
                viewBox="0 0 24 24"
                fill="currentColor"
                role="presentation"
              >
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M8.71 11.71l2.59 2.59c.39.39 1.02.39 1.41 0l2.59-2.59c.63-.63.18-1.71-.71-1.71H9.41c-.89 0-1.33 1.08-.7 1.71z"></path>
              </svg>
            </div>

            <div className="py-1.5 border-0 pl-2 w-[100%] relative border-l border-l-[#1a1818]   ">
              <input
                className=" outline-transparent w-[100%] "
                value={input}
                onChange={(e) => hanldeinput(e)}
              />
            </div>
            {movies.length === 0 && input && (
              <div className="absolute mt-2 p-2 top-[42px] w-[592px] z-10 bg-black text-white shadow-md border  border-gray-300  rounded-sm">
                <div className="text-white font-semibold p-2">
                  No movies found for "{input}".
                </div>
              </div>
            )}

            {movies.length > 0 && (
              <div className="absolute mt-2 p-2 top-[42px] w-[592px] z-10 bg-black text-white shadow-md border  border-gray-300  rounded-sm">
                <ul className="">
                  {movies.slice(1, 7).map((movie) => (
                    <div
                      onClick={() => hanldeclick(movie.id)}
                      className="h-[100px]    p-3 border-[grey] border-b-2 hover:bg-slate-500 "
                    >
                      <li key={movie.id} className="mb-2 flex items-center">
                        {movie.poster_path && (
                          <img
                            src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`}
                            alt={`${movie.title} Poster`}
                            className="w-[70px] h-[70px] object-cover mr-2"
                          />
                        )}
                        <div>
                          <div className="font-semibold">{movie.title}</div>
                          <div className="text-sm text-gray-500">
                            {movie.release_date}
                          </div>
                        </div>
                      </li>
                    </div>
                  ))}
                </ul>
              </div>
            )}

            <button className=" pl-14 pr-2 text-black ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                class="ipc-icon ipc-icon--magnify"
                viewBox="0 0 24 24"
                fill="currentColor"
                role="presentation"
              >
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 0 0 1.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 0 0-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 0 0 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"></path>
              </svg>
            </button>
          </div>

          <div className="mx-[16px] ">
            <img src={imdb} className="max-w-xl " />
          </div>

          <div className="border-[#352f2f] border mx-2  h-8  "></div>

          <div className="flex items-center justify-center gap-3  px-4">
            <div className="pl-1">
              <svg
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                class="ipc-icon ipc-icon--watchlist ipc-btn__icon ipc-btn__icon--pre"
                viewBox="0 0 24 24"
                fill="currentColor"
                role="presentation"
              >
                <path
                  d="M17 3c1.05 0 1.918.82 1.994 1.851L19 5v16l-7-3-7 3V5c0-1.05.82-1.918 1.851-1.994L7 3h10zm-4 4h-2v3H8v2h3v3h2v-3h3v-2h-3V7z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <div>
              <Link to="/watchlist">
                <span className="text-[16px] font-medium ">
                  Watchlist
                  {log && num != 0 ? (
                    <span className=" bg-amber-300 ml-2 text-[20px] border rounded px-[4px]">
                      {num.length}
                    </span>
                  ) : (
                    ""
                  )}
                </span>
              </Link>
            </div>
          </div>

          <div className="flex  pr-4 pl-1 ">
            <div className="pr-1">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                class="ipc-icon ipc-icon--account-circle ipc-btn__icon ipc-btn__icon--pre"
                viewBox="0 0 24 24"
                fill="currentColor"
                role="presentation"
              >
                <path fill="none" d="M0 0h24v24H0V0z"></path>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2a7.2 7.2 0 01-6-3.22c.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08a7.2 7.2 0 01-6 3.22z"></path>
              </svg>
            </div>

            {log ? (
              <span>
                <b>{name}</b>
              </span>
            ) : (
              <Link to="/login">
                <button>Signin</button>
              </Link>
            )}

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              class="ipc-icon ipc-icon--arrow-drop-down ipc-btn__icon ipc-btn__icon--post navbar__flyout__text-button-post-icon"
              viewBox="0 0 24 24"
              fill="currentColor"
              role="presentation"
            >
              <path fill="none" d="M0 0h24v24H0V0z"></path>
              <path d="M8.71 11.71l2.59 2.59c.39.39 1.02.39 1.41 0l2.59-2.59c.63-.63.18-1.71-.71-1.71H9.41c-.89 0-1.33 1.08-.7 1.71z"></path>
            </svg>
          </div>

          <div className="flex  pr-4 pl-1 ">
            {log ? (
              <button className="mr-2" onClick={handleLogout}>
                Signout{" "}
              </button>
            ) : (
              ""
            )}

            <span>EN</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              class="ipc-icon ipc-icon--arrow-drop-down ipc-btn__icon ipc-btn__icon--post navbar__flyout__text-button-post-icon"
              viewBox="0 0 24 24"
              fill="currentColor"
              role="presentation"
            >
              <path fill="none" d="M0 0h24v24H0V0z"></path>
              <path d="M8.71 11.71l2.59 2.59c.39.39 1.02.39 1.41 0l2.59-2.59c.63-.63.18-1.71-.71-1.71H9.41c-.89 0-1.33 1.08-.7 1.71z"></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
