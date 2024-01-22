import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faInstagram, faYoutube, faLinkedinIn, faXTwitter, faGithub } from '@fortawesome/free-brands-svg-icons'
import '../css/SocialMedia.css'
function socialMediaIcons() {

  return (

    <div  className='singlecol social-media-icons'>
      <a className='instagram-link' target='_blank' rel="noreferrer" href='https://www.instagram.com/hippiefarer'>
        <FontAwesomeIcon icon={faInstagram} />
      </a>
      <a className='youtube-link' target='_blank' rel="noreferrer" href='https://www.youtube.com/@hippiefarer'>
        <FontAwesomeIcon icon={faYoutube} />
      </a>
      <a className='twitter-link' target='_blank' rel="noreferrer" href="https://twitter.com/shubhjejurkar">
      <FontAwesomeIcon icon={faXTwitter} />
      </a>
      <a className='linkedin-link' target='_blank' rel="noreferrer" href='https://www.linkedin.com/in/shubham-jejurkar-1430201a2/'>
        <FontAwesomeIcon icon={faLinkedinIn} />
      </a>
    </div>

  )
}

export default socialMediaIcons
