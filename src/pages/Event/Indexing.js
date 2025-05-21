import React, { useEffect, useRef, useState } from "react";
import "./Indexing.css";
import { card } from "./constant";
import { FaUser } from "react-icons/fa6";
import events from "../../assets/events.jpg";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router";
import BookingDetails from "./BookingDetails";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaHourglassHalf,
  FaMusic,
  FaUserAlt,
} from "react-icons/fa";
import { MdOutlineStarRate } from "react-icons/md";
import { FaMicrophoneAlt, FaHome } from "react-icons/fa";
import { useContext } from "react";
import { useTheme } from "../../ThemeContext.js";
import { FiCalendar } from "react-icons/fi";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Index = () => {
  const containerRef = useRef();
  const isUserClickRef = useRef(false);
  const [activeIndex, setActiveIndex] = useState(1);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [hideCardContent, setHideCardContent] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState(new Date());
  const calendarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (calendarRef.current && !calendarRef.current.contains(e.target)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const loopCards = [card[card.length - 1], ...card, card[0]];
  const navigate = useNavigate();

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
          setHideCardContent(false);
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

      <div className="part2">
        <div className="second-section">
          <div className="calendar-wrapper" ref={calendarRef}>
            <div className="calendar-header">
              <h3>Events in Bangalore (15 Apr - 21 Apr)</h3>
              <FiCalendar
                size={24}
                style={{ cursor: "pointer" }}
                onClick={() => setShowCalendar(!showCalendar)}
              />
            </div>

            {showCalendar && (
              <div className="calendar-popup">
                <Calendar onChange={setDate} value={date} />
              </div>
            )}
          </div>

          <div className="slider-container" ref={containerRef}>
            {loopCards.map((item, index) => (
              <div
                key={index}
                className={`event-card ${
                  index === activeIndex ? "active" : ""
                } ${
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
                    setHideCardContent(false);
                  } else if (index === activeIndex) {
                    setSelectedCard(item);
                    setHideCardContent(true);
                  }
                }}
              >
                {!hideCardContent && (
                  <>
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
                            <FaUser className="user-profile" />{" "}
                            {item.OverallRating}
                          </span>
                          <span>⭐ {item.Userrating}</span>
                        </div>
                      </div>
                      <div className="price-details">
                        <div className="price">
                          <span className="currency">₹</span>
                          <span className="amount">
                            {item.cost}
                            <span className="arrow">˅</span>
                          </span>
                        </div>
                        <div className="level">beginner/novice</div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {selectedCard && (
          <div className="expanded-details-below">
            <div className="top-section">
              <FaPlus onClick={handleBookingDetail} className="plus-icon" />
              <h5 className="event-title">{selectedCard.title}</h5>
            </div>

            <div className="details-head">
              <div className="left-details">
                <p>
                  <FaMapMarkerAlt /> {selectedCard.location}
                </p>

                <div className="date-time-row">
                  <p>
                    <FaCalendarAlt /> {selectedCard.date}
                  </p>
                  <p>
                    <FaClock /> {selectedCard.time}
                  </p>
                </div>
                <p>
                  <FaMapMarkerAlt /> {selectedCard.ishan}
                </p>
              </div>
              <div className="right-details">
                <p>
                  <FaMusic /> Music
                </p>
                <p>
                  <FaUserAlt /> 18 & Above
                </p>
                <p>
                  <MdOutlineStarRate /> {selectedCard.OverallRating}
                </p>
              </div>
            </div>

            <div className="about-section">
              <p className="section-title">ABOUT EVENT</p>
              <p className="section-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque vitae velit ex. Mauris dapibus risus quis suscipit
                vulputate. Eros diam egestas libero eu vulputate risus. Nulla
                facilisi. Pellentesque nec diam et sapien congue sagittis. Lorem
                ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
                vitae velit ex. Mauris dapibus risus quis suscipit vulputate.
                Eros diam egestas
              </p>
            </div>

            <hr style={{ marginTop: "-2px", borderTop: "2px solid #555" }} />

            <div className="artist-host-section">
              <div className="person-block">
                <p className="section-title">ABOUT ARTIST</p>
                <div className="profile">
                  <div>
                    <p>
                      <FaMicrophoneAlt style={{ marginRight: "10px" }} />
                      <strong>KUNAL DAMRA</strong>
                    </p>
                    <p className="rating">
                      <MdOutlineStarRate /> 4.2
                    </p>
                  </div>
                </div>
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: "50px",
                  marginLeft: "330px",
                  width: "1px",
                  height: "70px",
                  backgroundColor: "#ccc",
                }}
              />

              <div className="person-block">
                <p className="section-title">ABOUT HOST</p>
                <div className="profile">
                  <div>
                    <p>
                      <FaHome style={{ marginRight: "10px" }} />
                      <strong>ABHISHEK W</strong>
                    </p>
                    <p className="rating">
                      <MdOutlineStarRate /> 3.8
                    </p>
                  </div>
                </div>
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
