import React, { useState, useEffect } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { useRecoilState, useRecoilValue } from "recoil";
import { Moviedata } from "../recoil";
import Select from "react-select";
import { auth } from "../Firebase/firebase";
import { Sharebutton } from "../Component/Utils/icons";

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
  const [sortedAndFilteredData, setSortedAndFilteredData] = useState([]);

  const initialOption = localStorage.getItem("selectedOption");

  const [selectedOption, setSelectedOption] = useState(
    initialOption ? JSON.parse(initialOption) : null
  );

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);

    localStorage.setItem("selectedOption", JSON.stringify(selectedOption));
  };

  const user = auth.currentUser;
  const userUid = user.uid;

  const watchlistKey = "watchlist";

  function hanldeclick(id) {
    const updatedWatchlist = data.filter((item) => item.id !== id);
    setdata(updatedWatchlist);

    const allUsersWatchlist =
      JSON.parse(localStorage.getItem(watchlistKey)) || {};

    allUsersWatchlist[userUid] = updatedWatchlist;

    localStorage.setItem(watchlistKey, JSON.stringify(allUsersWatchlist));
  }

  useEffect(() => {
    const allUsersWatchlist =
      JSON.parse(localStorage.getItem(watchlistKey)) || {};

    const userWatchlist = allUsersWatchlist[userUid] || [];

    setdata(userWatchlist);

    setLoading(false);
  }, [watchlistKey, userUid, setdata]);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const sortParam = queryParams.get("sort");

    const selectedOption = options.find((option) => option.value === sortParam);

    if (selectedOption) {
      setSelectedOption(selectedOption);
    }
  }, []);

  useEffect(() => {
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

      const queryParams = new URLSearchParams();
      if (selectedOption) {
        queryParams.set("sort", selectedOption.value);
      }
      window.history.replaceState(null, null, `?${queryParams.toString()}`);

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
                <Sharebutton />
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
                  defaultValue={All.length === 0 ? null : selectedOption}

                  onChange={handleSelectChange}
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
                      {movie && movie.poster_path && (
                        <img
                          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                          alt={movie.original_title}
                          className="w-20 h-auto"
                        />
                      )}
                    </div>
                    <div className="text-black">
                      <div className="flex justify-between">
                        <h1 className="text-lg font-semibold">
                          {movie && movie.original_title}
                        </h1>

                        <span
                          className="cursor-pointer"
                          onClick={() => hanldeclick(movie?.id)}
                        >
                          ❌
                        </span>
                      </div>
                      <span className="text-yellow-500">
                        ⭐ {movie && movie.vote_average}
                      </span>

                      <p className="text-gray-600 mt-2">
                        {movie && movie.overview}
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
