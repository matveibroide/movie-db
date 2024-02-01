import React, { useState } from "react";
import "./movie-card.css";
const MovieCard = ({ title, overview, img }) => {
  const shortOverview = overview.split(" ").slice(0, 22).join(" ") + " ...";

  const imgLink = `https://image.tmdb.org/t/p/original${img}`;
  return (
    <div className="movie-card">
      <img src={imgLink} alt="" />
      <div className="movie-card__details">
        <h2>{title}</h2>
        <span>March 5, 2020 </span>
        <div className="movie-card__genres">
          <span>Action</span> <span>Action</span>
        </div>
        <p className="movie-card__description">{shortOverview}</p>
        <div className="movie-card__stars"></div>
      </div>
    </div>
  );
};

export default MovieCard;
