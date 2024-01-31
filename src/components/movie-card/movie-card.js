import React, { useState } from "react";
import './movie-card.css'
const MovieCard = ({title,overview}) => {
  const shortOverview = overview.split(' ').slice(0,22).join(' ') + ' ...'

  console.log(shortOverview)
  return (
    <div className="movie-card">
      <img
        src="https://s.yimg.com/ny/api/res/1.2/KAcBiAjfBGsEsOhT0fbw7w--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTEzOTE7Y2Y9d2VicA--/https://media.zenfs.com/en/homerun/feed_manager_auto_publish_494/d05a3f087fa57f6d41b865d53a42a5f5"
        alt=""
      />
      <div className="movie-card__details">
        <h2>{title}</h2>
        <span>March 5, 2020 </span>
        <div className="movie-card__genres">
          <span>Action</span> <span>Action</span>
        </div>
        <p className="movie-card__description">
          {shortOverview}
        </p>
        <div className="movie-card__stars"></div>
      </div>
    </div>
  );
};

export default MovieCard;
