import React, { useRef } from 'react'
import '../css/Contact2.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faWhatsapp, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { getDownloadURL, ref } from 'firebase/storage'
import { storage } from '../firebase/config'
import emailjs from '@emailjs/browser'
import SocialMedia from './SocialMedia'


function Contact2() {
    const formRef = useRef();


    const sendEmail = async (e) => {
        e.preventDefault();
        
        const formData = new FormData(formRef.current);
        const values = Object.fromEntries(formData.entries());
    
        // Check if any form field is empty
        if (Object.values(values).some(value => value.trim() === '')) {
          window.alert('Please fill out all the fields in the form.');
          return;
        }
        try {
            const result = await emailjs.sendForm('service_4531z5m', 'template_64wq6kb', formRef.current, 'SdbJXLsWjyqb5o7XV')

            // console.log(result.text);
            window.alert('Message sent successfully!');

            //clear the form after submit.
            formRef.current.reset();
        } catch (error) {
            console.log(error.text);
            window.alert('Error sending message. Please try again.');
        }
    };

    return (
        <div className="contactSection" id='contact'>
            <h1 className="contactHeading">Contact Me</h1>
            {/* <div className="border"></div> */}
            <div className='contact'>
                <div className='leftContent'>
                    <h2>Get in touch</h2>
                    <p className='titledesc'>Let's make something new, different and more meaningful.</p>

                    <div className='contactInfo'>

                        <div className="infoItem">
                            <div className='icon'>
                                <FontAwesomeIcon icon={faEnvelope} />
                            </div>
                            <div className='details'>
                                <span><b>Email</b></span>
                                <span>sjejurkar319@gmail.com</span>
                            </div>
                        </div>

                        <div className="infoItem">
                            <div className='icon'>
                                <FontAwesomeIcon icon={faPhone} />
                            </div>
                            <div className='details'>
                                <span><b>Mobile</b></span>
                                <span>+919527685876</span>
                            </div>
                        </div>

                        <div className="infoItem">
                            <div className='icon'>
                                <FontAwesomeIcon icon={faLocationDot} />
                            </div>
                            <div className='details'>
                                <span><b>Address</b></span>
                                <span>Nashik, India</span>
                            </div>
                        </div>

                    </div>

                    <div className='SocialMedia'>
                        <span>Find Me on</span>
                        <div className='icons'>
                        <a className="iconLink" target='_blank' rel="noreferrer" href='https://wa.me/9527685876?text=Hey,Shubham'>
                            <FontAwesomeIcon icon={faWhatsapp} />
                        </a>
                        <a className='iconLink' target='_blank' rel="noreferrer" href="https://github.com/ShubhamJejurkar98">
                            <FontAwesomeIcon icon={faGithub} />
                        </a>
                        <a className='iconLink' target='_blank' rel="noreferrer" href='https://www.linkedin.com/in/shubham-jejurkar-1430201a2/'>
        <FontAwesomeIcon icon={faLinkedinIn} />
      </a>
                        </div>
                    </div>
                </div>

                <div className='rightContent'>
                    <p>Please fill out the form to discuss any work.</p>
                    <form className="contactForm" ref={formRef} onSubmit={sendEmail}>
                        <input type="text" name='userName' className="contactFormText" placeholder="Your name" />
                        <input type="email" name='userEmail' className="contactFormText" placeholder="Your email" />
                        <input type="text" name='userPhone' className="contactFormText" placeholder="Your phone" />
                        <textarea name='message' className="contactFormText" placeholder="Your message"></textarea>
                        <button type="submit" className="contactFormBtn">Send Message</button>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Contact2