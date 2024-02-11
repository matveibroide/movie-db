import "./search-filters.css";
const SearchFilters = ({ getTab }) => {
  return (
    <div onClick={getTab} className="search-filters">
      <span className="search">Search</span>
      <span className="rated">Rated</span>
    </div>
  );
};

export default SearchFilters;
