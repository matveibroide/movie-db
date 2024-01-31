import MovieCard from "../movie-card/movie-card";
import "./movies-container.css";

const MoviesContainer = ({ movies }) => {
  const content =
    movies === null
      ? "There is no data"
      : movies.map((el, i) => {
          const { id, original_title: title, overview,poster_path:img } = el;
          return (
            <li key={id} id={id}>
              <MovieCard img = {img}  title={title} overview={overview}/>
            </li>
          );
        });
  return <ul className="movie-container">{content}</ul>;
};

export default MoviesContainer;
