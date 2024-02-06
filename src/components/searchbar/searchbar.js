import { useState } from "react";
import MovieDbService from "../../services/movieDbService";
import "./searchbar.css";
import Alert from "antd/es/alert/Alert";
const Searchbar = ({ setMovies, setIsLoading, setActiveQuery }) => {
  const movieService = new MovieDbService();

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

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
    setActiveQuery(query);
    setIsLoading(true);
    movieService
      .getMovie(query)
      .then((res) => {
        setMovies(res.slice(0, 6));
        setIsLoading(false);
      })
      .catch((e) => {
        setIsError(true);
        setErrorMessage(e.message + ", please reload page");
      });
  };

  const updateInputValue = debounce(onChange, 500);

  return (
    <div>
      {isError ? <Alert type="error" message={errorMessage} /> : null}
      <input
        className="searchbar"
        onChange={updateInputValue}
        placeholder="Type to search..."
        type="text"
      />
    </div>
  );
};

export default Searchbar;
