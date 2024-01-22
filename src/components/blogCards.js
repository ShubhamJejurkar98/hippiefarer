import React, { useEffect, useState } from 'react'
import '../css/blogCard.css'
import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '../firebase/config'
import { Link} from 'react-router-dom';


function Portfolio() {

  const [imageUrl, setImageUrl] = useState('');
  const [imageUrl1, setImageUrl1] = useState('');
  const [imageUrl2, setImageUrl2] = useState('');

  useEffect(() => {
    // Helper function to check if the component is mounted
    let isMounted = true;

    const fetchData = async (imageRef, setImageFunction) => {
      try {
        const url = await getDownloadURL(ref(storage, imageRef));

        // Check if the component is still mounted before updating state
        if (isMounted) {
          setImageFunction(url);
        }
      } catch (error) {
        // Handle any errors
        console.error('Error getting download URL:', error);
      }
    };

    // Fetch data for each image
    fetchData('images/Hampi/DSC03594-12 copy1.jpg', setImageUrl);
    fetchData('images/Spiti Valley/DSC03179-1.webp', setImageUrl1);
    fetchData('images/Kinnaur/DSC06515-12.webp', setImageUrl2);

    // Cleanup function to set isMounted to false when the component unmounts
    return () => {
      isMounted = false;
    };
  }, []);
  
  return (
    <div className='blogSection' id='blog'>
      <h1>Travel Blog</h1>
      <div className='blogCards'>

        <div className='blogCard'>
          <div className='blogImage'>
            <img src={imageUrl} alt='' />
          </div>
          <div className='blogContent'>
            <h2>Hampi</h2>
            <p>Exploring the ancient ruins of Hampi is like stepping back in time to a world of grand temples and intricate sculptures.</p>
            <Link to='/travelblog/hampi'>Read More</Link>
          </div>
        </div>

        <div className='blogCard'>
          <div className='blogImage'>
            <img src={imageUrl1} alt='' />
          </div>
          <div className='blogContent'>
            <h2>Spiti Valley</h2>
            <p>Stunning Beauty of “SPITI VALLEY” The Land of Lamas, Land of Mysteries, Land of Himalayan Adventure!!</p>
            <Link to='/travelblog/spitiValley'>Read More</Link>
          </div>
        </div>

        <div className='blogCard'>
          <div className='blogImage'>
            <img src={imageUrl2} alt='' />
          </div>
          <div className='blogContent'>
            <h2>Kalpa</h2>
            <p>Kalpa is a small village in the Sutlej river valley, above Reckong Peo in the Kinnaur district of Himachal Pradesh, 
              Northern India.</p>
            <Link to='/travelblog/kalpa'>Read More</Link>
          </div>
        </div>
        {/* <div className='viewAllContainer'>
          <Link className='ViewAll' to='/travelblogs'>View All</Link>
        </div> */}
      </div>
    </div>
  );
}

export default Portfolio;