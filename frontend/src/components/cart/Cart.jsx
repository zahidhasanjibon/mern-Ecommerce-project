import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { Typography } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addToCart } from '../../reducers/cartSlice';
import MetaData from '../layout/MetaData';
import './Cart.css';
import CartItemCard from './CartItemCard';

function Cart() {
    const dispatch = useDispatch();
    const history = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);
    localStorage.setItem('cart', JSON.stringify(cartItems));

    const increaseQuantity = (item, quantity, stock) => {
        const newQty = quantity + 1;
        if (stock <= quantity) {
            return;
        }
        dispatch(addToCart({ ...item, quantity: newQty }));
    };
    const decreaseQuantity = (item, quantity) => {
        const newQty = quantity - 1;
        if (quantity <= 1) {
            return;
        }
        dispatch(addToCart({ ...item, quantity: newQty }));
    };

    const checkOuthandler = () => {
        history('/login?redirect=/shipping');
    };

    return (
        <>
            <MetaData title="Cart" />

            {cartItems.length === 0 ? (
                <div className="emptyCart">
                    <RemoveShoppingCartIcon />
                    <Typography>No Product</Typography>
                    <Link to="/products">View Products </Link>
                </div>
            ) : (
                <div className="cartPage">
                    <div className="cartHeader">
                        <p>Product</p>
                        <p>Quantity</p>
                        <p>Subtotal</p>
                    </div>

                    {cartItems &&
                        cartItems.map((item) => (
                            <div key={item.product} className="cartContainer">
                                <CartItemCard item={item} />
                                <div className="cartInput">
                                    <button
                                        onClick={() => decreaseQuantity(item, item.quantity)}
                                        type="button"
                                    >
                                        -
                                    </button>
                                    <input readOnly type="number" value={item.quantity} />
                                    <button
                                        onClick={() =>
                                            increaseQuantity(item, item.quantity, item.stock)
                                        }
                                        type="button"
                                    >
                                        +
                                    </button>
                                </div>
                                <p className="cartSubtotal">{`৳ ${item.price * item.quantity}`}</p>
                            </div>
                        ))}

                    <div className="cartGrossProfit">
                        <div />
                        <div className="cartGrossProfitBox">
                            <p>Gross Total</p>
                            <p>
                                ৳
                                {cartItems.reduce(
                                    (acc, curr) => acc + curr.price * curr.quantity,
                                    0
                                )}
                            </p>
                        </div>
                        <div />

                        <div className="checkOutBtn">
                            <button type="button" onClick={checkOuthandler}>
                                Check out
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Cart;
