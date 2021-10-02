import React from 'react';
import productimg from '../assets/products/productheading.jpg';

import home_middle_img from '../assets/home_middle.jpg';


// import '../styles/home.css';
import '../styles/product.css';

export const Product = () => {
    return(
        <div>
            <ProductImage product_name="Product1"/>
            <AboutMiddle/> 
        </div>
    );
}
// `url(${productimg})`
// `url(${require('../assets/products/product.jpg')})`
const ProductImage = ({product_name}) => {
    return(
        <div className="product-header" style={{backgroundImage: `url(${productimg})`}}>
   
            <p className="product-text-big"> {product_name} </p>
        </div>
    );
}
// style={{transform: 'translateY(50%)'}}
const AboutMiddle = () => {
    return(
        <div className="product-middle">
            

            <div className="product-middle-text">
                <div>
                    <p style={{color: 'red', textAlign: 'left', fontSize: '200%', fontWeight: '700'}}>Product1</p>
                    <p style={{fontSize: '1.5vw', fontWeight: '400', textAlign: 'justify'}}>
                    <br/>
                    <b>At AE Power we are committed to providing the highest level of service and products to our client </b> <br/>across all industries. We specialize in commercial and industrial generators suitable for standby, prime or base load applications. Our generator systems are available as open or fully enclosed packaged systems, single or multiple units, stand-alone or fully integrated with hybrid and renewable energy solutions all backed by full service and support. We are committed to offering the complete solution to all of our customers nationwide.
                    <br/><b>highest level of service and products to our clients </b> <br/> across all industries. We specialize in commercial and industrial generators suitable for standby, prime or base load applications. Our generator systems are available as open or fully enclosed packaged systems, single or multiple units, stand-alone or fully integrated with hybrid and renewable energy solutions all backed by full service and support. We are committed to offering the complete solution to all of our customers nationwide.
                    At AE Power we are committed to providing the highest level of service and products to our clients, across all industries. We specialize in commercial and industrial generators suitable for standby, prime or base load applications. Our generator systems are available as open or fully enclosed packaged systems, single or multiple units, stand-alone or fully integrated with hybrid and renewable energy solutions all backed by full service and support. We are committed to offering the complete solution to all of our customers nationwide.
                    </p>
                </div>
            </div>

            <div className="product-middle-img">
                <img src="/products/product1.jpg"/>
            </div>
        </div>
    );
}

