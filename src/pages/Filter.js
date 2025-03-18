import React, { useRef , useState  } from "react";
import "./filter.css";

function Filter() {

  const [searchQuery, setSearchQuery] = useState("");
  const carouselRef = useRef(null);

  const cities = ["delhi", "bangalore", "chennai", "mumbai", "hyderabad"];

  // Filter cities based on search input
  const filteredCities = cities.filter(city =>
    city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <div className="app">
    <header className="app-header">
      <div className="search-bar">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search for your city"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </header>

       {/* City Icons Section */}
       <section className="city-icons">
        {filteredCities.length > 0 ? (
          filteredCities.map((city) => (
            <div className="city-icon" key={city}>
              <img src={`${city}-icon.png`} alt={city} />
              <p>{city.charAt(0).toUpperCase() + city.slice(1)}</p>
            </div>
          ))
        ) : (
          <p className="no-results">No matching cities found</p>
        )}
      </section>

      <section className="categories">
        <h2>Categories</h2>
        <div className="carousel-container">
          <button className="arrow-btn arrow-left" onClick={scrollLeft}>‹</button>
          <div className="category-wrapper">
            <div className="category-icons" ref={carouselRef}>
              {["Drama", "Standup", "Dance", "Music", "Party", "Comedy", "Sports", "Art","Drama", "Standup", "Dance", "Music", "Party", "Comedy", "Sports", "Art","Drama", "Standup", "Dance", "Music", "Party", "Comedy", "Sports", "Art"].map((category) => (
                <div className="category-icon" key={category}>
                  <p>{category}</p>
                </div>
              ))}
            </div>
          </div>
          <button className="arrow-btn arrow-right" onClick={scrollRight}>›</button>
        </div>
      </section>
    </div>
  );
}

export default Filter;
