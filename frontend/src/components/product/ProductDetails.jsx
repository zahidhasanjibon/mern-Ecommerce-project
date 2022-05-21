/* eslint-disable no-unused-expressions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-array-index-key */
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core';
import Rating from '@mui/material/Rating';
import React, { useEffect, useState } from 'react';
import Carousel from 'react-material-ui-carousel';
import ReactStars from 'react-rating-stars-component';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addToCart } from '../../reducers/cartSlice';
import { STATUSES } from '../../reducers/productsSlice';
import { newReviewsFunc } from '../../reducers/reviewsSlice';
import { getProductDetails } from '../../reducers/singleProductSlice';
import Loader from '../layout/loader/Loader';
import MetaData from '../layout/MetaData';
import toast from '../layout/reactToast/reactToast';
import './ProductDetails.css';
import ReviewCard from './reviewCard';

function ProductDetails() {
    const { id } = useParams();
    const { data, status } = useSelector((state) => state.singleProductDetails);
    const { status: revStatus, message } = useSelector((state) => state.reviews);
    const { cartItems } = useSelector((state) => state.cart);
    localStorage.setItem('cart', JSON.stringify(cartItems));

    const dispatch = useDispatch();

    const [quantity, setQuantity] = useState(1);
    const [open, setOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const submitReviewToggle = () => {
        open ? setOpen(false) : setOpen(true);
    };
    const reviewSubmitHandler = async () => {
        const myForm = new FormData();

        myForm.set('rating', rating);
        myForm.set('comment', comment);
        myForm.set('productId', id);

        await dispatch(newReviewsFunc({ myForm }));
        dispatch(newReviewsFunc({ reset: 'to reset success' }));
        setOpen(false);
    };

    const increaseQuantity = () => {
        if (data.product.stock <= quantity) return;
        const qty = quantity + 1;
        setQuantity(qty);
    };

    const decreaseQuantity = () => {
        if (quantity <= 1) return;
        const qty = quantity - 1;
        setQuantity(qty);
    };

    const addToCartFunction = () => {
        dispatch(
            addToCart({
                product: data.product._id,
                name: data.product.name,
                price: data.product.price,
                image: data.product.images[0].url,
                stock: data.product.stock,
                quantity,
            })
        );
        toast('item added to Cart').success();
    };

    useEffect(() => {
        dispatch(getProductDetails(id));
        if (revStatus === STATUSES.IDLE && message.success) {
            toast(`reviews submitted successfully`).success();
        }
        if (revStatus === STATUSES.ERROR && !message.success) {
            toast(`reviews submitted failed`).error();
        }
    }, [dispatch, id, revStatus, message]);

    if (status === STATUSES.LOADING) {
        return <Loader />;
    }
    if (status === STATUSES.ERROR) {
        return <h2 className="errorHeading">Error Occurs</h2>;
    }
    const options = {
        edit: false,
        color: 'rgba(20,20,20,.1)',
        activeColor: 'tomato',
        size: window.innerWidth < 600 ? 20 : 25,
        value: data.product.ratings ? data.product.ratings : 0,
        isHalf: true,
    };

    return (
        <>
            <MetaData title={`${data.product.name} -- ECOMMEREC`} />
            <div className="productDetails">
                <div>
                    <Carousel>
                        {data.product &&
                            data.product.images.map((item, i) => (
                                <img
                                    className="CarouselImage"
                                    key={i}
                                    src={item.url}
                                    alt={`${i} Slide`}
                                />
                            ))}
                    </Carousel>
                </div>
                <div>
                    <div className="detailsBlock-1">
                        <h2>{data.product.name}</h2>
                        <p>Product # {data.product._id}</p>
                    </div>
                    <div className="detailsBlock-2">
                        <ReactStars {...options} />
                        <span> ({data.product.numOfReviews}) Reviews</span>
                    </div>

                    <div className="detailsBlock-3">
                        <h1>{`৳ ${data.product.price}`}</h1>
                        <div className="detailsBlock-3-1">
                            <div className="detailsBlock-3-1-1">
                                <button type="button" onClick={decreaseQuantity}>
                                    -
                                </button>
                                <input readOnly type="number" value={quantity} />
                                <button type="button" onClick={increaseQuantity}>
                                    +
                                </button>
                            </div>
                            <button
                                onClick={addToCartFunction}
                                type="button"
                                disabled={data.product.stock < 1}
                            >
                                Add to Cart
                            </button>
                        </div>
                        <p>
                            Status : &nbsp;
                            <b className={data.product.stock < 1 ? 'redColor' : 'greenColor'}>
                                {data.product.stock < 1 ? 'OutOfStock' : 'InStock'}
                            </b>
                        </p>
                    </div>
                    <div className="detailsBlock-4">
                        Description : <p>{data.product.description}</p>
                    </div>
                    <button
                        type="button"
                        onClick={() => submitReviewToggle()}
                        className="submitReview"
                    >
                        Submit Review
                    </button>
                </div>
            </div>

            <h3 className="reviewsHeading">REVIEWS</h3>

            <Dialog aria-labelledby="simple-dialog-title" open={open} onClose={submitReviewToggle}>
                <DialogTitle>Submit Review</DialogTitle>
                <DialogContent className="submitDialog">
                    <Rating
                        onChange={(e) => setRating(e.target.value)}
                        value={rating}
                        size="large"
                    />

                    <textarea
                        className="submitDialogTextArea"
                        cols="30"
                        rows="5"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={submitReviewToggle} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={reviewSubmitHandler} color="primary">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>

            {data.product.reviews && data.product.reviews[0] ? (
                <div className="reviews">
                    {data.product.reviews.map((review, i) => (
                        <ReviewCard review={review} key={i} />
                    ))}
                </div>
            ) : (
                <p className="noReviews">No Review yet</p>
            )}
        </>
    );
}

export default ProductDetails;
