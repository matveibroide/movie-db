import MovieCard from "../movie-card/movie-card";
import MoviesContainer from "../movie-container/movies-container";
import Header from "../header/header";
import "./App.css";
import { useState, useEffect } from "react";
import { Spin } from "antd";
import { Offline, Online } from "react-detect-offline";
import MovieDbService from "../../services/movieDbService";
function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeQuery, setActiveQuery] = useState("");
  const [activeTab, setActiveTab] = useState("search");
  const [sessionId, setSessionId] = useState(null);
  const [ratedMovies, setRatedMovies] = useState([]);

  const movieDbService = new MovieDbService();
  const { createGuestSession, getRatedMoviesList } = movieDbService;

  useEffect(() => {
    createGuestSession()
      .then((res) => setSessionId(res.guest_session_id))
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    if (activeTab === "rated") {
      getRatedMoviesList(sessionId)
        .then((data) => setRatedMovies(data.results))
        .catch((e) => console.log(e));
    } else {
      return;
    }
  }, [activeTab]);

  const height = movies.length <= 0 ? "100vh" : "auto";
  const justifyContent = isLoading ? "center" : "flex-start";

  const getTab = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!e.target.classList.contains("search-filters")) {
      setActiveTab(e.target.className);
    }
  };

  const searchContent = isLoading ? (
    <Spin className="spin" />
  ) : (
    <MoviesContainer
      activeTab={activeTab}
      sessionId={sessionId}
      setMovies={setMovies}
      activeQuery={activeQuery}
      movies={movies}
    />
  );

  const ratedContent = isLoading ? (
    <Spin className="spin" />
  ) : (
    <MoviesContainer
      activeTab={activeTab}
      sessionId={sessionId}
      setMovies={setMovies}
      activeQuery={activeQuery}
      movies={ratedMovies}
    />
  );

  return (
    <div
      style={{ height: `${height}`, justifyContent: `${justifyContent}` }}
      className="App"
    >
      <div>
        <Online>
          <i style={{ color: "lightGreen" }} class="fa-solid fa-wifi"></i>
        </Online>
        <Offline>
          <i style={{ color: "red" }} class="fa-solid fa-wifi"></i>
        </Offline>
      </div>
      <Header
        activeTab={activeTab}
        getTab={getTab}
        setActiveQuery={setActiveQuery}
        setIsLoading={setIsLoading}
        setMovies={setMovies}
      />
      {activeTab === "search" ? searchContent : ratedContent}
    </div>
  );
}

export default App;
