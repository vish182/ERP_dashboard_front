import React, {useEffect} from 'react';
import grid_big from '../assets/home-grid-big.jpg';

import home_middle_img from '../assets/home_middle.jpg';


// import '../styles/home.css';
import '../styles/about.css';

export const AboutUs = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return(
        <div>
            <AboutImage/>
            <AboutMiddle/> 
        </div>
    );
}

const AboutImage = () => {
    return(
        <div className="about-header" style={{backgroundImage: `url(${grid_big})` }}>
            <p className="about-text-big"> About Us </p>
        </div>
    );
}
// style={{transform: 'translateY(50%)'}}
const AboutMiddle = () => {
    return(
        <div className="about-middle">
            <div className="about-middle-img">
                <img src={home_middle_img}/>
            </div>

            <div className="about-middle-text">
                <div>
                    <p className="about-middle-text-big">Title</p>
                    <p className="about-middle-text-small">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pellentesque ultricies aliquam. Morbi sed dui felis. Nulla viverra lacus sem, et finibus ipsum pretium vitae. Etiam eu dolor in magna tempor pharetra et mattis metus. Praesent vehicula leo quis sem mattis, sit amet iaculis mauris hendrerit. Sed vehicula placerat magna, a iaculis augue semper vel.
                    At AE Power we are committed to providing the highest level of service and products to our clients, across all industries. We specialize in commercial and industrial generators suitable for standby, prime or base load applications. Our generator systems are available as open or fully enclosed packaged systems, single or multiple units, stand-alone or fully integrated with hybrid and renewable energy solutions all backed by full service and support. We are committed to offering the complete solution to all of our customers nationwide.
                    At AE Power we are committed to providing the highest level of service and products to our clients, across all industries. We specialize in commercial and industrial generators suitable for standby, prime or base load applications. Our generator systems are available as open or fully enclosed packaged systems, single or multiple units, stand-alone or fully integrated with hybrid and renewable energy solutions all backed by full service and support. We are committed to offering the complete solution to all of our customers nationwide.
                    </p>
                </div>
            </div>
        </div>
    );
}

