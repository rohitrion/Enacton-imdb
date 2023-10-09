import React, { useRef } from "react";
import Card from "./Card";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Customhook from "./Utils/Customhook";
import Loading from "./Utils/Loading";
import { NextButton } from "./Utils/Buttons";
import { useRecoilState } from "recoil";
import { globaldata } from "../recoil";
import { useEffect } from "react";

const Movielist = () => {
  const sliderRef = useRef(null);
  const [all, setall] = useRecoilState(globaldata);
  const {
    data: movies,
    loading,
  } = Customhook(
    "https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US",
    all
  );

  const slideToPrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const slideToNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    autoplay: false,
    autoplaySpeed: 1000,
  };

  useEffect(() => {
    console.log(movies, "movies");
    if (movies) {
      setall(movies);
    }
  }, [movies]);

  return (
    <div className="py-[20px] bg-black">
      <div className="container">
        <div>
          <h1 className="text-3xl pb-2 text-yellow-400 font-bold">
            Fan Favourites
          </h1>
          <h2 className="text-2xl pb-1 text-white font-bold">Upcoming</h2>
          <h3 className="text-gray-500 pb-4">Movies for you</h3>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div>
            <NextButton onClick={slideToPrev}  name={"prev"} />,
            <br/> <br/>
            <Slider {...settings} ref={sliderRef}>
              {all?.results?.map((item) => (
                <div key={item.id} className="flex gap-[20px] overflow-hidden">
                  <Card movie={item} />
                </div>
              ))}
            </Slider>
            <br/>
            <NextButton onClick={slideToNext}  name={"next"} />,
          </div>
        )}
      </div>
    </div>
  );
};

export default Movielist;
