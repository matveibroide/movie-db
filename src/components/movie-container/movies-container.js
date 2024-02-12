import MovieCard from "../movie-card/movie-card";
import { useContext } from "react";
import "./movies-container.css";
import { Pagination } from "antd";
import MovieDbService from "../../services/movieDbService";

const MoviesContainer = ({
  movies,
  activeQuery,
  setMovies,
  sessionId,
  activeTab,
}) => {
  const movieService = new MovieDbService();

  const style =
    movies.length <= 0
      ? "movie-container-not-active"
      : "movie-container-active";

  const content =
    movies.length <= 0 ? (
      <span>NO MATCHES FOUND...</span>
    ) : (
      movies.map((el, i) => {
        const { id, original_title: title, overview, poster_path: img, genre_ids } = el;
        return (
          <li key={id} id={id}>
            <MovieCard
              genresIds = {genre_ids}
              activeTab={activeTab}
              sessionId={sessionId}
              img={img}
              title={title}
              overview={overview}
              id={id}
            />
          </li>
        );
      })
    );

  const pagination =
    movies.length <= 0 ? null : (
      <Pagination
        className="movie-container__pagination"
        style={{ width: "60%", margin: "0 auto" }}
        onChange={(page) =>
          movieService
            .getMovie(activeQuery, page)
            .then((res) => setMovies(res.slice(0, 6)))
        }
        defaultCurrent={1}
        total={50}
      />
    );

    
  return (
    <ul className={`${style}`}>
      {content}
      {activeTab === 'search' ? pagination : null}
    </ul>
  );
};

export default MoviesContainer;
