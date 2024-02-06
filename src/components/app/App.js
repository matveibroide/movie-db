import MovieCard from "../movie-card/movie-card";
import MoviesContainer from "../movie-container/movies-container";
import Header from "../header/header";
import "./App.css";
import { useState } from "react";
import { Spin } from "antd";
import { Offline, Online } from "react-detect-offline";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeQuery, setActiveQuery] = useState("");

  const height = movies.length <= 0 ? "100vh" : "auto";
  const justifyContent = isLoading ? "center" : "flex-start";

  const content = isLoading ? (

    
    <Spin className="spin" />
  ) : (
    <MoviesContainer
      setMovies={setMovies}
      activeQuery={activeQuery}
      movies={movies}
    />
  );

  return (
    <div
      style={{ height: `${height}`, justifyContent: `${justifyContent}` }}
      className="App"
    >
       <div>
    <Online><i style={{color:'lightGreen'}} class="fa-solid fa-wifi"></i></Online>
    <Offline><i style={{color:'red'}} class="fa-solid fa-wifi"></i></Offline>
  </div>
      <Header
        setActiveQuery={setActiveQuery}
        setIsLoading={setIsLoading}
        setMovies={setMovies}
      />

      {content}
     
    </div>
  );
}

export default App;
