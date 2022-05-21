/* eslint-disable no-unused-expressions */
import { Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { adminUsersFunc } from '../../reducers/adminUsersSlice';
import { STATUSES } from '../../reducers/productsSlice';
import Loader from '../layout/loader/Loader';
import MetaData from '../layout/MetaData';
import './ProductList.css';
import SideBar from './SideBar';

function UsersList() {
    const dispatch = useDispatch();
    const { status, users } = useSelector((state) => state.adminUsers);

    const deleteUserHandler = async (id) => {
        const res = await fetch(`/api/v1/admin/user/${id}`, {
            method: 'DELETE',
        });
        await res.json();

        dispatch(dispatch(adminUsersFunc()));
    };

    useEffect(() => {
        dispatch(adminUsersFunc());
    }, [dispatch]);

    const columns = [
        { field: 'id', headerName: 'User ID', minWidth: 180, flex: 0.8 },

        {
            field: 'email',
            headerName: 'Email',
            minWidth: 200,
            flex: 1,
        },
        {
            field: 'name',
            headerName: 'Name',
            minWidth: 150,
            flex: 0.5,
        },

        {
            field: 'role',
            headerName: 'Role',
            type: 'number',
            minWidth: 150,
            flex: 0.3,
            cellClassName: (params) => (params.row.role === 'admin' ? 'greenColor' : 'redColor'),
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
                    <Link to={`/admin/user/${params.row.id}`}>
                        <EditIcon />
                    </Link>

                    <Button onClick={() => deleteUserHandler(params.row.id)}>
                        <DeleteIcon />
                    </Button>
                </>
            ),
        },
    ];

    const rows = [];

    users.users &&
        users.users.forEach((item) => {
            rows.push({
                id: item._id,
                role: item.role,
                email: item.email,
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
            <MetaData title="ALL USERS - Admin" />

            <div className="dashboard">
                <SideBar />
                <div className="productListContainer">
                    <h1 id="productListHeading">ALL USERS</h1>

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

export default UsersList;
