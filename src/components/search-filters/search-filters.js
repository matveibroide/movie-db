import "./search-filters.css";
const SearchFilters = ({ getTab, activeTab }) => {
  const styleActive = {
    color: "rgba(24, 144, 255, 1)",
    borderBottom: " solid 2px rgba(24, 144, 255, 1)",
  };

  return (
    <div onClick={getTab} className="search-filters">
      <span style={activeTab === 'search' ? styleActive : {}} className="search">
        Search
      </span>
      <span style={activeTab === 'rated' ? styleActive : {}} className="rated">Rated</span>
    </div>
  );
};

export default SearchFilters;
