import MovieCard from "../movie-card/movie-card";
import MoviesContainer from "../movie-container/movies-container";
import Header from "../header/header";
import "./App.css";
import { useState } from "react";
import { Spin } from "antd";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeQuery,setActiveQuery] = useState('')

  const height = movies.length <= 0 ? '100vh' : 'fit-content'

  return (
    <div style={{height:`${height}`}} className="App">
      <Header setActiveQuery = {setActiveQuery} setIsLoading={setIsLoading} setMovies={setMovies} />
      {isLoading ? (
        <Spin className="spin" />
      ) : (
        <MoviesContainer setMovies = {setMovies} activeQuery = {activeQuery} movies={movies} />
      )}
    </div>
  );
}

export default App;
