import React, { useEffect, useState, useRef } from 'react';
import '../css/Blogs.css';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../firebase/config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowLeft, faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
import blogsData from './Blogsdata';
import { useParams, useNavigate } from 'react-router-dom';


const Blogs = () => {
  const { blogKey } = useParams();
  const [imageUrls, setImageUrls] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const imagesCache = useRef({});

  useEffect(() => {
    let isMounted = true;

    const fetchImages = async () => {
      try {
        // Check if images are already in the cache
        if (imagesCache.current[blogKey]) {
          if (isMounted) {
            setImageUrls(imagesCache.current[blogKey]);
          }
        } else {
          const currentBlogData = blogsData[blogKey];
          const urls = await Promise.all(
            currentBlogData.places.map(async (place) => {
              const imageRef = ref(storage, place.imagePath);
              try {
                const url = await getDownloadURL(imageRef);
                return url;
              } catch (error) {
                console.error('Error getting download URL:', error);
                return null;
              }
            })
          );

          if (isMounted) {
            setImageUrls(urls);
          }

          // Cache the images
          imagesCache.current[blogKey] = urls;
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();

    return () => {
      isMounted = false;
    };
  }, [blogKey]);

  const handlePrevNext = (direction) => {
    const blogKeys = Object.keys(blogsData);
    const currentIndexInBlog = blogKeys.indexOf(blogKey);
    const lastIndex = blogKeys.length - 1;

    let nextIndex;

    if (direction === 'next') {
      nextIndex = currentIndexInBlog < lastIndex ? currentIndexInBlog + 1 : 0;
    } else {
      nextIndex = currentIndexInBlog > 0 ? currentIndexInBlog - 1 : lastIndex;
    }

    const nextBlog = blogKeys[nextIndex];
    setCurrentIndex(0); // Reset the index when switching blogs
    navigate(`/travelblog/${nextBlog}`);
  };


  return (
    <div className='containerSection'>
      <div className='navigation-buttons'>
        <button onClick={() => handlePrevNext('prev')}><FontAwesomeIcon icon={faCircleArrowLeft} /></button>

        <h1>{blogsData[blogKey].title1}</h1>
        
        <button onClick={() => handlePrevNext('next')}><FontAwesomeIcon icon={faCircleArrowRight} /></button>
      </div>

      {blogsData[blogKey].places.map((place, index) => (
        <div className={`container ${index % 2 === 0 ? 'even' : 'odd'}`} key={index}>
          {index % 2 === 0 ? (
            <>
              <div className='box'>
                <h1 className='title'>{place.title}</h1>
                <h4 className='subtitle'>{place.subtitle}</h4>
                <p>{place.description}</p>
              </div>
              <img src={imageUrls[index]} alt='' />
            </>
          ) : (
            <>
              <img src={imageUrls[index]} alt='' />
              <div className='box'>
                <h1 className='title'>{place.title}</h1>
                <h4 className='subtitle'>{place.subtitle}</h4>
                <p>{place.description}</p>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Blogs;

// import React, { useEffect, useState } from 'react';
// import './Nature.css';
// import { getDownloadURL, ref } from 'firebase/storage';
// import { storage } from '../firebase/config';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCircleArrowLeft, faCircleArrowRight } from '@fortawesome/free-solid-svg-icons';
// import blogsData from './Blogsdata';


// const Blogs = () => {
//   const [activeBlog, setActiveBlog] = useState('spitiValley');
//   const [imageUrls, setImageUrls] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const fetchImages = async () => {
//       const currentBlogData = blogsData[activeBlog];
//       const urls = await Promise.all(
//         currentBlogData.places.map(async (place) => {
//           const imageRef = ref(storage, place.imagePath);
//           try {
//             const url = await getDownloadURL(imageRef);
//             return url;
//           } catch (error) {
//             console.error('Error getting download URL:', error);
//             return null;
//           }
//         })
//       );

//       setImageUrls(urls);
//     };

//     fetchImages();
//   }, [activeBlog]);

//   const handlePrevNext = (direction) => {
//     const blogKeys = Object.keys(blogsData);
//     const currentIndexInBlog = blogKeys.indexOf(activeBlog);
//     const lastIndex = blogKeys.length - 1;
  
//     let nextIndex;
  
//     if (direction === 'next') {
//       nextIndex = currentIndexInBlog < lastIndex ? currentIndexInBlog + 1 : 0;
//     } else {
//       nextIndex = currentIndexInBlog > 0 ? currentIndexInBlog - 1 : lastIndex;
//     }
  
//     const nextBlog = blogKeys[nextIndex];
//     setActiveBlog(nextBlog);
//     setCurrentIndex(0); // Reset the index when switching blogs
//   };

//   return (
//     <div className='containerSection'>
//       <div className='navigation-buttons'>
//         <button onClick={() => handlePrevNext('prev')}><FontAwesomeIcon icon={faCircleArrowLeft} /></button>

//         <h1>{blogsData[activeBlog].title1}</h1>
        
//         <button onClick={() => handlePrevNext('next')}><FontAwesomeIcon icon={faCircleArrowRight} /></button>
//       </div>

//       {blogsData[activeBlog].places.map((place, index) => (
//         <div className={`container ${index % 2 === 0 ? 'even' : 'odd'}`} key={index}>
//           {index % 2 === 0 ? (
//             <>
//               <div className='box'>
//                 <h1 className='title'>{place.title}</h1>
//                 <h4 className='subtitle'>{place.subtitle}</h4>
//                 <p>{place.description}</p>
//               </div>
//               <img src={imageUrls[index]} alt='' />
//             </>
//           ) : (
//             <>
//               <img src={imageUrls[index]} alt='' />
//               <div className='box'>
//                 <h1 className='title'>{place.title}</h1>
//                 <h4 className='subtitle'>{place.subtitle}</h4>
//                 <p>{place.description}</p>
//               </div>
//             </>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Blogs;
