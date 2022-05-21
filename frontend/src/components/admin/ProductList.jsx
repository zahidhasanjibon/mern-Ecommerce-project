/* eslint-disable no-unused-expressions */
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { adminDeleteProductFunc } from '../../reducers/adminDeleteProduct';
import { adminProductsFunc } from '../../reducers/adminProductsSlice';
import { STATUSES } from '../../reducers/productsSlice';
import Loader from '../layout/loader/Loader';
import MetaData from '../layout/MetaData';
import toast from '../layout/reactToast/reactToast';
import './ProductList.css';
import SideBar from './SideBar';

function ProductList() {
    const history = useNavigate();
    const dispatch = useDispatch();
    const { products, status } = useSelector((state) => state.adminProducts);
    const { status: deleteStatus, message } = useSelector((state) => state.adminDeleteProduct);
    const deleteProductHandler = (id) => {
        dispatch(adminDeleteProductFunc(id));
    };

    useEffect(() => {
        if (deleteStatus === STATUSES.IDLE && message.success) {
            toast(message.message).success();
            history('/admin/dashboard');
            dispatch(adminDeleteProductFunc());
        }
        if (deleteStatus === STATUSES.ERROR) {
            toast(message.error).error();
        }
        dispatch(adminProductsFunc());
    }, [dispatch, deleteStatus, message, history]);

    const columns = [
        { field: 'id', headerName: 'Product ID', minWidth: 200, flex: 0.5 },

        {
            field: 'name',
            headerName: 'Name',
            minWidth: 350,
            flex: 1,
        },
        {
            field: 'stock',
            headerName: 'Stock',
            type: 'number',
            minWidth: 150,
            flex: 0.3,
        },

        {
            field: 'price',
            headerName: 'Price',
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
                    <Link to={`/admin/product/${params.row.id}`}>
                        <EditIcon />
                    </Link>

                    <Button onClick={() => deleteProductHandler(params.row.id)}>
                        <DeleteIcon />
                    </Button>
                </>
            ),
        },
    ];

    const rows = [];

    products.products &&
        products.products.forEach((item) => {
            rows.push({
                id: item._id,
                stock: item.stock,
                price: item.price,
                name: item.name,
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
            <MetaData title="ALL PRODUCTS - Admin" />

            <div className="dashboard">
                <SideBar />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL PRODUCTS</h1>

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

export default ProductList;
