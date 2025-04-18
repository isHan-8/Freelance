import React from 'react';
import './bookingDetails.css';
import Modal from '../pages/modal';

const BookingDetails = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="booking-wrapper">
        <h2 className="booking-title">Booking Details</h2>

        <div className="plans-section">
          {Array(3).fill(0).map((_, i) => (
            <div className={`plan-box ${i === 0 ? 'active' : ''}`} key={i}>
              <p className="plan-name">Small Gulp</p>
              <p className="plan-desc">Includes drinks, music & dance<br />valid for one hour</p>
              <p className="plan-price">749</p>
              {i === 0 && <span className="check-mark">✔</span>}
            </div>
          ))}
        </div>

        <div className="price-breakdown">
          <div className="price-row"><span>Sub Total</span><span>749.00</span></div>
          <div className="price-row"><span>Extra Charges</span><span>209.00</span></div>
          <div className="price-row"><span>Booking Fee</span><span>180.00</span></div>
          <div className="price-row total"><span>Total</span><span>1138.00</span></div>
        </div>

        <p className="consent-text">
          By proceeding, I express my consent to complete this transaction.
        </p>

        <button className="book-button">Proceed to Book</button>
      </div>
    </Modal>
  );
};

export default BookingDetails;
