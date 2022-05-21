import { Typography } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { emptyCart } from '../../reducers/cartSlice';
import './orderSuccess.css';

function OrderSuccess() {
    const dispatch = useDispatch();
    localStorage.removeItem('cart');
    localStorage.removeItem('shippingInfo');
    dispatch(emptyCart());
    return (
        <div className="orderSuccess">
            <CheckCircleIcon />

            <Typography>Your Order has been Placed successfully </Typography>
            <Link to="/orders">View Orders</Link>
        </div>
    );
}

export default OrderSuccess;
