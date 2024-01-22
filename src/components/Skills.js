import React, { useEffect, useState, useRef } from 'react'
import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '../firebase/config'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLaptopCode, faCamera } from '@fortawesome/free-solid-svg-icons'
import '../css/Skills.css'
import AdobePhotoshopSvg from "../Adobe_Photoshop_CC_icon.svg"


function Skills() {
    const [imageUrl, setImageUrl] = useState('');

    useEffect(() => {
        // Reference to the image in Firebase Storage
        const imageRef = ref(storage, 'images/svg/pawel-czerwinski-uJBkaPZISIU-unsplash.jpg');

        // Get the download URL
        getDownloadURL(imageRef)
            .then((url) => {
                setImageUrl(url);
            })
            .catch((error) => {
                // Handle any errors
                console.error('Error getting download URL:', error);
            });

    }, []);
    return (
       
            <section id='skills'>
            {/* <img src={imageUrl} alt="" id='bgimg'/> */}
                <h1 className='skillTitle'>Services I offer!</h1>
                <div className='skillBars'>
                    <div className='skillBar'>
                        <FontAwesomeIcon icon={faCamera} />
                        <div className='skillBarText'>
                            <h1>Photography</h1>
                            <p>Capturing joyful moments and beautiful landscapes with a creative eye.</p>
                        </div>
                    </div>
                    <div className='skillBar'>
                        <FontAwesomeIcon icon={faLaptopCode} />
                        <div className='skillBarText'>
                            <h1>Web Development</h1>
                            <p>Building interactive and responsive web applications using React, HTML, CSS, and JavaScript.</p>
                        </div>
                    </div>
                    <div className='skillBar'>
                        <img className='PSsvg' src={AdobePhotoshopSvg} alt="Adobe Photoshop Logo" />
                        <div className='skillBarText'>
                            <h1>Adobe Photoshop</h1>
                            <p>Designing and editing graphics, and expertly post-processing images with Adobe Photoshop.</p>
                        </div>
                    </div>
                    
                </div>
            </section>
        
    );
}

export default Skills
