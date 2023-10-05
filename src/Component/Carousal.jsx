import React, { useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Card from "./Card";
import { Videoicon } from "./Utils/icons";
import Customhook from "./Utils/Customhook";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { NextButton, PreviousButton } from "./Utils/Buttons";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { globaldata } from "../recoil";

const Carousal = () => {
  const [all, setall] = useRecoilState(globaldata);

  const { data: movies, loading } = Customhook(
    "https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US",
    all
  );
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideToPrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };


  const slideToNext = () => {
    if (currentSlide < all?.results?.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };


  useEffect(() => {
    if (movies) {
      setall(movies);
    }
  }, [movies]);


  return (
    <>
      <div className="bg-[#000000] text-white py-8 " id="carousal-section">
        <div className="container  grid grid-cols-2  gap-[40px]">
          <div className="w-full h-full">
            <PreviousButton onClick={slideToPrev} />
            <Carousel
              selectedItem={currentSlide}
              onChange={(index) => setCurrentSlide(index)}
              showThumbs={false}
              autoPlay={true}
              transitionTime={0}
              infiniteLoop={true}
              showStatus={false}
              showIndicators={false}
            >
              {loading ? (
                <SkeletonTheme baseColor="#202020" highlightColor="#fff">
                  <Skeleton height={400} width={370} duration={2} />
                </SkeletonTheme>
              ) : (
                all?.results?.map((item) => (
                  <div key={item.id} className="relative">
                    <div className=" key={item.id}  ">
                      <div className="h-[550px]  w-[100%] ">
                        <img
                          className="h-full  w-[100%] block object-cover"
                          src={`https://image.tmdb.org/t/p/original/${
                            item && item.backdrop_path
                          }`}
                          alt="ikh"
                        />
                      </div>
                      <div className="flex absolute left-[20px] top-[250px]">
                        <Card movie={item} />
                        <div className="mt-[120px]">
                          <span>Rating:⭐{item?.vote_average}</span>
                          <p>{item?.overview.slice(0, 118) + "..."}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </Carousel>
            <NextButton onClick={slideToNext} />
          </div>
          <div className="">
            <div className="font-bold text-[25px] my-4 text-[yellow]">
              Up Next
            </div>

            {loading ? (
              <SkeletonTheme baseColor="#202020" highlightColor="#fff">
                <Skeleton height={300} width={170} duration={2} />
              </SkeletonTheme>
            ) : (
              all?.results?.slice(9, 12).map((item) => (
                <div className="flex gap-[20px]" key={item.id}>
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
                    <div className="mb-1">
                      <Videoicon />
                    </div>
                    <div>
                      <h1>{item.original_title}</h1>
                      <p>{item.overview.slice(0, 90)}+""</p>
                    </div>
                  </div>
                </div>
              ))
            )}
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
