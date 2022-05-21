/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-expressions */
import Typography from '@material-ui/core/Typography';
import LaunchIcon from '@material-ui/icons/Launch';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { myOrdersFunc } from '../../reducers/myOrdersSlice';
import Loader from '../layout/loader/Loader';
import MetaData from '../layout/MetaData';
import './MyOrder.css';

function MyOrders() {
    const dispatch = useDispatch();

    const { status, orders } = useSelector((state) => state.myOrders);
    const { user } = useSelector((state) => state.user);

    const columns = [
        { field: 'id', headerName: 'Order ID', minWidth: 300, flex: 1 },

        {
            field: 'status',
            headerName: 'Status',
            minWidth: 150,
            flex: 0.5,
            cellClassName: (params) =>
                // params.getValue(params.id, 'status') === 'Delivered' ? 'greenColor' : 'redColor',
                params.row.status === 'Delivered' ? 'greenColor' : 'redColor',
        },
        {
            field: 'itemsQty',
            headerName: 'Items Qty',
            type: 'number',
            minWidth: 150,
            flex: 0.3,
        },

        {
            field: 'amount',
            headerName: 'Amount',
            type: 'number',
            minWidth: 270,
            flex: 0.5,
        },

        {
            field: 'actions',
            flex: 0.3,
            headerName: 'Actions',
            minWidth: 150,
            type: 'number',
            sortable: false,
            renderCell: (params) => (
                <Link to={`/order/${params.row.id}`}>
                    <LaunchIcon />
                </Link>
            ),
        },
    ];
    const rows = [];

    orders.orders &&
        orders.orders.forEach((item) => {
            rows.push({
                itemsQty: item.orderItems.length,
                id: item._id,
                status: item.orderStatus,
                amount: item.totalPrice,
            });
        });

    useEffect(() => {
        dispatch(myOrdersFunc());
    }, [dispatch]);

    return (
        <>
            <MetaData title={`${user.user.name} - Orders`} />

            {status === 'loading' ? (
                <Loader />
            ) : (
                <div className="myOrdersPage">
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        disableSelectionOnClick
                        className="myOrdersTable"
                        autoHeight
                    />

                    <Typography id="myOrdersHeading">{user.user.name}'s' Orders</Typography>
                </div>
            )}
        </>
    );
}

export default MyOrders;
