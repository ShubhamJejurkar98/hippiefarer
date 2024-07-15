import React, { useEffect, useState, useRef } from 'react'
import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '../firebase/config'
import '../css/Home2.css'
import SocialMedia from './SocialMedia'
import Blogcard from './blogCards'
import Landscapes from './Landscapes'
import About from './About1'
import Skills from './Skills'
import Contact from './Contact2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'




const Home = React.memo(() => {

    const [imageIndex, setImageIndex] = useState(0);
    const [imageUrls, setImageUrls] = useState([]);
  
    const imageRefs = [
      'images/Kinnaur/DSC03489 copy.webp',
      'images/Spiti Valley/DSC02973-1 .webp',
      'images/Kinnaur/DSC03495 copy.webp',
      'images/Hampi/IMG_0863.webp',
      'images/Kinnaur/DSC08790 copy.webp',
      'images/Maharashtra/fireflies1.webp',
    ];

    useEffect(() => {
    //console.log('Home component mounted');
      
      const fetchImageUrls = async () => {
        try {
          const urls = await Promise.all(
            imageRefs.map(async (imageRef) => {
              const url = await getDownloadURL(ref(storage, imageRef));
              return url;
            })
          );
  
          setImageUrls(urls);
        } catch (error) {
          console.error('Error getting download URLs:', error);
        }
      };
  
      fetchImageUrls();
  
      return () => {
        // console.log('Home component unmounted');
      };
    }, []); 

    const prevSlide = () => {
        setImageIndex((prevIndex) => (prevIndex - 1 + imageUrls.length) % imageUrls.length);
    };

    const nextSlide = () => {
        setImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    };

    const goToSlide = (index) => {
        setImageIndex(index);
    };

    return (
        <>
            <div className='introContainer' id='intro'>
                <div className="imageCarousel">
                    <button onClick={prevSlide} className="carouselArrow prev"><FontAwesomeIcon icon={faChevronLeft} /></button>
                    <div className="carouselWrapper">
                        {imageUrls.length > 0 && (
                            <div
                                className="carouselImage"
                                style={{
                                    transform: `translateX(-${imageIndex * 100}%)`,
                                    transition: 'transform 2s ease-in-out',

                                }}
                            >
                                {imageUrls.map((url, index) => (
                                    <img
                                        key={index}
                                        src={url}
                                        alt={`${index}`}
                                        loading='lazy'
                                        className={`carouselImage ${index === imageIndex ? 'active' : ''}`} />
                                        
                                ))}
                            </div>
                        )}
                    </div>

                    <button onClick={nextSlide} className="carouselArrow next"><FontAwesomeIcon icon={faChevronRight} /></button>
                                    
                    <div className="carouselIndicators">
                        {imageUrls.map((_, index) => (
                            <ul
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={index === imageIndex ? 'active' : ''}
                            />
                        ))}
                    </div>

                </div>

                <div className='introContent'>
                    <span className='introName'>Explore, Capture & Create!</span>
                    <span className='introPara'>Exploring the world, capturing moments and building online experiences.</span>
                    <SocialMedia />
                </div>
                
            </div>
            <Blogcard />
            <Landscapes />
            <About />
            <Contact />
        </>
    );
})

export default Home;


    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length);
    //     }, 3000); // Change image every 3 seconds

    //     return () => {
    //         clearInterval(interval);
    //     };
    // }, [imageUrls]);