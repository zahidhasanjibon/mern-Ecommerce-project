/* eslint-disable no-underscore-dangle */
/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import { CgMouse } from 'react-icons/cg';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, STATUSES } from '../../reducers/productsSlice';
import Loader from '../layout/loader/Loader';
import MetaData from '../layout/MetaData';
import './Home.css';
import ProductCard from './ProductCard';

function Home() {
    const { data, status } = useSelector((state) => state.products);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (status === STATUSES.LOADING) {
        return <Loader />;
    }
    if (status === STATUSES.ERROR) {
        return <h2 className="errorHeading">Error Occurs</h2>;
    }

    return (
        <>
            <MetaData title="ECOMMERCE" />
            <div className="banner">
                <p>Welcome to Ecommerce</p>
                <h1>FIND AMAZING PRODUCTS BELOW</h1>
                <a href="#container">
                    <button type="button">
                        Scroll <CgMouse />
                    </button>
                </a>
            </div>
            <h2 className="homeHeading">Features Products</h2>

            <div className="container" id="container">
                {data.products &&
                    data.products.map((product) => (
                        <ProductCard product={product} key={product._id} />
                    ))}
            </div>
        </>
    );
}

export default Home;
