import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, getTotal, increment, remove } from '../store/cartSlice';

function Cart() {
    const { products, totalPrice, totalItem } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const handleRemove = (id) => {
        dispatch(remove(id));
    };

    useEffect(() => {
        dispatch(getTotal());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products]);

    function handleDecr(product) {
        dispatch(decrement(product));
    }
    function handleIncr(product) {
        dispatch(increment(product));
    }

    return (
        <div className="container">
            <h3>Cart</h3>
            <h3>Total Products : {totalItem}</h3>
            <h3>Total Price : {totalPrice} </h3>
            <div className="cardWrapper">
                {products.map((pdt) => (
                    <div className="cartCard" key={Math.random() + Date.now()}>
                        <div className="product-cont cartItems">
                            <img src={pdt.image} alt="" />
                            <h5>{pdt.title}</h5>
                            <h5>{pdt.price}</h5>
                            <div className="btn-inc-dcr">
                                <button
                                    onClick={() => handleDecr(pdt)}
                                    type="button"
                                    className="btn"
                                >
                                    -
                                </button>
                                <h5>{pdt.quantity}</h5>
                                <button
                                    onClick={() => handleIncr(pdt)}
                                    type="button"
                                    className="btn"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <button
                            onClick={() => handleRemove(pdt.id)}
                            type="button"
                            className="btn removeBtn"
                        >
                            remove
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Cart;
