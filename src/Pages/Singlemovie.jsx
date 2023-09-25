import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import addimg from "../Assets/add.png";
import { login, Moviedata } from "../recoil";
const Singlemovie = () => {
  const { id } = useParams();

  const [data, setData] = useState([]);

  async function fetchData() {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
      );
      const dataa = await response.json();

      setData(dataa);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const [cart, setCart] = useRecoilState(Moviedata);

  const [toggle, settoggle] = useState(true);

  const log = useRecoilValue(login);

  const navigate = useNavigate();

  function handleAdd() {
    if (!log) {
      navigate("/login");
    } else {
      const itemExists = cart.some((item) => item.id === data.id);

      if (!itemExists) {
        // If the item is not in the cart, add it
        setCart([...cart, data]);
        settoggle(false);
      } else {
        const updatedCart = cart.filter((item) => item.id !== data.id);
        setCart(updatedCart);
        settoggle(true);
      }
    }
  }

  useEffect(() => {
    if (cart.some((el) => el.id == id)) {
      settoggle(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div className="container mx-auto p-4 relative">
      <div className="flex flex-col md:flex-row  bg-gray-600 shadow-lg text-white rounded-lg overflow-hidden">
        <div className="md:w-1/3">
          <img
            src={`https://image.tmdb.org/t/p/original${
              data ? data.poster_path : ""
            }`}
            alt={data ? data.original_title : ""}
          />
        </div>
        <div className="md:w-2/3 p-4 flex flex-col gap-5">
          <h2 className="text-2xl font-semibold">
            {data ? data.original_title : ""}
          </h2>
          <span>⭐{data ? data.vote_average : ""}</span>
          <p className="text-white text-sm mb-4">{data.tagline}</p>
          <p className="text-white"> {data ? data.overview + "..." : ""}</p>
          <h2 className="font-semibold pt-2">
            Release-date : {data.release_date}
          </h2>
          <div className="flex gap-3 pt-3">
            {data?.genres?.map((item) => (
              <h5
                key={item.id}
                className="text-2xl font-semibold mr-2 rounded border border-[blue] p-2"
              >
                {item.name}
              </h5>
            ))}
          </div>
        </div>
      </div>

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
