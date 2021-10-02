import React, {useEffect} from 'react';
import emailjs from 'emailjs-com';
import grid_big from '../assets/home-grid-big.jpg';

import { ContactMethod } from '../components/Footer';



// import '../styles/home.css';
import '../styles/contactform.css';
import '../styles/about.css';

export const Contact = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return(
        <div>
            <ContactImage/>
            <ContactMiddle/>
            
        </div>
    );
}

const ContactImage = () => {
    return(
        <div className="about-header" style={{backgroundImage: `url(${grid_big})` }}>
            <p className="about-text-big"> Contact Us </p>
        </div>
    );
}
// style={{transform: 'translateY(50%)'}}
const ContactMiddle = () => {
    return(
        <div className="contact-middle">
            <ContactForm/>
            <ContactMethod styling="contact-div"/>
        </div>
    );
}






 const ContactForm = () => {

  function sendEmail(e) {
    e.preventDefault();

    emailjs.sendForm('service_zkzdnps', 'template_3i7lmdm', e.target, 'user_lEfO8hIKRPWJCptAtxoiN')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });

      e.target.reset();
  }

  return (
      <>
      
    <form className="contact-form" onSubmit={sendEmail}>
      <div className="form-header"> <p>Contact Us</p> </div>
      <div className="form-field-smalls">
        <div className="form-field">
            <label>Name</label>
            <input className="input-field" type="text" name="from_name" />
        </div>
        <div className="form-field">
            <label>Phone</label>
            <input className="input-field" type="text" name="phone" />
        </div>
      </div>
      <div className="form-field">
        <label>Email</label>
        <input className="input-field" type="text" name="from_email" />
      </div>
      <div className="form-field-big">
        <label>Message</label>
        <textarea className="input-field" type="text" name="message" />
      </div>
      <div className="form-button">
        <input type="submit" value="Submit" />
      </div>
    </form>
    </>
  );
}


