import React from "react";
import { FaEye, FaHeart, FaComment, FaShare } from "react-icons/fa";
import { TfiMenu } from "react-icons/tfi";
import { PiFiles } from "react-icons/pi";
import { FaImage, FaLightbulb, FaTag } from "react-icons/fa";
import "./MainFeed.css"; // You can create a separate CSS file for this component

function MainFeed() {
    return (
            <div className="centerFeed">
              <h1 className="centertext">Feeds</h1>
        
              <div className="feedCard cardYellow">
                <div className="feedHeader">
                  <img src="./logo192.png" alt="James Orion" className="avatar" />
                  <div className="userDetails">
                  <h4 className="cardusing">James Orion</h4>
        
                    <p className="timeStamp">a min ago</p>
                  </div>
                  <div>
                    <TfiMenu className="moreIconContainer" />
                  </div>
                </div>
        
                <p className="feedText">
                  To increase the gap between each navbar icon in your left navigation
                  bar, you can add margin to the .menuItem class, which will space out
                  each item more effectively. Since the menuItem is the element that
                  wraps the navbar items, adjusting its margin will create more space
                  between them..
                </p>
                <div className="feedActions">
                  <button className="actionButton">
                    <FaEye /> <span></span>
                  </button>
                  <button className="actionButton">
                    <FaHeart /> <span></span>
                  </button>
                  <button className="actionButton">
                    <FaComment /> <span></span>
                  </button>
                  <button className="actionButton">
                    <FaShare /> <span></span>
                  </button>
                </div>
              </div>
        
              <div className="feedCard cardBlue">
                <div className="feedHeader">
                  <img src="./logo192.png" alt="Chris Matheww" className="avatar" />
                  <div className="userDetails">
                    <h4 className="cardusing">Chris Mathew</h4>
                    <p className="timeStamp">2 hours ago</p>
                  </div>
                  <div>
                    <TfiMenu className="moreIconContainer" />
                  </div>
                </div>
        
                <p className="feedText">
                  Enjoyed today’s trekking event hosted by NaturalCorp Org.
                </p>
                <div className="imageGallery">
                  <img src="./logo192.png" alt="Trekking" className="galleryImage" />
                  <img src="./logo192.png" alt="Trekking" className="galleryImage" />
                  <img src="./logo192.png" alt="Trekking" className="galleryImage" />
                </div>
                <div className="feedActions">
                  <button className="actionButton">
                    <FaEye /> <span>View</span>
                  </button>
                  <button className="actionButton">
                    <FaHeart /> <span>Like</span>
                  </button>
                  <button className="actionButton">
                    <FaComment /> <span>Comment</span>
                  </button>
                  <button className="actionButton">
                    <FaShare /> <span>Share</span>
                  </button>
                </div>
              </div>
              <div className="feedCard cardBlue">
                <div className="feedHeader">
                  <img src="./logo192.png" alt="Chris Matheww" className="avatar" />
                  <div className="userDetails">
                    <h4 className="cardusing">Chris Mathew</h4>
                    <p className="timeStamp">2 hours ago</p>
                  </div>
                  <div>
                    <TfiMenu className="moreIconContainer" />
                  </div>
                </div>
        
                <p className="feedText">
                  Enjoyed today’s trekking event hosted by NaturalCorp Org.
                </p>
                <div className="imageGallery">
                  <img src="./logo192.png" alt="Trekking" className="galleryImage" />
                  <img src="./logo192.png" alt="Trekking" className="galleryImage" />
                  <img src="./logo192.png" alt="Trekking" className="galleryImage" />
                </div>
                <div className="feedActions">
                  <button className="actionButton">
                    <FaEye /> <span>View</span>
                  </button>
                  <button className="actionButton">
                    <FaHeart /> <span>Like</span>
                  </button>
                  <button className="actionButton">
                    <FaComment /> <span>Comment</span>
                  </button>
                  <button className="actionButton">
                    <FaShare /> <span>Share</span>
                  </button>
                </div>
              </div>
        
              {/* Post Box - Fixed at the bottom of the MainFeed */}
              <div className="postBoxFixed">
                <div className="inputContainer">
                  <input type="text" placeholder="Share something..." className="ishan" />
                  <img src="./logo192.png" alt="icon" className="inputIcon" />
                  <FaLightbulb className="inputIconRight" />
                </div>
        
                <div className="postBoxActions">
                  <div className="iconRow">
                    <div className="iconItem">
                      <PiFiles className="icon" />{" "}
                      <span className="iconText">Files</span>
                    </div>
                    <div className="iconItem">
                      <FaImage className="icon" />{" "}
                      <span className="iconText">Images</span>
                    </div>
                    <div className="iconItem">
                      <FaTag className="icon" /> <span className="iconText">Tags</span>
                    </div>
                  </div>
        
                  <button className="postButton">Post</button>
                </div>
              </div>
            </div>
  );
}

export default MainFeed;
