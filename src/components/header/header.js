import "./header.css";
import Searchbar from "../searchbar/searchbar";
import SearchFilters from "../search-filters/search-filters";
import { getActiveElement } from "@testing-library/user-event/dist/utils";

const Header = ({ setMovies, setIsLoading, setActiveQuery, getTab, activeTab }) => {
  return (
    <header>
      <SearchFilters getTab = {getTab}/>
     {activeTab === 'search' ?  <Searchbar
        setActiveQuery={setActiveQuery}
        setIsLoading={setIsLoading}
        setMovies={setMovies}
      /> : null}
    </header>
  );
};

export default Header;
