import React, { useState, useEffect } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../firebase/config';
import '../css/ImageGallery.css';
import Lightbox from './Lightbox';
import ScrollToTopButton from './ScrollToTopButton'

function ImageGallery() {
  const [imageUrls, setImageUrls] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [filteredImages, setFilteredImages] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('All');
  const [visibleImages, setVisibleImages] = useState(8); // Number of initially visible images
  const [imagesPerPage, setImagesPerPage] = useState(8); // Number of images to load per page


  const imageData = [
    { name: 'Kinnaur', ref: 'images/Kinnaur/DSC04014-1 copy.webp' },
    { name: 'SpitiValley', ref: 'images/Spiti Valley/DSC02973-1 .webp' },
    { name: 'Kinnaur', ref: 'images/Kinnaur/DSC06515-1.webp' },
    { name: 'Kinnaur', ref: 'images/Kinnaur/DSC03481 copy.webp' },
    { name: 'SpitiValley', ref: 'images/Spiti Valley/DSC02979.webp' },
    { name: 'Kinnaur', ref: 'images/Kinnaur/DSC03489 copy.webp' },
    { name: 'Kinnaur', ref: 'images/Kinnaur/DSC04010 copy.webp' },
    { name: 'SpitiValley', ref: 'images/Spiti Valley/DSC03214-1.webp' },
    { name: 'Kinnaur', ref: 'images/Kinnaur/DSC03491 copy.webp' },
    { name: 'Kinnaur', ref: 'images/Kinnaur/DSC04012 copy.webp' },
    { name: 'SpitiValley', ref: 'images/Spiti Valley/DSC02945-1.webp' },
    { name: 'Kinnaur', ref: 'images/Kinnaur/DSC08958 copy.webp' },
    { name: 'Kinnaur', ref: 'images/Kinnaur/DSC06488-1.webp' },
    { name: 'Kinnaur', ref: 'images/Kinnaur/DSC04017-1 copy.webp' },
    { name: 'SpitiValley', ref: 'images/Spiti Valley/VIV04098.webp' },
    { name: 'Kinnaur', ref: 'images/Kinnaur/DSC06500 copy.webp' },
    { name: 'Hampi', ref: 'images/Hampi/DSC03514-1.webp' },
    { name: 'Kinnaur', ref: 'images/Kinnaur/DSC03484 copy.webp' },
    { name: 'SpitiValley', ref: 'images/Spiti Valley/DSC02882.webp' },
    { name: 'Kinnaur', ref: 'images/Kinnaur/DSC08790 copy.webp' },
    { name: 'Hampi', ref: 'images/Hampi/IMG_0863.webp' },
    { name: 'Hampi', ref: 'images/Hampi/DSC06358.webp' },
    { name: 'Hampi', ref: 'images/Hampi/DSC05750.webp' },
    { name: 'Hampi', ref: 'images/Hampi/DSC03456-1.webp' },
    { name: 'Kinnaur', ref: 'images/Kinnaur/DSC04178 copy.webp' },
    { name: 'SpitiValley', ref: 'images/Spiti Valley/DSC03221-1.webp' },
    { name: 'Hampi', ref: 'images/Hampi/DSC03455-1.webp' },
    { name: 'Kinnaur', ref: 'images/Kinnaur/DSC04016-1 copy.webp' },
    { name: 'SpitiValley', ref: 'images/Spiti Valley/DSC03121-1.webp' },
    { name: 'Kinnaur', ref: 'images/Kinnaur/DSC03495 copy.webp' },
    { name: 'SpitiValley', ref: 'images/Spiti Valley/DSC02443-1.webp' },
    { name: 'Hampi', ref: 'images/Hampi/DSC03518-1 copy.webp' },
    { name: 'Kinnaur', ref: 'images/Kinnaur/DSC0__00000150 copy.webp' },
    { name: 'Hampi', ref: 'images/Hampi/DSC03463-1.webp' },
    { name: 'Kinnaur', ref: 'images/Kinnaur/DSC06483-1.webp' },
    { name: 'SpitiValley', ref: 'images/Spiti Valley/DSC02518-1.webp' },
    { name: 'Kinnaur', ref: 'images/Kinnaur/StarStaX_gap_filling_00000100 copy.webp' },
    { name: 'Kinnaur', ref: 'images/Kinnaur/DSC03840 copy.webp' },
    { name: 'Kinnaur', ref: 'images/Kinnaur/DSC06530 copy1.webp' },
    { name: 'Hampi', ref: 'images/Hampi/DSC03524-1.webp' },
    { name: 'Kinnaur', ref: 'images/Kinnaur/DSC04018-1.webp' },
    { name: 'Kinnaur', ref: 'images/Kinnaur/DSC04030 copy.webp' },
    { name: 'Hampi', ref: 'images/Hampi/DSC03535.webp' },
    { name: 'Kinnaur', ref: 'images/Kinnaur/DSC04040 copy.webp' },
    { name: 'Kinnaur', ref: 'images/Kinnaur/DSC04049 copy.webp' },
    { name: 'Kinnaur', ref: 'images/Kinnaur/DSC05151 copy.webp' },
    { name: 'Hampi', ref: 'images/Hampi/DSC03635-1.webp' },
    { name: 'Kinnaur', ref: 'images/Kinnaur/DSC06486-1.webp' },
    { name: 'Hampi', ref: 'images/Hampi/DSC05558-1.webp' },
    { name: 'Kinnaur', ref: 'images/Kinnaur/DSC08556-1.webp' },

  ];
  useEffect(() => {
    console.log('Landscapes component mounted');
    const fetchImageUrls = async () => {
      try {
        const urls = await Promise.all(
          imageData.map(async (image) => {
            const url = await getDownloadURL(ref(storage, image.ref));
            return { url, category: image.name };
          })
        );
        setImageUrls(urls);
        setFilteredImages(urls.slice(0, visibleImages));
      } catch (error) {
        console.error('Error getting download URLs:', error);
      }
    };

    fetchImageUrls();

    return () => {
      console.log('Component unmounted');
    };
  }, []);

  const openLightbox = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const handleCategoryClick = (category) => {
    if (category === 'All') {
      setFilteredImages(imageUrls.slice(0, visibleImages));
    } else {
      const filtered = imageUrls.filter((image) => image.category === category);
      setFilteredImages(filtered.slice(0, visibleImages));
    }
    setCurrentCategory(category);
  };

  const loadMoreImages = () => {
    setVisibleImages((prevVisibleImages) => prevVisibleImages + imagesPerPage);
    setFilteredImages(imageUrls.slice(0, visibleImages + imagesPerPage));
  };

  return (
    <div id='landscapes' className='galleryContainer'>
      <h1>Landscapes</h1>
      <div className="categoryButtons">
        <button onClick={() => handleCategoryClick('All')}>All</button>
        <button onClick={() => handleCategoryClick('SpitiValley')}>Spiti Valley</button>
        <button onClick={() => handleCategoryClick('Hampi')}>Hampi</button>
        <button onClick={() => handleCategoryClick('Kinnaur')}>Kinnaur</button>
      </div>
      <div className="image-gallery">
        {filteredImages.map((image, index) => (
          <img
            src={image.url}
            alt={imageData[index].name}
            key={image.url}
            onClick={() => openLightbox(image.url)}
            loading="lazy"
          />
        ))}
        {selectedImage && <Lightbox imageUrl={selectedImage} onClose={closeLightbox} />}
      </div>
      <div className="load-more-container">
        <button className="load-more-button" onClick={loadMoreImages}>
          Load More
        </button>
      </div>
      <ScrollToTopButton />
    </div>
  );
}

export default ImageGallery;
