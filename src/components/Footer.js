import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faCode } from '@fortawesome/free-solid-svg-icons';
import '../css/Footer.css';
import SocialMedia from './SocialMedia'

function Footer() {
  return (
    <footer className="footer">    
      <p className="footerText">© {new Date().getFullYear()} Hippiefarer. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
