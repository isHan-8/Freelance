import React from "react";
import './modal.css'
import close from '../assets/party.jpg'
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; 

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <img src={close} alt="close" onClick={onClose} className="cross-img"/>
        {children} 
      </div>
    </div>
  );
};

export default Modal;
