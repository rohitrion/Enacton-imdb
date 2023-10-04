import React, { useState, useEffect } from "react";
import imdb from "../Assets/lo.png";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { Moviedata, Name, login } from "../recoil";
import { signOut } from "firebase/auth";
import { auth } from "../Firebase/firebase";
import { ThreeDots } from "react-loader-spinner";
import Modal from "react-modal";
import {
  Dropdown,
  Imdb,
  Loginicon,
  Menubar,
  Serachicon,
  Watchlist,
  Whitedropdown,
} from "./Utils/icons";

const Navbar = () => {
  const [num, setnum] = useRecoilState(Moviedata);
  const [movies, setMovies] = useState([]);
  const [input, setInput] = useState("");
  const name = useRecoilValue(Name);
  const [log, setlogin] = useRecoilState(login);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    setShowModal(true);
  };

  function hanldeclick(id) {
    navigate(`/movie/${id}`);
    setInput("");
    setMovies([]);
  }

  const cancelLogout = () => {
    setShowModal(false);
  };
  const confirmLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Signed out successfully");
        setlogin(false);
      })
      .catch((error) => {
        console.log(error);
      });
    setShowModal(false);
    navigate("/login");
  };

  async function fetchMovies(query) {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=8ef0179a2b8e5afe1139a3e76972056b&language=en-US&query=${query}&page=1&include_adult=false`
      );
      const data = await response.json();
      setMovies(data.results);
      setLoading(false); // Hid
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false); // Hid
    }
  }

  function hanldeinput(e) {
    const inputValue = e.target.value;
    setInput(inputValue);
    setMovies([]);
  }
  useEffect(() => {
    localStorage.setItem("num", JSON.stringify(num));
  }, [num]);

  useEffect(() => {
    //debounce
    const timeoutId = setTimeout(() => {
      if (input.trim() !== "") {
        setLoading(true);
        fetchMovies(input);
      }
    }, 1500);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [input]);

  return (
    <div className="bg-[#121212] text-white  ">
      <div className="container py-3 ">
        <div className="flex items-center">
          <Link to="/">
            <div className="max-w-xl ">
              <Imdb />
            </div>
          </Link>
          <div className=" flex px-[16px]">
            <Menubar />
            <span className="pl-1">Menu </span>
          </div>

          <div className="flex mx-[8px] items-center bg-white  text-black w-[100%] min-h-[12px] rounded-md ">
            <div className="flex pr-1 pl-3   ">
              <span>All </span>
              <Dropdown />
            </div>

            <div className="py-1.5 border-0 pl-2 w-[100%] relative border-l border-l-[#1a1818]   ">
              <input
                className=" outline-transparent w-[100%] "
                value={input}
                onChange={(e) => hanldeinput(e)}
              />
            </div>

            {loading ? (
              <div className="absolute mt-2 p-2 top-[42px] w-[592px] z-10 bg-black text-white shadow-md border  border-gray-300  rounded-sm">
                <div className="text-white font-semibold p-2 ml-2">
                  {" "}
                  <ThreeDots
                    height="20"
                    width="40"
                    radius="9"
                    color="white"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                  />
                </div>
              </div>
            ) : movies.length === 0 && input ? (
              <div className="absolute mt-2 p-2 top-[42px] w-[592px] z-10 bg-black text-white shadow-md border  border-gray-300  rounded-sm">
                <div className="text-white font-semibold p-2">
                  see results for "{input}".
                </div>
              </div>
            ) : null}

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
              <Serachicon />
            </button>
          </div>

          <div className="mx-[16px] ">
            <img src={imdb} className="max-w-xl " />
          </div>

          <div className="border-[#352f2f] border mx-2  h-8  "></div>

          <div className="flex items-center justify-center gap-3  px-4">
            <div className="pl-1">
              <Watchlist />
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
              <Loginicon />
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

            <Whitedropdown />
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

            <Dropdown />
            <Modal
              isOpen={showModal}
              onRequestClose={cancelLogout}
              contentLabel="Logout Confirmation"
              className="bg-[#121212] text-white rounded-lg p-4 w-72 mx-auto mt-20"
              overlayClassName="fixed inset-0 flex items-center justify-center z-50"
            >
              <h2 className="text-2xl font-bold mb-4">Confirm Logout</h2>
              <p className="text-lg mb-6">Are you sure you want to sign out?</p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={confirmLogout}
                  className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
                >
                  OK
                </button>
                <button
                  onClick={cancelLogout}
                  className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
                >
                  Cancel
                </button>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
