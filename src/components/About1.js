import React, { useEffect, useState } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../firebase/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaptopCode, faCamera } from '@fortawesome/free-solid-svg-icons';
import '../css/About1.css';

function About1() {
  const [imageUrl, setImageUrl] = useState('');


  useEffect(() => {
    // Reference to the image in Firebase Storage
    const imageRef = ref(storage, 'images/Kinnaur/DSC05116-1.jpg');


    // Get the download URL
    getDownloadURL(imageRef)
      .then((url) => {
        setImageUrl(url);
      })
      .catch((error) => {
        // Handle any errors
        console.error('Error getting download URL:', error);
      });

    getDownloadURL(imageRef)
  }, []);

  return (

    <section id='about'>
      <div className='aboutContainer'>
        <div id='aboutContent'>
          <span className='aboutTitle'>About Me</span>
          <span className='aboutDesc'>
            <p className='aboutName'><b>Hippiefarer</b> <span>- A free spirit who values peace, love and freedom.</span></p>
            {/* I'm a passionate photographer with over 4 years of experience, specializing in prewedding photography.
           My camera has taken me on journeys across the world, capturing stunning landscapes and creating cinematic 
           videos that tell stories through visuals. In addition to my photography adventures, I'm also a skilled front-end developer. 
           I excel in building interactive web applications using technologies such as React, HTML, CSS, and JavaScript. My creative and 
           technical skills combine to create visually engaging and user-friendly websites. */}
            Hi, I'm Shubham Jejurkar! A passionate photographer, traveller, and front-end developer. From past few years, I've been exploring India,
            capturing incredible landscapes and telling stories with my camera. But that's not all! I also help couples tell their love stories through pre-wedding photos.
            My expertise extends beyond photography, as I possess the technical skills to create interactive web applications. Using React, HTML, CSS, and JavaScript,
            I can design and develop visually appealing and user-friendly websites that showcase your work and tell your story to the world. I invite you to join me in
            celebrating the beauty of the world, the power of freedom, and the endless possibilities of the digital world.
          </span>
        </div>

        <div className='aboutPhoto'>
          <img src={imageUrl} alt="" />
        </div>
      </div>
    </section>
  );
}

export default About1;
