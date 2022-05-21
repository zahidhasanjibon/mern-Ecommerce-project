/* eslint-disable no-unused-expressions */
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { DataGrid } from '@mui/x-data-grid';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { adminOrderssFunc } from '../../reducers/adminOrdersSlice';
import { STATUSES } from '../../reducers/productsSlice';
import Loader from '../layout/loader/Loader';
import MetaData from '../layout/MetaData';
import toast from '../layout/reactToast/reactToast';
import './ProductList.css';
import SideBar from './SideBar';

function OrderList() {
    const dispatch = useDispatch();

    const { orders, status } = useSelector((state) => state.adminOrders);

    const deleteOrderHandler = async (id) => {
        try {
            const res = await fetch(`/api/v1/admin/order/${id}`, {
                method: 'DELETE',
            });
            await res.json();
            toast('order deleted successfully').success();
            dispatch(adminOrderssFunc());
        } catch (error) {
            toast('order deleted failed').error();
        }
    };

    useEffect(() => {
        dispatch(adminOrderssFunc());
    }, [dispatch]);

    const columns = [
        { field: 'id', headerName: 'Order ID', minWidth: 300, flex: 1 },

        {
            field: 'status',
            headerName: 'Status',
            minWidth: 150,
            flex: 0.5,
            cellClassName: (params) =>
                params.row.status === 'Delivered' ? 'greenColor' : 'redColor',
        },
        {
            field: 'itemsQty',
            headerName: 'Items Qty',
            type: 'number',
            minWidth: 150,
            flex: 0.4,
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
                <>
                    <Link to={`/admin/order/${params.row.id}`}>
                        <EditIcon />
                    </Link>

                    <Button onClick={() => deleteOrderHandler(params.row.id)}>
                        <DeleteIcon />
                    </Button>
                </>
            ),
        },
    ];

    const rows = [];

    orders.orders &&
        orders.orders.forEach((item) => {
            rows.push({
                id: item._id,
                itemsQty: item.orderItems.length,
                amount: item.totalPrice,
                status: item.orderStatus,
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
            <MetaData title="ALL ORDERS - Admin" />

            <div className="dashboard">
                <SideBar />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL ORDERS</h1>

                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        disableSelectionOnClick
                        className="productListTable"
                        autoHeight
                    />
                </div>
            </div>
        </>
    );
}

export default OrderList;
