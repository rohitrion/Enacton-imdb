import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import addimg from "../Assets/add.png";
import Customhook from "../Component/Utils/Customhook";
import { login, Moviedata } from "../recoil";
import { auth } from "../Firebase/firebase";

const Singlemovie = () => {
  const { id } = useParams();
  const [cart, setCart] = useRecoilState(Moviedata);
  const [toggle, settoggle] = useState(true);
  const log = useRecoilValue(login);
  const navigate = useNavigate();

  const { data, loading } = Customhook(
    `https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
  );


  const user = auth.currentUser;
  function handleAdd() {
    if (!log) {
      navigate("/login");
    } else {
      const userUID = user.uid; 

      const allUsersWatchlist = JSON.parse(localStorage.getItem("watchlist")) || {};
      const userWatchlist = allUsersWatchlist[userUID] || [];

      const itemExists = userWatchlist.some((item) => item.id === data.id);

      if (!itemExists) {
  
        const updatedWatchlist = [...userWatchlist, data];
        allUsersWatchlist[userUID] = updatedWatchlist;
        setCart(updatedWatchlist);
        settoggle(false);


        localStorage.setItem("watchlist", JSON.stringify(allUsersWatchlist));
      } else {
        const updatedWatchlist = userWatchlist.filter((item) => item.id !== data.id);
        allUsersWatchlist[userUID] = updatedWatchlist;
        setCart(updatedWatchlist);
        settoggle(true);

        localStorage.setItem("watchlist", JSON.stringify(allUsersWatchlist));
      }
    }
  }
 


  useEffect(() => {
    if(log){
      if (cart.some((el) => el.id == id)) {
        settoggle(false);
      }
    }
  
  }, []);

  return (
    <div className="container mx-auto p-4 relative">
      {loading ? (
        <SkeletonTheme baseColor="#202020" highlightColor="#fff">
          <Skeleton height={400} width={370} duration={2} />
        </SkeletonTheme>
      ) : (
        <div className="flex flex-col md:flex-row  bg-gray-600 shadow-lg text-white rounded-lg overflow-hidden">
          <div className="md:w-1/3">
            <img
              src={`https://image.tmdb.org/t/p/original${
                data && data.poster_path
              }`}
              alt={data.original_title}
            />
          </div>
          <div className="md:w-2/3 p-4 flex flex-col gap-5">
            <h2 className="text-2xl font-semibold">{data.original_title}</h2>
            <span>⭐{data.vote_average}</span>
            <p className="text-white text-sm mb-4">{data.tagline}</p>
            <p className="text-white"> {data.overview + "..."}</p>
            <h2 className="font-semibold pt-2">
              Release-date : {data.release_date}
            </h2>
            <div className="flex gap-3 pt-3">
              {data && data.genres && data.genres.length > 0 ? (
                data.genres.map((item) => (
                  <h5
                    key={item.id}
                    className="text-2xl font-semibold mr-2 rounded border border-[blue] p-2"
                  >
                    {item.name}
                  </h5>
                ))
              ) : (
                <p>No genres available.</p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="absolute top-5 left-6" onClick={handleAdd}>
        {toggle ? (
          <img className="cursor-pointer " src={addimg} alt="logo" />
        ) : (
          <span className="text-[30px] cursor-pointer ">✅</span>
        )}
      </div>
    </div>
  );
};

export default Singlemovie;
