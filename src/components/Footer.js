import React from 'react';
import footerimage from '../assets/footer.jpg';
import footer_logo from '../assets/avishkarlogo.png';
import footer_certification from '../assets/footer_certification.jpg';
import phone from '../assets/phone.svg';
import address from '../assets/address.svg';
import email from '../assets/email.svg';

// style={{backgroundImage: `url(${footerimage})`}}
export const Footer = () => {
    return(
        <div className="footer">
            <div className="footer-logo">
                <img src={footer_logo} style={{maxHeight: '100px'}} />
            </div>

            <div className="footer-bottom">
                <div className="footer-certification">
                    <div className="footer-certification-logo">
                        <img src={footer_certification} style={{filter: 'opacity(100%)', zIndex: '1'}}/>
                    </div>

                    <div className="footer-certification-text">
                    Quality Management System Accreditation – wide range of applications from the metropolitan area to the most remote and challenging exploration sites in the harshest of environments throughout Australasia.
                    </div>
                </div>

                <div className="footer-contact">
                    <div className="footer-contact-heading">
                        <p>Contact Us</p>
                    </div>

                    <div className="footer-contact-details">
                        <ContactMethod/>
                    </div>
                </div>
            </div>

            <div className="copyright">
                <p>Copyright © 2019 CD Power. All Rights Reserved. </p>
            </div>
        </div>
    );
}

export const ContactMethod = (props) => {
    return(
        <div className={`contact-method ${props.styling}`}>
            <div className="footer-address-header">
                <span>
                    <img src={address} className="footer-icon"/>
                </span>
                <span>
                    <b style={{fontSize: '150%'}}>Head Office, XYZ</b> 
                    <br/>  <p style={{fontSize: '100%'}}>354 Cormack Road,<br/> Wingfield, SA 5013</p>
                </span>
            </div>
            <div className="footer-phone-header">
                <span>
                    <img src={phone} className="footer-icon"/>
                </span>
                <span>
                    <b style={{fontSize: '150%'}}>Phone</b> 
                    <br/> <p style={{fontSize: '100%'}}>1300 1300 13</p>
                </span>
            </div>
            <div className="footer-phone-header">
                <span>
                    <img src={email} className="footer-icon"/>
                </span>
                <span>
                    <b style={{fontSize: '150%'}}>Email</b> 
                    <br/> <p style={{fontSize: '100%'}}>emaIL@EMAIL.COM</p>
                </span>
            </div>
        </div>
    );
}