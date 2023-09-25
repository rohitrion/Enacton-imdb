import React, { useState, useEffect } from "react";
import Card from "./Card";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Toprated = () => {
  const [movies, setMovies] = useState([]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    autoplay: true,
    autoplaySpeed: 1000,
  };

  async function fetchMovies() {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US"
      );
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {}
  }

  useEffect(() => {
    console.log(movies, "top rated");
    if (movies.length == 0) {
      fetchMovies();
    }
  }, []);

  return (
    <div className="py-[20px] bg-black">
      <div className="container">
        <div>
          <h1 class="text-3xl pb-2 text-yellow-400 font-bold">
            Fan Favourites
          </h1>
          <h2 class="text-2xl pb-1 text-white font-bold">Upcoming</h2>
          <h3 className="text-gray-500 pb-4">Movies for you</h3>
        </div>
        <Slider {...settings}>
          {movies.map((item) => (
            <div key={item.id} className="flex gap-[20px] overflow-hidden">
              <Card movie={item} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Toprated;
