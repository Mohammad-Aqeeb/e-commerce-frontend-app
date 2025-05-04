import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./SingleProduct.css";

function SingleProduct({seletedProduct}) {

    console.log(seletedProduct);
    if (!seletedProduct) {
        return <div className="loading">Loading product...</div>;
    }

    return (
        <div className="single-product">
            <div className="product-image-container">
                <img src={seletedProduct.image} alt={seletedProduct.productName} className="product-image" />
            </div>
            <div className="product-details">
                <h1 className="product-title">{seletedProduct.productName}</h1>
                <p className="product-description">{seletedProduct.description}</p>
                <p className="product-price">${seletedProduct.price}</p>
                <button className="add-to-cart">Add to Cart</button>
            </div>
        </div>
    );
}

export default SingleProduct;
