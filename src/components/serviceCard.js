import {Link} from 'react-router-dom';
import React , {useEffect, useState} from 'react';
import '../styles/card.css';

const Card = ({service_name, service_image, service_text, service}) => {

    

    return(
        <div className="mycard-container">
            <div className="mycard-image-container">
                <img src={`/service/${service_image}.jpg`} alt="" className="mycard-img" style={{maxHeight: '100%', maxWidth: '100%'}}/>  
            </div>
            <div className="mycard-title">
                <p>{service_name}</p>
            </div>
            <div className="mycard-body">
                <p><p>{service_text}</p></p>
            </div>
            <div className="mycard-lower">
                 <Link to={`/services/service/${service}`}>
                    <button className="mycard-btn-view">Learn More</button>
                </Link>
            </div>
        </div>
    );
};

export default Card;

// return(
//     <div className="col-sm mb-2">
//         <div className="card">
//             <div className="card-header">{product.name}</div>
//             <div className="card-body">
//                 <ShowImage item={product} url="product" myStyling="product-img"/>
//                 <p>{product.description && product.description.substring(0,20)}</p>
//                 <p>₹ {product.price}</p>
//                 {showProductQuantity()}
//                 <div>
//                 <Link to={`/product/view/${product._id}`}>
//                     <button className="btn btn-outline-primary mt-2 bt-2 mr-2">View</button>
//                 </Link>
//                 <button className="btn btn-outline-warning mt-2 bt-2">Add to Cart</button>
//                 </div>
//             </div>
//         </div>
//     </div>
//     );