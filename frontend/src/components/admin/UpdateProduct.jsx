/* eslint-disable no-return-await */
/* eslint-disable react/no-array-index-key */
import { Button } from '@material-ui/core';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import DescriptionIcon from '@material-ui/icons/Description';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import StorageIcon from '@material-ui/icons/Storage';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { adminUpdateProductFunc } from '../../reducers/adminUpdateProduct';
import { STATUSES } from '../../reducers/productsSlice';
import MetaData from '../layout/MetaData';
import toast from '../layout/reactToast/reactToast';
import SideBar from './SideBar';

function UpdateProduct() {
    const dispatch = useDispatch();
    const { id } = useParams();

    const updateBtn = useRef(null);
    const { product, status } = useSelector((state) => state.adminUpdateProduct);

    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

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

    useEffect(() => {
        const fetchProduct = async () => {
            const url = `/api/v1/product/${id}`;
            return await axios.get(url).then((res) => res.data);
        };
        fetchProduct().then((data) => {
            setName(data.product.name);
            setDescription(data.product.description);
            setPrice(data.product.price);
            setCategory(data.product.category);
            setStock(data.product.stock);
            setOldImages(data.product.images);
        });
    }, [id]);

    useEffect(() => {
        if (status === STATUSES.IDLE && product.success !== 'reset') {
            toast(`product updated successfully`).success();
        }
        if (status === STATUSES.IDLE && !product.success) {
            toast(`product updated failed`).error();
        }
    }, [status, product]);

    const updateProductSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            updateBtn.current.disabled = true;
            const updateProductData = {
                name,
                price,
                description,
                category,
                stock,
                images,
            };
            await dispatch(adminUpdateProductFunc({ id, updateProductData }));
            await dispatch(adminUpdateProductFunc({ reset: 'to reset success' }));

            updateBtn.current.disabled = false;
        } catch (error) {
            toast(`update product failed`).error();
            updateBtn.current.disabled = false;
        }
    };

    const updateProductImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);
        setOldImages([]);

        files.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImagesPreview((old) => [...old, reader.result]);
                    setImages((old) => [...old, reader.result]);
                }
            };

            reader.readAsDataURL(file);
        });
    };

    // if (status === STATUSES.LOADING) {
    //     return <Loader />;
    // }
    if (status === STATUSES.ERROR) {
        return <h2 className="errorHeading">Error Occurs</h2>;
    }

    return (
        <>
            <MetaData title="Create Product" />
            <div className="dashboard">
                <SideBar />
                <div className="newProductContainer">
                    <form
                        className="createProductForm"
                        encType="multipart/form-data"
                        onSubmit={updateProductSubmitHandler}
                    >
                        <h1>Create Product</h1>

                        <div>
                            <SpellcheckIcon />
                            <input
                                type="text"
                                placeholder="Product Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <AttachMoneyIcon />
                            <input
                                type="number"
                                placeholder="Price"
                                required
                                onChange={(e) => setPrice(e.target.value)}
                                value={price}
                            />
                        </div>

                        <div>
                            <DescriptionIcon />

                            <textarea
                                placeholder="Product Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                cols="30"
                                rows="1"
                            />
                        </div>

                        <div>
                            <AccountTreeIcon />
                            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Choose Category</option>
                                {categories.map((cate) => (
                                    <option key={cate} value={cate}>
                                        {cate}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <StorageIcon />
                            <input
                                type="number"
                                placeholder="Stock"
                                required
                                onChange={(e) => setStock(e.target.value)}
                                value={stock}
                            />
                        </div>

                        <div id="createProductFormFile">
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={updateProductImagesChange}
                                multiple
                            />
                        </div>

                        <div id="createProductFormImage">
                            {oldImages &&
                                oldImages.map((image, index) => (
                                    <img key={index} src={image.url} alt="Old Product Preview" />
                                ))}
                        </div>

                        <div id="createProductFormImage">
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt="Product Preview" />
                            ))}
                        </div>

                        <Button ref={updateBtn} id="createProductBtn" type="submit">
                            Update
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default UpdateProduct;
