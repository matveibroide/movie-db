import { useState } from "react";
import MovieDbService from "../../services/movieDbService";
import './searchbar.css'

const Searchbar = ({ setMovies,setIsLoading }) => {
  const movieService = new MovieDbService();

  function debounce(cb, delay) {
    let timeout;

    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        cb(...args);
      }, delay);
    };
  }

  const onChange = (e) => {
    setIsLoading(true)
    movieService.getMovie(e.target.value).then((res) => {
      setMovies(res)
      setIsLoading(false)
    });
    
  };

  const updateInputValue = debounce(onChange, 500);

  return (
    <input className="searchbar"
      onChange={updateInputValue}
      placeholder="Type to search..."
      type="text"
    />
  );
};

export default Searchbar;
