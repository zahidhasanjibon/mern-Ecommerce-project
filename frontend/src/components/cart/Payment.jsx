import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventIcon from '@mui/icons-material/Event';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { Typography } from '@mui/material';
import {
    CardCvcElement,
    CardExpiryElement,
    CardNumberElement,
    useElements,
    // eslint-disable-next-line prettier/prettier
    useStripe
} from '@stripe/react-stripe-js';
import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { newOrderFunc } from '../../reducers/orderSlice';
import MetaData from '../layout/MetaData';
import notify from '../layout/reactToast/reactToast';
import CheckoutSteps from './checkoutSteps';
import './Payment.css';

function Payment() {
    const history = useNavigate();
    const dispatch = useDispatch();
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const payBtn = useRef(null);
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));
    const elements = useElements();
    const stripe = useStripe();

    if (!orderInfo) {
        return <h2 className="errorHeading">first order items</h2>;
    }

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
    };
    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice,
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        payBtn.current.disabled = true;

        try {
            const res = await fetch('/api/v1/payment/process', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(paymentData),
            });
            const data = await res.json();
            // eslint-disable-next-line camelcase
            const { client_secret } = data;

            if (!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.user.name,
                        email: user.user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pinCode,
                            country: shippingInfo.country,
                        },
                    },
                },
            });

            if (result.error) {
                payBtn.current.disabled = false;
                notify(result.error.message).error();
            } else if (result.paymentIntent.status === 'succeeded') {
                order.paymentInfo = {
                    id: result.paymentIntent.id,
                    status: result.paymentIntent.status,
                };
                dispatch(newOrderFunc(order));

                history('/success');
            } else {
                notify('there was some issue with payment').error();
            }
        } catch (error) {
            notify(error).error();
            payBtn.current.disabled = false;
        }
    };

    return (
        <>
            <MetaData title="Payment" />
            <CheckoutSteps activeStep={2} />
            <div className="paymentContainer">
                <form className="paymentForm" onSubmit={(e) => submitHandler(e)}>
                    <Typography>Card Info</Typography>
                    <div>
                        <CreditCardIcon />
                        <CardNumberElement className="paymentInput" />
                    </div>
                    <div>
                        <EventIcon />
                        <CardExpiryElement className="paymentInput" />
                    </div>
                    <div>
                        <VpnKeyIcon />
                        <CardCvcElement className="paymentInput" />
                    </div>

                    <input
                        type="submit"
                        value={`Pay - ৳ ${orderInfo && orderInfo.totalPrice}`}
                        ref={payBtn}
                        className="paymentFormBtn"
                    />
                </form>
            </div>
        </>
    );
}

export default Payment;
