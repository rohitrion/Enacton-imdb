import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Card from "./Card";

const Carousal = () => {
  const [movies, setMovies] = useState([]);

  async function fetchMovies() {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US"
      );
      const data = await response.json();
      setMovies(data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      <div className="bg-[#000000] text-white py-8 " id="carousal-section">
        <div className="container  grid grid-cols-2  gap-[40px]">
          <div className="w-full h-full">
            <Carousel
              showThumbs={false}
              autoPlay={true}
              transitionTime={0}
              infiniteLoop={true}
              showStatus={false}
              showIndicators={false}
            >
              {movies.map((item) => {
                return (
                  <div key={item.id} className="relative">
                    <div className=" key={item.id}  ">
                      <div className="h-[550px]  w-[100%] ">
                        <img
                          className="h-full  w-[100%] block object-cover "
                          src={`https://image.tmdb.org/t/p/original/${
                            item && item.backdrop_path
                          }`}
                          alt="ikh"
                        />
                      </div>
                      <div className="flex absolute left-[20px] top-[250px]">
                        <Card movie={item} />
                        <div className="mt-[120px]">
                          <span>Rating:⭐{item ? item.vote_average : ""}</span>
                          <p>
                            {item ? item.overview.slice(0, 118) + "..." : ""}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </Carousel>
          </div> 
          <div className="">
            <div class="font-bold text-[25px] my-4 text-[yellow]">Up Next</div>

            {movies.slice(9, 12).map((item) => {
              return (
                <div className="flex gap-[20px]">
                  <div className="h-[150px]  w-[100px]  ">
                    <img
                      className="h-[100px] object-cover"
                      src={`https://image.tmdb.org/t/p/original/${
                        item && item.backdrop_path
                      }`}
                      alt="ikh"
                    />
                  </div>

                  <div className="h-[30px]">
                    <div>
                      <svg
                        width="32"
                        height="32"
                        xmlns="http://www.w3.org/2000/svg"
                        class="group-hover:cursor-pointer group-hover:text-yellow-default ipc-icon ipc-icon--play-circle-outline-large-inline ipc-icon--inline sc-d4cb23a2-14 ejjmJF editorial-play-icon'
      id='iconContext-play-circle-outline-large-inline"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        role="presentation"
                      >
                        <path d="M10.803 15.932l4.688-3.513a.498.498 0 0 0 0-.803l-4.688-3.514a.502.502 0 0 0-.803.402v7.026c0 .412.472.653.803.402z"></path>
                        <path d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm0-1c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11z"></path>
                      </svg>
                    </div>
                    <div>
                      <h1>{item.original_title}</h1>

                      <p>{item.overview.slice(0, 90)}+""</p>
                    </div>
                  </div>
                </div>
              );
            })}
            <h1 className="font-bold text-[20px] my-4 text-[yellow]">
              Browse Trailers ▶️
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default Carousal;
