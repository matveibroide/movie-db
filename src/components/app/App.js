import MovieCard from "../movie-card/movie-card";
import MoviesContainer from "../movie-container/movies-container";
import Header from "../header/header";
import "./App.css";
import { useState } from "react";
import { Spin } from "antd";

function App() {
  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="App">
      <Header setIsLoading={setIsLoading} setMovies={setMovies} />
      {isLoading ? (
        <Spin className="spin" />
      ) : (
        <MoviesContainer movies={movies} />
      )}
    </div>
  );
}

export default App;
