/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

import DashboardIcon from '@mui/icons-material/Dashboard';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userRegLogin } from '../../../reducers/userSlice';
import notify from '../reactToast/reactToast';
import './Header.css';

export default function UserOptions({ user }) {
    const dispatch = useDispatch();
    const history = useNavigate();

    const { cartItems } = useSelector((state) => state.cart);

    const actions = [
        { icon: <ListAltIcon />, name: 'Orders', func: orders },
        { icon: <PersonIcon />, name: 'Profile', func: account },
        {
            icon: <ShoppingCartIcon style={{ color: cartItems.length > 0 ? 'tomato' : 'unset' }} />,
            name: `Cart(${cartItems.length})`,
            func: cart,
        },
        { icon: <ExitToAppIcon />, name: 'Logout', func: logoutUser },
    ];
    if (user.user.role === 'admin') {
        actions.unshift({ icon: <DashboardIcon />, name: 'Dashbord', func: dashbord });
    }

    function dashbord() {
        history('/admin/dashboard');
    }
    function orders() {
        history('/orders');
    }

    function cart() {
        history('/cart');
    }

    function account() {
        history('/account');
    }
    function logoutUser() {
        dispatch(userRegLogin({ logout: 'logoutFunc' }));
        notify('Logout Successfully').success();
    }

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Backdrop open={open} style={{ zIndex: '10' }} />
            <SpeedDial
                className="speedDial"
                ariaLabel="SpeedDial controlled open example"
                sx={{ position: 'fixed', top: 25, right: 20, zIndex: 11 }}
                icon={<img className="speedDialIcon" src={user.user.avatar.url} alt="profile" />}
                onClose={handleClose}
                onOpen={handleOpen}
                open={open}
                direction="down"
            >
                {actions.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={action.func}
                        tooltipOpen
                    />
                ))}
            </SpeedDial>
        </>
    );
}
