import React, { useState, useEffect } from "react";
import "./movie-card.css";
import { Rate, Alert } from "antd";
import MovieDbService from "../../services/movieDbService";

const MovieCard = ({ title, overview, img, sessionId, id, activeTab }) => {
  const shortOverview = overview.split(" ").slice(0, 22).join(" ") + " ...";

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [rating, setRating] = useState(0);

  const movieDbService = new MovieDbService();
  const { rateMovie } = movieDbService;

  const handleRatingChange = (value) => {
    console.log("change happened");
    setRating(value);
    localStorage.setItem(`${id}`, value);
    rateMovie(id, sessionId, value)
      .then((response) => {
        setIsError(false);
        console.log(response);
      })
      .catch((e) => {
        setIsError(true);
        setErrorMessage(e.message);
      });
  };

  useEffect(() => {
    if (localStorage.getItem(`${id}`) != null) {
      console.log(localStorage.getItem(`${id}`));
      setRating(+localStorage.getItem(`${id}`));
    }
  }, []);

  const storageRating = localStorage.getItem(`${id}`);

  console.log("value:", storageRating);
  const imgLink = `https://image.tmdb.org/t/p/original${img}`;
  return (
    <div className="movie-card">
      <img src={imgLink} alt="" />
      <div className="movie-card__details">
        <div className="header-container">
          <h2>{title}</h2> <span>{rating}</span>
        </div>
        <span>March 5, 2020 </span>
        <div className="movie-card__genres">
          <span>Action</span> <span>Action</span>
        </div>
        <p className="movie-card__description">{shortOverview}</p>
        <div className="movie-card__stars">
          <Rate
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
