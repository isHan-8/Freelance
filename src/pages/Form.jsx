import React, { useState } from "react";
import "./Form.css";
import { FaGreaterThan } from "react-icons/fa";

const CreateEvent = () => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
    document.body.classList.toggle("dark-mode", !isDark);
  };

  return (
    <>
    <label className="switch">
    <input type="checkbox" checked={isDark} onChange={toggleTheme} />
    <span className="slider round"></span>
  </label>
    <div className="form-container">
    

      <h1>Create Event</h1>

      <form className="event-form">
        <h4 className="section-title">EVENT DETAILS</h4>

        <div className="row">
          <div className="field">
            <label>
              Event Name<span>*</span>
            </label>
            <input type="text" />
          </div>
          <div className="field">
            <label>
              Location<span>*</span>
            </label>
            <input type="text" />
          </div>
        </div>

        <div className="row small-row">
          <div className="field small">
            <label>
              Event Date<span>*</span>
            </label>
            <input type="date" />
          </div>
          <div className="field small">
            <label>
              Time<span>*</span>
            </label>
            <input type="time" />
          </div>
          <div className="field small">
            <label>
              Genre<span>*</span>
            </label>
            <input type="text" />
          </div>
          <div className="field small">
            <label>Duration</label>
            <input type="text" />
          </div>
          <div className="field small">
            <label>
              Min. Rating<span>*</span>
            </label>
            <input type="text" />
          </div>
        </div>

        <div className="field full">
          <label>
            Event Description<span>*</span>
          </label>
          <textarea rows="3"></textarea>
        </div>

        <div className="row">
          <div className="field">
            <label>
              Artist Name<span>*</span>
            </label>
            <input type="text" />
          </div>
          <div className="field">
            <label>
              About Artist<span>*</span>
            </label>
            <input type="text" />
          </div>
        </div>

        <h4 className="section-title">TICKETING DETAILS</h4>

        <div className="field small-width">
          <label>
            Ticket Plans<span>*</span>
          </label>
          <input type="text" />
        </div>

        <div className="button-container">
          <button className="create-btn" type="submit">
            Create Event
          </button>
        </div>
      </form>
    </div>
    </>
  );
};

export default CreateEvent;
