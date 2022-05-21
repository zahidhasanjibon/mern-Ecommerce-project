/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { remove } from '../../reducers/cartSlice';
import './CartItemCard.css';

function CartItemCard({ item }) {
    const dispatch = useDispatch();
    return (
        <div className="CartItemCard">
            <img src={item.image} alt="item" />
            <div>
                <Link to={`/product/${item.product}`}>{item.name} </Link>
                <span>{`Price: ৳${item.price}`}</span>
                <p onClick={() => dispatch(remove(item))}>Remove</p>
            </div>
        </div>
    );
}

export default CartItemCard;
