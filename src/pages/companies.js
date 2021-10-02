import React, {useEffect} from 'react';
import grid_big from '../assets/home-grid-big.jpg';

import home_middle_img from '../assets/home_middle.jpg';


// import '../styles/home.css';
import '../styles/about.css';
import '../styles/companies.css';
import CompanyDiv from '../components/company.js';

export const Companies = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return(
        <div>
            <CompanyPageImage/>
            <CompanyDiv company_name="Company1" company_image="company1" >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pellentesque ultricies aliquam.
                units for a wide range of applications from the metropolitan area to the most remote and challenging exploration 
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pellentesque ultricies aliquam.Lorem ipsum dolor sit amet, 
                consectetur adipiscing elit. Nulla pellentesque ultricies aliquam.
            </CompanyDiv>

            <CompanyDiv company_name="Company2" company_image="company2" >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pellentesque ultricies aliquam.
                units for a wide range of applications from the metropolitan area to the most remote and challenging exploration 
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pellentesque ultricies aliquam.Lorem ipsum dolor sit amet, 
                consectetur adipiscing elit. Nulla pellentesque ultricies aliquam.
            </CompanyDiv>

            <CompanyDiv company_name="Our Products" company_image="avlogo" >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pellentesque ultricies aliquam.
                units for a wide range of applications from the metropolitan area to the most remote and challenging exploration 
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pellentesque ultricies aliquam.Lorem ipsum dolor sit amet, 
                consectetur adipiscing elit. Nulla pellentesque ultricies aliquam.
            </CompanyDiv>
            {/* <AboutMiddle/>  */}
        </div>
    );
}

const CompanyPageImage = () => {
    return(
        <div className="about-header" style={{backgroundImage: `url(${grid_big})` }}>
            <p className="about-text-big"> Our Partners </p>
        </div>
    );
}
// style={{transform: 'translateY(50%)'}}


