/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import ReactStars from 'react-rating-stars-component';
import { Link } from 'react-router-dom';

function productCard({ product }) {
    const options = {
        edit: false,
        color: 'rgba(20,20,20,.1)',
        activeColor: 'tomato',
        size: window.innerWidth < 600 ? 20 : 25,
        value: product.ratings,
        isHalf: true,
    };

    return (
        <Link className="productCard" to={`/product/${product._id}`}>
            <img src={product.images.length > 0 ? product.images[0].url : null} alt="pro" />
            <p>{product.name}</p>
            <div>
                <ReactStars {...options} />
                <span>({product.numOfReviews}Reviews)</span>
            </div>
            <span>{`৳ ${product.price}`}</span>
        </Link>
    );
}

export default productCard;
