import {Link} from 'react-router-dom';
import React , {Children, useEffect, useState} from 'react';
import '../styles/company.css';

const CompanyDiv = ({company_name, company_image, company_text, company, children}) => {

    return(
        <div className="company-container"> 
            <div className="company-image-container">
                <img src={`/company/${company_image}.jpg`} alt="" className="company-img" style={{maxHeight: '100%', maxWidth: '100%'}}/>  
            </div>
            <div className="company-body">
                <div className="company-title">
                    <p>{company_name}</p>
                </div>
                <div className="company-text">
                    <p><p>{children}</p></p>
                </div>
                <div className="company-lower">
                    <Link to="/contact">
                        <button className="company-btn">Contact Us</button>
                    </Link>
                </div>
            </div>
            
        </div>
    );
};

export default CompanyDiv;

{/* <div className="company-lower">
                 <Link to={`/services/service/${service}`}>
                    <button className="company-btn-view">Learn More</button>
                </Link>
            </div> */}

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