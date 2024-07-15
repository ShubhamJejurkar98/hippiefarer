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
            {/* Hi, I'm Shubham Jejurkar! A passionate photographer, traveller, and front-end developer. From past few years, I've been exploring India,
            capturing incredible landscapes and telling stories with my camera. But that's not all! I also help couples tell their love stories through pre-wedding photos.
            My expertise extends beyond photography, as I possess the technical skills to create interactive web applications. Using React, HTML, CSS, and JavaScript,
            I can design and develop visually appealing and user-friendly websites that showcase your work and tell your story to the world. I invite you to join me in
            celebrating the beauty of the world, the power of freedom, and the endless possibilities of the digital world. */}
            Hi, I'm Shubham Jejurkar! I'm a passionate Landscape Photographer & Travel Filmmaker. Over the past few years, I've been exploring India, capturing its stunning landscapes and telling stories through my camera.
            To me, travel is more than just seeing sights, it's a journey that changes you deeply and permanently, shaping your ideas about living. Through my lens, I aim to capture the raw, untouched beauty of the places 
            I visit and the unique stories of the people I meet. Whether it's the towering peaks of the Himalayas or the serene beaches of the coastline, each destination offers a new adventure and a new perspective.
            Traveling has taught me to appreciate the small moments and the grandeur of nature, and I aim to inspire others to explore the world around them. Join me on this wonderful journey ahead. Let's explore, wonder, and discover together.
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
