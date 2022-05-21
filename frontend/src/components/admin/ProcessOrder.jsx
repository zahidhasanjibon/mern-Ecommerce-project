import { Button, Typography } from '@material-ui/core';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { orderDetailsFunc } from '../../reducers/orderDetailsSlice';
import { STATUSES } from '../../reducers/productsSlice';
import Loader from '../layout/loader/Loader';
import MetaData from '../layout/MetaData';
import toast from '../layout/reactToast/reactToast';
import './ProcessOrder.css';
import SideBar from './SideBar';

function ProcessOrder() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const history = useNavigate();
    const { order, status: orderStatus } = useSelector((state) => state.orderDetails);
    const [status, setStatus] = useState('');

    const updateOrderSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const myForm = new FormData();

            myForm.set('status', status);
            const url = `/api/v1/admin/order/${id}`;
            const config = { headers: { 'Content-Type': 'multipart/form-data' } };
            const res = await fetch(url, {
                method: 'put',
                config,
                body: myForm,
            });
            await res.json();
            toast('status updated successfully').success();
            history('/admin/orders');
        } catch (error) {
            toast('status updated failed').error();
        }
    };

    useEffect(() => {
        dispatch(orderDetailsFunc(id));
    }, [dispatch, id]);

    if (orderStatus === STATUSES.ERROR) {
        return <h2 className="errorHeading">Error Occurs</h2>;
    }

    return (
        <>
            <MetaData title="Process Order" />
            <div className="dashboard">
                <SideBar />
                <div className="newProductContainer">
                    {orderStatus === STATUSES.LOADING ? (
                        <Loader />
                    ) : (
                        <div
                            className="confirmOrderPage"
                            style={{
                                display: order.orderStatus === 'Delivered' ? 'block' : 'grid',
                            }}
                        >
                            <div>
                                <div className="confirmshippingArea">
                                    <Typography>Shipping Info</Typography>
                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p>Name:</p>
                                            <span>{order.user && order.user.name}</span>
                                        </div>
                                        <div>
                                            <p>Phone:</p>
                                            <span>
                                                {order.shippingInfo && order.shippingInfo.phoneNo}
                                            </span>
                                        </div>
                                        <div>
                                            <p>Address:</p>
                                            <span>
                                                {order.shippingInfo &&
                                                    `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                                            </span>
                                        </div>
                                    </div>

                                    <Typography>Payment</Typography>
                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p
                                                className={
                                                    order.paymentInfo &&
                                                    order.paymentInfo.status === 'succeeded'
                                                        ? 'greenColor'
                                                        : 'redColor'
                                                }
                                            >
                                                {order.paymentInfo &&
                                                order.paymentInfo.status === 'succeeded'
                                                    ? 'PAID'
                                                    : 'NOT PAID'}
                                            </p>
                                        </div>

                                        <div>
                                            <p>Amount:</p>
                                            <span>{order.totalPrice && order.totalPrice}</span>
                                        </div>
                                    </div>

                                    <Typography>Order Status</Typography>
                                    <div className="orderDetailsContainerBox">
                                        <div>
                                            <p
                                                className={
                                                    order.orderStatus &&
                                                    order.orderStatus === 'Delivered'
                                                        ? 'greenColor'
                                                        : 'redColor'
                                                }
                                            >
                                                {order.orderStatus && order.orderStatus}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="confirmCartItems">
                                    <Typography>Your Cart Items:</Typography>
                                    <div className="confirmCartItemsContainer">
                                        {order.orderItems &&
                                            order.orderItems.map((item) => (
                                                <div key={item.product}>
                                                    <img src={item.image} alt="Product" />
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>{' '}
                                                    <span>
                                                        {item.quantity} X ₹{item.price} =
                                                        <b>₹{item.price * item.quantity}</b>
                                                    </span>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            </div>

                            <div
                                style={{
                                    display: order.orderStatus === 'Delivered' ? 'none' : 'block',
                                }}
                            >
                                <form
                                    className="updateOrderForm"
                                    onSubmit={updateOrderSubmitHandler}
                                >
                                    <h1>Process Order</h1>

                                    <div>
                                        <AccountTreeIcon />
                                        <select onChange={(e) => setStatus(e.target.value)}>
                                            <option value="">Choose Category</option>
                                            {order.orderStatus === 'processing' && (
                                                <option value="Shipped">Shipped</option>
                                            )}

                                            {order.orderStatus === 'Shipped' && (
                                                <option value="Delivered">Delivered</option>
                                            )}
                                        </select>
                                    </div>

                                    <Button id="createProductBtn" type="submit">
                                        Process
                                    </Button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

export default ProcessOrder;
