import React, { useRef, useState, useEffect } from "react";
import "./filter.css";
import { FiSearch } from "react-icons/fi";
import Leftsidebar from "../LeftNavBar";

function Filter() {
  const [searchQuery, setSearchQuery] = useState("");
  const carouselRef = useRef(null);

  const cities = ["delhi", "bangalore", "chennai", "mumbai", "hyderabad"];

  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const scrollLeft = () => {
    carouselRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    carouselRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  const cityImages = {
    mumbai: "https://images.unsplash.com/photo-1580581096469-8afb38d3dbd5",
    delhi:
      "https://plus.unsplash.com/premium_photo-1661919589683-f11880119fb7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGVsaGl8ZW58MHx8MHx8fDA%3D",
    bangalore:
      "https://plus.unsplash.com/premium_photo-1697730407028-1c602ffb2e81?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGJhbmdhbG9yZXxlbnwwfHwwfHx8MA%3D%3D",
    chennai: "https://images.unsplash.com/photo-1560347876-aeef00ee58a1",
    hyderabad:
      "https://images.unsplash.com/photo-1551161242-b5af797b7233?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aHlkZXJhYmFkfGVufDB8fDB8fHww",
    kolkata: "https://images.unsplash.com/photo-1607083203956-01c8d1f8a62e",
    jaipur: "https://images.unsplash.com/photo-1589645221675-3e3393b08478",
    pune: "https://images.unsplash.com/photo-1586199742238-c7a4c6815e48",
  };
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const switchTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="page-container">
      <Leftsidebar theme={theme} switchTheme={switchTheme} />

      <div className="main-content">
        <header className="app-header">
          <div className="search-bar">
            <span className="search-icon">
              <FiSearch size={29} className="search-icon-abs" />
            </span>
            <input
              type="text"
              className="placing7"
              placeholder="Search for your city"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </header>

        <section className="city-icons">
          {filteredCities.length > 0 ? (
            filteredCities.map((city) => (
              <div className="city-icon" key={city}>
                <img
                  src={`${
                    cityImages[city.toLowerCase()] || "fallback_image_url_here"
                  }`}
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
            <button className="arrow-btn arrow-left" onClick={scrollLeft}>
              ‹
            </button>
            <div className="category-wrapper">
              <div className="category-icons" ref={carouselRef}>
                {[
                  "Drama",
                  "Standup",
                  "Dance",
                  "Music",
                  "Party",
                  "Comedy",
                  "Sports",
                  "Art",
                  "Dance",
                  "Music",
                  "Party",
                  "Comedy",
                  "Sports",
                ].map((category, idx) => (
                  <div className="category-icon" key={idx}>
                    <p>{category}</p>
                  </div>
                ))}
              </div>
            </div>
            <button className="arrow-btn arrow-right" onClick={scrollRight}>
              ›
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Filter;
