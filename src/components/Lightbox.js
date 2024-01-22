import React, { useEffect } from 'react';
import '../css/Lightbox.css';

function Lightbox({ imageUrl, onClose }) {

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  
  return (
    <div className="lightbox-overlay" onClick={onClose}>
    <div className="lightbox">
      <span className="close-button" onClick={onClose} role="button" aria-label="Close">
        &times;
      </span>
      <img src={imageUrl} alt="Full Size" role="presentation" />
    </div>
  </div>

  );
}

export default Lightbox;
