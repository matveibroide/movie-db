import { useState } from "react";
import MovieDbService from "../../services/movieDbService";
import "./searchbar.css";

const Searchbar = ({ setMovies, setIsLoading, setActiveQuery }) => {
  const movieService = new MovieDbService();

  function debounce(cb, delay) {
    let timeout;

    return (e) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        cb(e.target.value);
      }, delay);
    };
  }

  const onChange = (query) => {
    //sent data to the App
    setActiveQuery(query)
    setIsLoading(true);
    movieService.getMovie(query).then((res) => {
      setMovies(res);
      setIsLoading(false);
    });
  };

  const updateInputValue = debounce(onChange, 500);

  return (
    <input
      className="searchbar"
      onChange={updateInputValue}
      placeholder="Type to search..."
      type="text"
    />
  );
};

export default Searchbar;
