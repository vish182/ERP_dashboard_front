import React, {useEffect} from 'react';
import productimg from '../assets/products/productheading.jpg';
import Card from '../components/serviceCard';

import home_middle_img from '../assets/home_middle.jpg';


// import '../styles/home.css';
import '../styles/product.css';
import '../styles/services.css';

export const Services = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return(
        <div>
            <ServiceImage product_name="Product1"/>
            <ServiceMiddle/> 
        </div>
    );
}
// `url(${productimg})`
// `url(${require('../assets/products/product.jpg')})`
const ServiceImage = () => {
    return(
        <div className="product-header" style={{backgroundImage: `url(${productimg})`}}>
   
            <p className="product-text-big"> Services </p>
        </div>
    );
}
// style={{transform: 'translateY(50%)'}}
const ServiceMiddle = () => {
    return(
        
        <div className="product-middle">
            {console.log("service")}
            <div className="product-middle-text">
                <div>
                    <p className="product-middle-text-big">Services</p>
                    <p className="product-middle-text-small">
                    <br/>
                    <b>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pellentesque ultricies aliquam. </b> <br/>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pellentesque ultricies aliquam.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pellentesque ultricies aliquam.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pellentesque ultricies aliquam.
                    <br/><b>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pellentesque ultricies aliquam. </b> <br/> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pellentesque ultricies aliquam.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pellentesque ultricies aliquam.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pellentesque ultricies aliquam.
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pellentesque ultricies aliquam.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pellentesque ultricies aliquam.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pellentesque ultricies aliquam.
                    </p>
                </div>
            </div>

            <div className="services-middle">

                <Card service_image="service1" service_name="Service1" service="service1"
                      service_text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pellentesque ultricies aliquam."/>
                
                <Card service_image="service2" service_name="Service2" service="service2"
                      service_text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pellentesque ultricies aliquam."/>
                
                <Card service_image="service3" service_name="Service3" service="service3"
                      service_text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla pellentesque ultricies aliquam."/>

            </div>

            
        </div>
    );
}

{/* <div className="product-middle-img">
    <img src="/products/product1.jpg"/>
</div> */}



