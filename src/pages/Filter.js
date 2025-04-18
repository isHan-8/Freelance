import React, { useRef , useState  } from "react";
import "./filter.css";
import { IoSearchSharp } from "react-icons/io5";

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
  const cityImages = {
    mumbai: "https://images.unsplash.com/photo-1580581096469-8afb38d3dbd5",
    delhi: "https://images.unsplash.com/photo-1600784299089-14ba999b35b2",
    bangalore: "https://images.unsplash.com/photo-1554080353-a576cf803bfa",
    chennai: "https://images.unsplash.com/photo-1560347876-aeef00ee58a1",
    hyderabad: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90",
    kolkata: "https://images.unsplash.com/photo-1607083203956-01c8d1f8a62e",
    jaipur: "https://images.unsplash.com/photo-1589645221675-3e3393b08478",
    pune: "https://images.unsplash.com/photo-1586199742238-c7a4c6815e48",
    // Add more as needed
  };
  
  return (
    <div className="app">
    <header className="app-header">
      <div className="search-bar">
      <span className="search-icon">
        <IoSearchSharp size={34} />
      </span>
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
        <img
          src={`${cityImages[city.toLowerCase()] || 'fallback_image_url_here'}`}
          alt={city}
        />
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
