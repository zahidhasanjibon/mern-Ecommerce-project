import React from 'react';
import ReactStars from 'react-rating-stars-component';
import profileAvtar from '../../image/Profile.png';

function reviewCard({ review }) {
    const options = {
        edit: false,
        color: 'rgba(20,20,20,.1)',
        activeColor: 'tomato',
        size: window.innerWidth < 600 ? 20 : 25,
        value: review.rating,
        isHalf: true,
    };

    return (
        <div className="reviewCard">
            <img src={profileAvtar} alt="card" />
            <p>{review.name}</p>
            <ReactStars {...options} />
            <span>{review.comment}</span>
        </div>
    );
}

export default reviewCard;
