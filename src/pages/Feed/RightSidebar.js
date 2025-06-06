import React, { useState, useEffect } from "react";
import "./RightSidebar.css"; 
import {
  MdOutlineExplore,
  MdMessage,
  MdSearch,
  MdNotifications,
  MdMoreHoriz,
  MdPerson,
} from "react-icons/md";
import { FaEye, FaHeart, FaComment, FaShare } from "react-icons/fa";
import { FaImage, FaSmile, FaTag } from "react-icons/fa";
import { FaLightbulb } from "react-icons/fa";
import { TfiMenu } from "react-icons/tfi";
import { PiFiles } from "react-icons/pi";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

function RightSidebar() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 838);
  const [sidebarVisible, setSidebarVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 838);
      if (window.innerWidth >= 838) {
        setSidebarVisible(true); 
      }
    };

    handleResize(); // initialize on load
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
  
      {isMobile && !sidebarVisible && (
        <button
          className="toggleArrow right1"
          onClick={() => setSidebarVisible(true)}
        >
          <MdChevronLeft size={18} />
        </button>
      )}

      {isMobile && sidebarVisible && (
        <button
          className="toggleArrow right1 sidebar-open"
          onClick={() => setSidebarVisible(false)}
        >
          <MdChevronRight size={18} />
        </button>
      )}

      <div className="storyCarouselMobile">
        <div className="storyScroll">
          {[1, 2, 3, 4, 5, 6].map((item, idx) => (
            <div className="storyCircle" key={idx}>
              <img
                src="https://images.unsplash.com/photo-1614350292382-c448d0110dfa?w=600&auto=format&fit=crop&q=60"
                alt={`Story ${idx + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
      {(sidebarVisible || !isMobile) && (
        <div className="rightSidebar">
          <h1 className="centertext"> Stories</h1>
          <div className="storySection">
            <div className="imageContainer">
              <img
                src="https://images.unsplash.com/photo-1614350292382-c448d0110dfa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c21hbGx8ZW58MHx8MHx8fDA%3D"
                alt="Story 1"
                className="storyImage"
              />
              <img
                src="https://images.unsplash.com/photo-1614350292382-c448d0110dfa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c21hbGx8ZW58MHx8MHx8fDA%3D"
                alt="Profile"
                className="profileImage"
              />
            </div>

            <div className="imageContainer">
              <img
                src="https://images.unsplash.com/photo-1614350292382-c448d0110dfa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c21hbGx8ZW58MHx8MHx8fDA%3D"
                alt="Story 2"
                className="storyImage"
              />
              <img
                src="https://images.unsplash.com/photo-1614350292382-c448d0110dfa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c21hbGx8ZW58MHx8MHx8fDA%3D"
                alt="Profile"
                className="profileImage"
              />
            </div>

            <div className="imageContainer">
              <img
                src="https://images.unsplash.com/photo-1614350292382-c448d0110dfa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c21hbGx8ZW58MHx8MHx8fDA%3D"
                alt="Story 3"
                className="storyImage"
              />
              <img
                src="https://images.unsplash.com/photo-1614350292382-c448d0110dfa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c21hbGx8ZW58MHx8MHx8fDA%3D"
                alt="Profile"
                className="profileImage"
              />
            </div>

            <div className="imageContainer">
              <img
                src="https://images.unsplash.com/photo-1614350292382-c448d0110dfa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c21hbGx8ZW58MHx8MHx8fDA%3D"
                alt="Story 4"
                className="storyImage"
              />
              <img
                src="https://images.unsplash.com/photo-1614350292382-c448d0110dfa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c21hbGx8ZW58MHx8MHx8fDA%3D"
                alt="Profile"
                className="profileImage"
              />
            </div>
          </div>

          <div className="suggestionsSection">
            <h4 className="suggest">Suggestions</h4>
            <div className="suggestionsList">
              <div className="suggestionProfile">
                <img
                  src="https://images.unsplash.com/photo-1614350292382-c448d0110dfa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c21hbGx8ZW58MHx8MHx8fDA%3D"
                  alt="Casper Miguel"
                  className="suggestionAvatar"
                />
                <div className="suggestionDetails">
                  <p className="suggestionName">Casper Miguel</p>
                  <p className="suggestionUsername">@casper_og</p>
                </div>
                <button className="followButton">Follow</button>

                <div className="vibeScore">
                  <div
                    className="questionMark"
                    data-tooltip="This score reflects the overall vibe based on recent activity."
                  >
                    ?
                  </div>
                  <span className="vibeText">Vibe Score: 89</span>
                  <div className="tooltip">This is the score: 89</div>
                </div>
              </div>

              <div className="suggestionProfile">
                <img
                  src="./logo192.png"
                  alt="Alex Carter"
                  className="suggestionAvatar"
                />
                <div className="suggestionDetails">
                  <p className="suggestionName">Alex Carter</p>
                  <p className="suggestionUsername">@lex_car</p>
                </div>
                <button className="followButton">Follow</button>
              </div>

              <div className="suggestionProfile">
                <img
                  src="./logo192.png"
                  alt="Maya Adams"
                  className="suggestionAvatar"
                />
                <div className="suggestionDetails">
                  <p className="suggestionName">Maya Adams</p>
                  <p className="suggestionUsername">@maya_a</p>
                </div>
                <button className="followButton">Follow</button>
              </div>
            </div>
          </div>

          <div className="interestsSection">
            <h4>Interests</h4>
            <div className="interestIcons">
              <img
                src="./logo192.png"
                alt="Game Icon"
                className="interestImage"
              />
              <img
                src="./logo192.png"
                alt="Music Icon"
                className="interestImage"
              />
              <img
                src="./logo192.png"
                alt="Bike Icon"
                className="interestImage"
              />
              <img
                src="./logo192.png"
                alt="Book Icon"
                className="interestImage"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RightSidebar;
