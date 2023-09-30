import React, { useState, useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useRecoilState, useRecoilValue } from "recoil";
import { Moviedata } from "../recoil";
import Select from "react-select";
import { Navigate } from "react-router-dom";

const options = [
  { value: "IMDb Rating", label: "IMDb Rating" },
  { value: "Popularity", label: "Popularity" },
  { value: "No Of Ratings", label: "No Of Ratings" },
  { value: "Release Date", label: "Release Date" },
  { value: "Alphabetical", label: "Alphabetical" },
  { value: "Run Time", label: "Run Time" },
];

const Watchlist = () => {
  const All = useRecoilValue(Moviedata);
  const [data, setdata] = useRecoilState(Moviedata);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [sortedAndFilteredData, setSortedAndFilteredData] = useState([]);

  function hanldeclick(id) {
    const arr = data.filter((item) => item.id !== id);

    setdata(arr);
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    //  filter the data
    const sortAndFilterData = () => {
      let newData = [...All];
      if (selectedOption) {
        switch (selectedOption.value) {
          case "IMDb Rating":
            newData.sort((a, b) => b.vote_average - a.vote_average);
            break;
          case "Popularity":
            newData.sort((a, b) => b.popularity - a.popularity);
            break;
          case "No Of Ratings":
            newData.sort((a, b) => b.vote_count - a.vote_count);
            break;
          case "Release Date":
            newData.sort((a, b) =>
              a.release_date.localeCompare(b.release_date)
            );
            break;
          case "Alphabetical":
            newData.sort((a, b) =>
              a.original_title.localeCompare(b.original_title)
            );
            break;
          case "Run Time":
            newData.sort((a, b) => a.runtime - b.runtime);
            break;
          default:
            break;
        }
      }
      // Update
      setSortedAndFilteredData(newData);
    };

    sortAndFilterData();
  }, [selectedOption, All]);
 


  return (
    <div className="h-[600px] overflow-x-hidden overflow-y-scroll bg-white">
      <div className="container mx-auto pt-5">
        <div className="w-[700px] mx-auto pt-5">
          <div className="flex justify-between">
            <div className="text-black">
              <h1 className="text-xl">Your Watchlist</h1>
              <span className="mt-2">PRIVATE</span>
            </div>
            <div className="text-black">
              <div>
                <svg
                  className="share-button"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#727272"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"></path>
                </svg>
              </div>
              <h4>Share</h4>
            </div>
          </div>
          <div className="flex justify-between mt-6 items-center py-4 border-t-[3px] border-b-[3px]">
            <div>
              <h3>{All.length} Titles</h3>
            </div>
            <div className="flex h-[45px] justify-center items-center gap-4">
              <div>Sort BY :</div>
              <div>
                <Select
                  className=""
                  defaultValue={selectedOption}
                  onChange={setSelectedOption}
                  options={options}
                />
              </div>
            </div>
          </div>

          <div className="mt-9">
            {All.length === 0 && (
              <div id="no-list" className="py-8">
                <div className="flex justify-center"></div>
                <div className=" w-3/4 mx-auto text-center leading-8">
                  <div>Your WatchList is empty</div>
                  <div>
                    Add movies and shows to your Watchlist to keep track of what
                    you want to watch.
                  </div>
                  <div>
                    <a href="#">Browse Popular TV Shows</a>
                  </div>
                  <div>
                    <a href="#">Browse Popular Movies</a>
                  </div>
                </div>
              </div>
            )}

            {loading ? (
              <div>
                <SkeletonTheme baseColor="#202020" highlightColor="#fff">
                  <p>
                    <Skeleton height={300} width={150} duration={2} />
                  </p>
                </SkeletonTheme>
              </div>
            ) : (
              <div>
                {sortedAndFilteredData.map((movie, index) => (
                  <div
                    key={index}
                    className="flex items-center mb-4 bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg"
                  >
                    <div className="flex-shrink-0 mr-4">
                      <img
                        src={`https://image.tmdb.org/t/p/original${
                          movie ? movie.poster_path : ""
                        }`}
                        alt={movie ? movie.original_title : ""}
                        className="w-20 h-auto"
                      />
                    </div>
                    <div className="text-black">
                      <div className="flex justify-between">
                        <h1 className="text-lg font-semibold">
                          {movie ? movie.original_title : ""}
                        </h1>

                        <span
                          className=" cursor-pointer "
                          onClick={() => hanldeclick(movie.id)}
                        >
                          ❌
                        </span>
                      </div>
                      <span className="text-yellow-500">
                        ⭐ {movie ? movie.vote_average : ""}
                      </span>

                      <p className="text-gray-600 mt-2">
                        {movie ? movie.overview : ""}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watchlist;
