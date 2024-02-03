import "./header.css";
import Searchbar from "../searchbar/searchbar";
import SearchFilters from "../search-filters/search-filters";

const Header = ({ setMovies, setIsLoading, setActiveQuery }) => {
  return (
    <header>
      <SearchFilters/>
      <Searchbar
        setActiveQuery={setActiveQuery}
        setIsLoading={setIsLoading}
        setMovies={setMovies}
      />
    </header>
  );
};

export default Header;
