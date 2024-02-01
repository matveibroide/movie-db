import MovieCard from "../movie-card/movie-card";
import "./movies-container.css";
import { Pagination } from "antd";
import MovieDbService from "../../services/movieDbService";

const MoviesContainer = ({ movies, activeQuery, setMovies }) => {
  const movieService = new MovieDbService();

  const content =
    movies.length <= 0
      ? "No matches..."
      : movies.map((el, i) => {
          const { id, original_title: title, overview, poster_path: img } = el;
          return (
            <li key={id} id={id}>
              <MovieCard img={img} title={title} overview={overview} />
            </li>
          );
        });

  const pagination = movies.length <= 0 ? null :
  <Pagination
        className="movie-container__pagination"
        style={{width:'60%',margin:'0 auto'}}
        onChange={(page) =>
          movieService.getMovie(activeQuery, page).then((res) => setMovies(res))
        }
        defaultCurrent={1}
        total={50}
      />
  return (
    <ul className="movie-container">
      {content}
      {pagination}
    </ul>
  );
};

export default MoviesContainer;
