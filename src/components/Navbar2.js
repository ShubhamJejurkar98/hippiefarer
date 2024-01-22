import React, { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import '../css/Navbar2.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);


  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>

      <div className="logo">
        <Link to='/'>Hippiefarer</Link>
      </div>

      <div className={`links ${isMenuOpen ? 'open' : ''}`}>
        <RouterLink to='/' onClick={closeMenu}>Home</RouterLink>

        <ScrollLink to="about" spy={true} smooth={true} offset={-52} duration={500} onClick={closeMenu}>About</ScrollLink>

        <ScrollLink to="landscapes" spy={true} smooth={true} offset={-60} duration={500} onClick={closeMenu}>Portfolio</ScrollLink>

        <ScrollLink to="blog" spy={true} smooth={true} offset={-75} duration={500} onClick={closeMenu}>Blog</ScrollLink>

        <ScrollLink to="contact" spy={true} smooth={true} offset={-40} duration={500} onClick={closeMenu}>Contact</ScrollLink>
        {isMenuOpen && (
          <div className="closeBtn" onClick={closeMenu}>
            <FontAwesomeIcon icon={faXmark} />
          </div>
        )}
      </div>

      <div className='toggleBtn' onClick={toggleMenu}>
        <FontAwesomeIcon icon={faBars} />
      </div>

    </nav>
  );
};

export default Navbar;

 {/* <div className={`dropdowns ${isMenuOpen ? 'open' : ''}`}>
          <div className="dropdown">
            <span>Portfolio <FontAwesomeIcon icon={faCaretDown} /></span>
            <div className="dropdown-menu">
              <RouterLink to='/landscapes' >
                Landscape
              </RouterLink>

              <RouterLink to="prewedding" >
                Prewedding
              </RouterLink>

              <RouterLink to="webdevelopment" >
                Web Development
              </RouterLink>
            </div>
          </div>
        </div> */}