import React, { useEffect, useRef, useState } from "react";
import "./Indexing.css";
import { card } from "./constant";
import { FaUser } from "react-icons/fa6";
import events from "../assets/events.jpg";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router";
import BookingDetails from "./BookingDetails";

const Index = () => {
  const containerRef = useRef();
  const isUserClickRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(1);
  const [selectedCard, setSelectedCard] = useState(null);

  const loopCards = [card[card.length - 1], ...card, card[0]];
  const navigate = useNavigate();
  const [showBookingModal, setShowBookingModal] = useState(false);

  const handleBookingDetail = () => {
    setShowBookingModal(true);
  };

  useEffect(() => {
    const container = containerRef.current;
    const cardWidth = container.scrollWidth / (card.length + 2);
    let scrollTimeout;

    container.scrollLeft = cardWidth;

    const handleScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        const scrollLeft = container.scrollLeft;
        const index = Math.round(scrollLeft / cardWidth);

        if (index === 0) {
          container.scrollLeft = card.length * cardWidth;
          setActiveIndex(card.length);
        } else if (index === card.length + 1) {
          container.scrollLeft = cardWidth;
          setActiveIndex(1);
        } else {
          setActiveIndex(index);
        }
        if (!isUserClickRef.current) {
          setSelectedCard(null);
        }

        isUserClickRef.current = false;
      }, 100);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="event-img">
        <img src={events} alt="event" />
        <input className="search" placeholder="Bangalore, IN" type="search" />
      </div>
   <div  className="part2"> 
 
      <div className="second-section">
        <div className="heading">
          <h3>Events in Bangalore (15 Apr - 21 Apr)</h3>
        </div>

        <div className="slider-container" ref={containerRef}>
          {loopCards.map((item, index) => (
            <div
              key={index}
              className={`event-card ${index === activeIndex ? "active" : ""} ${
                selectedCard && selectedCard.title === item.title
                  ? "selected"
                  : ""
              }`}
              style={{
                position: "relative",
                overflowX: "hidden",
                height: "60vh",
                width: "98.9vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundImage: `url(${item.backgroundImage})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                cursor: "pointer",
                flexDirection: "column",
              }}
              onClick={() => {
                isUserClickRef.current = true;
                if (selectedCard && selectedCard.title === item.title) {
                  setSelectedCard(null);
                } else if (index === activeIndex) {
                  setSelectedCard(item);
                }
              }}
            >
              <div className="event-image"></div>
              <div className="event-description">
                <div className="event-details">
                  <h2>{item.title}</h2>
                  <div className="location">
                    <span>📍 {item.location}</span>
                    <span>📅 {item.date}</span>
                    <span>⏰ {item.time}</span>
                  </div>
                  <div className="ratings">
                    <span>
                      <FaUser className="user-profile" /> {item.OverallRating}
                    </span>
                    <span>⭐ {item.Userrating}</span>
                  </div>
                </div>
                <div className="price-details">
                  <span className="price">₹{item.cost}</span>
                  <div className="level">beginner/novice</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
        {selectedCard && (
          <div className="expanded-details-below">
            <div>
              <FaPlus onClick={handleBookingDetail} className="plus-icon" />
            </div>
            <h5>{selectedCard.title}</h5>
            <div className="details-head">
              <div>
                <p>{selectedCard.location}</p>
                <p>{selectedCard.date}</p>
                <p>{selectedCard.time}</p>
              </div>
              <div>
                <p>Music</p>
                <p>18 & Above</p>
                <p>3.5</p>
              </div>
            </div>

            <div>
              <p>ABOUT EVENT</p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque vitae velit ex. Mauris dapibus risus quis suscipit
                vulputate. Eros diam egestas libero eu vulputate risus. Nulla
                facilisi. Pellentesque nec diam et sapien congue sagittis.
              </p>
            </div>

            <hr />

            <div>
              <div>
                <p>ABOUT ARTIST</p>
              </div>

              <div>
                <p>ABOUT ARTIST</p>
              </div>
            </div>
          </div>
        )}

        <BookingDetails
          isOpen={showBookingModal}
          onClose={() => setShowBookingModal(false)}
        />
      </div>
    </>
  );
};

export default Index;
