import React, { useState, useEffect } from 'react';
import '../css/ScrollToTopButton.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowUp } from '@fortawesome/free-solid-svg-icons'

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    
  }, []); 

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <button
      className={`scrollToTopButton ${isVisible ? 'visible' : ''}`} onClick={scrollToTop} >
        
      <FontAwesomeIcon icon={faCircleArrowUp} />
    </button>
  );
}

export default ScrollToTopButton;
