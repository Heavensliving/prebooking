import React, { useState, useRef } from 'react';
import './Home.css';
import { FaPlus, FaQrcode, FaTimes, FaInfoCircle, FaWhatsapp } from 'react-icons/fa'; // Import icons
import gpayImage from '../assets/Gpay.jpeg'; // Adjust the path based on your structure
import PreBookForm from './PreBookForm'; // Import the PreBookForm
import Amenities from './Amenities';
import { useNavigate } from 'react-router-dom'; // To handle navigation

const Home = () => {
  const [isQrVisible, setQrVisible] = useState(false);
  const [isFormVisible, setFormVisible] = useState(false); // State for form visibility
  const [isModalOpen, setModalOpen] = useState(false); // State for modal visibility
  const navigate = useNavigate(); // For navigation
  const longPressTimeout = useRef(null); // Ref to track the timeout

  const handleQrClick = () => {
    setQrVisible(!isQrVisible);
  };

  const handlePreBookClick = () => {
    setFormVisible(true); // Open the form
  };

  const handleCloseForm = () => {
    setFormVisible(false); // Close the form
  };

  const handleInfoClick = () => {
    setModalOpen(!isModalOpen); // Toggle the modal
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/yourwhatsappnumber', '_blank'); // Replace with your WhatsApp number
  };

  // Long press logic for navigating to admin page
  const startLongPress = () => {
    longPressTimeout.current = setTimeout(() => {
      navigate('/florainndotheavens-adminpage');
    }, 6000); // 6000 ms = 6 seconds
  };

  const endLongPress = () => {
    clearTimeout(longPressTimeout.current);
  };

  return (
    <>
      <div className="home-container">
        <div className="header">
          {/* Long press detection on "Flora Inn" */}
          <h2 
            className="animated-text" 
            onMouseDown={startLongPress} 
            onMouseUp={endLongPress} 
            onTouchStart={startLongPress} 
            onTouchEnd={endLongPress}
          >
            Flora Inn
          </h2>
          <h3 className="animated-text">Booking Portal</h3>
        </div>
      </div>

      <div className="main-content">
        {!isModalOpen && <Amenities />} {/* Hide amenities when modal is open */}

        {/* Buttons for Info, PreBook, and QR */}
        <div className="button-group">
          <button className="info-button" onClick={handleInfoClick}>
            {isModalOpen ? <FaTimes className="info-icon animated-warning" /> : <FaInfoCircle className="info-icon animated-warning" />}
            <span className="help-text">Help</span>
          </button>
          <button className="prebook-button" onClick={handlePreBookClick}>
            <FaPlus className="add-icon" /> PreBook
          </button>
          <button className="qr-button" onClick={handleQrClick}>
            {isQrVisible ? <FaTimes className="qr-icon" /> : <FaQrcode className="qr-icon" />}
          </button>
        </div>

        {/* QR Code Image */}
        {isQrVisible && (
          <div className="qr-modal">
            <img src={gpayImage} alt="Gpay QR Code" className="qr-code-image" />
          </div>
        )}

        {/* Transparent form modal */}
        {isFormVisible && <PreBookForm onClose={handleCloseForm} />}

        {/* Modal for info */}
        {isModalOpen && (
          <div className="howtobookmodal">
            <div className="howtobookmodal-content">
              <h2 style={{textAlign:'center'}}>How to Book</h2>
              <ul>
                <li className="step"><strong>Step 1:</strong> Click on QR code and pay pre-book amount of <strong style={{fontSize:"18px"}}>₹999/-</strong>.</li>
                <li className="step"><strong>Step 2:</strong> Click on PreBook button and fill all the details.</li>
                <li className="step"><strong>Step 3:</strong> Submit the form and you will get a success message.</li>
              </ul>
              <p>Now the pre-booking has been completed, and you can contact us for any further details.</p>
              <div style={{display:"flex",justifyContent:"center"}}>
              <button onClick={handleInfoClick} className='howtobookclosebtn'>Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
