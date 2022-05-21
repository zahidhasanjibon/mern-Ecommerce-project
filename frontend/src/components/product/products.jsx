/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable no-underscore-dangle */
import { Slider, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import Pagination from 'react-js-pagination';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchProducts, STATUSES } from '../../reducers/productsSlice';
import ProductCard from '../home/ProductCard';
import Loader from '../layout/loader/Loader';
import MetaData from '../layout/MetaData';
import ScrollToTop from '../layout/ScrollToTop';
import './Products.css';

const categories = [
    'All',
    'Laptop',
    'Footwear',
    'Bottom',
    'Shirts',
    'Attire',
    'Camera',
    'SmartPhones',
];

function Products() {
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 10000]);
    const [category, setCategory] = useState('');
    const [ratings, setRatings] = useState(0);

    const { keyword } = useParams();
    let resultPerPage;
    let productCount;
    const { data, status } = useSelector((state) => state.products);
    const dispatch = useDispatch();

    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    };
    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    };

    useEffect(() => {
        dispatch(fetchProducts({ keyword, currentPage, price, category, ratings }));
    }, [dispatch, keyword, currentPage, price, category, ratings]);

    if (status === STATUSES.LOADING) {
        return <Loader />;
    }
    if (status === STATUSES.ERROR) {
        return <h2 className="errorHeading">Error Occurs</h2>;
    }
    if (data) {
        resultPerPage = data.resultPerPage;
        productCount = data.filteredProductsCount;
    }
    return (
        <>
            <ScrollToTop />
            <MetaData title="PRODUCTS -- ECOMMERCE" />
            <div>
                <h2 className="productsHeading">Products</h2>
                <div className="products">
                    {data.products &&
                        data.products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                </div>
            </div>
            <div className="filterBox">
                <Typography className="priceHead">Price</Typography>
                <Slider
                    value={price}
                    onChange={priceHandler}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    min={0}
                    max={5000}
                />

                <Typography className="categoryHead">Categories</Typography>
                <ul className="categoryBox">
                    {categories.map((categ) => (
                        <li
                            className="category-link"
                            key={categ}
                            onClick={() => setCategory(categ)}
                        >
                            {categ}
                        </li>
                    ))}
                </ul>

                <fieldset className="ratingsBox">
                    <Typography component="legend">Rating</Typography>
                    <Slider
                        value={ratings}
                        onChange={(e, newRating) => setRatings(newRating)}
                        aria-labelledby="continuous-slider"
                        valueLabelDisplay="auto"
                        min={0}
                        max={5}
                    />
                </fieldset>
            </div>

            <div className="paginationBox">
                {data && resultPerPage < productCount && (
                    <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={resultPerPage}
                        totalItemsCount={productCount}
                        onChange={setCurrentPageNo}
                        nextPageText="Next"
                        prevPageText="Prev"
                        firstPageText="1st"
                        lastPageText="last"
                        itemClass="page-item"
                        linkClass="page-link"
                        activeClass="pageItemActive"
                        activeLinkClass="pageLinkActive"
                    />
                )}
            </div>
        </>
    );
}

export default Products;
