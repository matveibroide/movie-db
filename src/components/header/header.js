import "./header.css";
import Searchbar from "../searchbar/searchbar";

const Header = ({ setMovies, setIsLoading,setActiveQuery }) => {
  return (
    <header>
      <Searchbar setActiveQuery = {setActiveQuery} setIsLoading={setIsLoading} setMovies={setMovies} />
    </header>
  );
};

export default Header;
