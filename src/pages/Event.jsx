


import React from "react";
import "./event.css"; // Import the CSS file
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const EventCard = ({ image, title, location, date, time, rating, price }) => (
  <div
    className="event-card"
    style={{ backgroundImage: `url(${image})` }} 
  >
    <div className="event-card-content">
      <h3 className="ishan">{title}</h3>
      <div className="event-card-info">
        <div className="event-details">
          <span className="event-location">📍 {location}</span>
          <span className="event-date">📅 {date}</span>
          <span className="event-time">⏰ {time}</span>
        </div>
      </div>
      <div className="event-card-footer">
        <div className="event-rating-container">
          <span className="event-rating">⭐️ {rating}</span>
          <span className="event-rating1">⭐️ {rating}</span>
        </div>
        <div className="event-price-container">
          <span className="event-price">₹ {price}</span>
          <span className="price-info">beginner/novice</span>
        </div>
      </div>
    </div>
  </div>
);

const EventPage = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    cssEase: 'linear',
    arrows: false,
    pauseOnHover: true,
    centerMode: true,
    centerPadding: "0px", 
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  
  return (
    <div className="event-page">
      {/* Background Image */}
      <div className="event-bg">
        <div className="overlay">
          <div className="search-bar-container">
            <div className="search-bar">
              <input type="text" placeholder="Bangalore, IN" />
              <span className="search-icon">🔍</span>
            </div>
            <div className="settings-icon">
              <button>⚙️</button>
            </div>
          </div>
        </div>
      </div>

      {/* Event Title */}
      <div className="event-title-container">
        <h2 className="event-title">
          Events in Bangalore (15 Apr - 21 Apr) 📅
        </h2>
      </div>

      {/* Carousel Cards */}
      <Slider {...settings} className="cards-container">
        {[
          {
            image:
              "https://plus.unsplash.com/premium_photo-1666863911660-d64fc1022c12?w=600&auto=format&fit=crop&q=60",
            title: "ONLYGULPING",
            location: "Bangalore",
            date: "15 Apr 25",
            time: "19:00",
            rating: "3.8",
            price: "749",
          },
          {
            image:
              "https://plus.unsplash.com/premium_photo-1666863911660-d64fc1022c12?w=600&auto=format&fit=crop&q=60",
            title: "Music Concert",
            location: "Mumbai",
            date: "20 Apr 25",
            time: "18:30",
            rating: "4.5",
            price: "999",
          },
          {
            image:
              "https://plus.unsplash.com/premium_photo-1666863911660-d64fc1022c12?w=600&auto=format&fit=crop&q=60",
            title: "Art Exhibition",
            location: "Delhi",
            date: "18 Apr 25",
            time: "17:00",
            rating: "4.2",
            price: "599",
          },
          {
            image:
              "https://plus.unsplash.com/premium_photo-1666863911660-d64fc1022c12?w=600&auto=format&fit=crop&q=60",
            title: "Music Concert",
            location: "Mumbai",
            date: "20 Apr 25",
            time: "18:30",
            rating: "4.5",
            price: "999",
          },


{
            image:
              "https://plus.unsplash.com/premium_photo-1666863911660-d64fc1022c12?w=600&auto=format&fit=crop&q=60",
            title: "Art Exhibition",
            location: "Delhi",
            date: "18 Apr 25",
            time: "17:00",
            rating: "4.2",
            price: "599",
          },
        ].map((event, index) => (
          <EventCard key={index} {...event} />
        ))}
      </Slider>
    </div>
  );
};

export default EventPage;