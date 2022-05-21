/* eslint-disable no-unused-expressions */
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Star from '@material-ui/icons/Star';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adminReviewsFunc } from '../../reducers/adminReviewsSlice';
import { STATUSES } from '../../reducers/productsSlice';
import Loader from '../layout/loader/Loader';
import MetaData from '../layout/MetaData';
import toast from '../layout/reactToast/reactToast';
import './Productreviews.css';
import SideBar from './SideBar';

function ProductReviews() {
    const dispatch = useDispatch();
    const { status, reviews } = useSelector((state) => state.adminReviews);
    const [productId, setProductId] = useState('');

    const deleteReviewHandler = async (reviewId) => {
        await dispatch(adminReviewsFunc({ productId, reviewId }));
        // await dispatch(adminReviewsFunc({ reset: 'to reset isSeleted' }));
        toast(`review deleted successfully`).success();
    };

    const productReviewsSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(adminReviewsFunc({ productId }));
    };

    useEffect(() => {
        if (productId.length === 24) {
            dispatch(adminReviewsFunc({ productId }));
        }
    }, [dispatch, productId]);

    const columns = [
        { field: 'id', headerName: 'Review ID', minWidth: 200, flex: 0.5 },

        {
            field: 'user',
            headerName: 'User',
            minWidth: 200,
            flex: 0.6,
        },

        {
            field: 'comment',
            headerName: 'Comment',
            minWidth: 350,
            flex: 1,
        },

        {
            field: 'rating',
            headerName: 'Rating',
            type: 'number',
            minWidth: 180,
            flex: 0.4,

            cellClassName: (params) => (params.row.rating >= 3 ? 'greenColor' : 'redColor'),
        },

        {
            field: 'actions',
            flex: 0.3,
            headerName: 'Actions',
            minWidth: 150,
            type: 'number',
            sortable: false,
            renderCell: (params) => (
                <Button onClick={() => deleteReviewHandler(params.row.id)}>
                    <DeleteIcon />
                </Button>
            ),
        },
    ];

    const rows = [];

    reviews &&
        reviews.forEach((item) => {
            rows.push({
                id: item._id,
                rating: item.rating,
                comment: item.comment,
                user: item.name,
            });
        });

    if (status === STATUSES.LOADING) {
        return <Loader />;
    }
    if (status === STATUSES.ERROR) {
        return <h2 className="errorHeading">Error Occurs</h2>;
    }

    return (
        <>
            <MetaData title="ALL REVIEWS - Admin" />

            <div className="dashboard">
                <SideBar />
                <div className="productReviewsContainer">
                    <form className="productReviewsForm" onSubmit={productReviewsSubmitHandler}>
                        <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>

                        <div>
                            <Star />
                            <input
                                type="text"
                                placeholder="Product Id"
                                required
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)}
                            />
                        </div>

                        <Button id="createProductBtn" type="submit">
                            Search
                        </Button>
                    </form>

                    {reviews && reviews.length > 0 ? (
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10]}
                            disableSelectionOnClick
                            className="productListTable"
                            autoHeight
                        />
                    ) : (
                        <h1 className="productReviewsFormHeading">No Reviews Found</h1>
                    )}
                </div>
            </div>
        </>
    );
}

export default ProductReviews;
