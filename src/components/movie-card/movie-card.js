import React, { useState, useEffect, useContext } from "react";
import "./movie-card.css";
import { Rate, Alert } from "antd";
import MovieDbService from "../../services/movieDbService";
import { GenresContext } from "../app/App";

const MovieCard = ({
  title,
  overview,
  img,
  sessionId,
  id,
  activeTab,
  genresIds,
}) => {
  const shortOverview = overview.split(" ").slice(0, 22).join(" ") + " ...";

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [rating, setRating] = useState(0);

  const movieDbService = new MovieDbService();
  const { rateMovie } = movieDbService;

  const handleRatingChange = (value) => {
    setRating(value);
    localStorage.setItem(`${id}`, value);
    rateMovie(id, sessionId, value)
      .then((response) => {
        setIsError(false);
      })
      .catch((e) => {
        setIsError(true);
        setErrorMessage(e.message);
      });
  };

  useEffect(() => {
    if (localStorage.getItem(`${id}`) != null) {
      setRating(+localStorage.getItem(`${id}`));
    }
  }, []);

  const storageRating = localStorage.getItem(`${id}`);

  let color;

  if (rating > 0 && rating <= 3) {
    color = "#E90000";
  } else if (rating > 3 && rating <= 5) {
    color = "#E97E00";
  } else if (rating > 5 && rating <= 7) {
    color = "#E9D100";
  } else {
    color = "#66E900";
  }

  const imgLink = `https://image.tmdb.org/t/p/original${img}`;

  const allGenres = useContext(GenresContext);

  const findGenre = (movieGenres, genres) => {
    let res = [];

    for (let i = 0; i < movieGenres.length; i++) {
      let genre = genres.genres.filter((item) => {
        if (item.id === movieGenres[0]) {
          return item.name;
        }
      });
      res.push(...genre);
    }

    res = res.map((item) => item.name);

    return res.length >= 2 ? res.slice(0, 2) : res;
  };

  const movieGenres = findGenre(genresIds, allGenres);

  return (
    <div className="movie-card">
      <img src={imgLink} alt="" />
      <div className="movie-card__details">
        <div className="header-container">
          <h2>{title}</h2>{" "}
          <span style={{ border: `2px solid ${color}` }}>{rating}</span>
        </div>
        <span>March 5, 2020 </span>
        <div className="movie-card__genres">
          {movieGenres.map((item) => {
            return <span style={{ marginRight: "5px" }}>{item}</span>;
          })}
        </div>
        <p className="movie-card__description">{shortOverview}</p>
        <div className="movie-card__stars">
          <Rate
            count={10}
            onChange={activeTab === "search" ? handleRatingChange : () => {}}
            value={rating}
            allowHalf
            defaultValue={0}
          />
          {isError ? (
            <Alert
              type="error"
              message={
                errorMessage
                  ? errorMessage
                  : "Sorry, unknown error occurred, please try again"
              }
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
