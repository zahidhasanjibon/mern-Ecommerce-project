/* eslint-disable no-unused-expressions */
/* eslint-disable prettier/prettier */
import { Typography } from '@material-ui/core';
import { useEffect } from 'react';
import { Doughnut, Line } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { adminOrderssFunc } from '../../reducers/adminOrdersSlice';
import { adminProductsFunc } from '../../reducers/adminProductsSlice';
import { adminUsersFunc } from "../../reducers/adminUsersSlice";
import { STATUSES } from '../../reducers/productsSlice';
import Loader from '../layout/loader/Loader';
import MetaData from '../layout/MetaData';
import './Dashboard.css';
import Sidebar from './SideBar';



function Dashboard() {

    const dispatch = useDispatch()
    const {products,status} = useSelector((state) =>state.adminProducts )
    const {users,status:userStatus} = useSelector((state) =>state.adminUsers )
    const {orders,status:orderStatus} = useSelector((state) =>state.adminOrders )
    

     let outOfStock = 0

  products.products &&
    products.products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  let totalAmount = 0;
  orders.orders &&
    orders.orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

    const lineState = {
        labels: ['Initial Amount', 'Amount Earned'],
        datasets: [
            {
            
                label: 'TOTAL AMOUNT',
                pointBackgroundColor: ['tomato'],
                pointHoverBackgroundColor: ['rgb(197, 72, 49)'],
                data: [0, totalAmount],
            },
        ],
    };
    const doughnutState = {
        labels: ["Out of Stock", "InStock"],
        datasets: [
          {
            backgroundColor: ["#00A6B4", "#6800B4"],
            hoverBackgroundColor: ["#4B5000", "#35014F"],
            data: [outOfStock,products.products && products.products.length - outOfStock],
          },
        ],
      };

    useEffect(() => {
        dispatch(adminProductsFunc())
        dispatch(adminUsersFunc())
        dispatch(adminOrderssFunc())
    },[dispatch])

    
    if (status === STATUSES.LOADING || userStatus === STATUSES.LOADING || orderStatus === STATUSES.LOADING) {
        return <Loader />;
    }
    if (status === STATUSES.ERROR || userStatus === STATUSES.ERROR  || orderStatus === STATUSES.ERROR) {
        return <h2 className="errorHeading">Error Occurs</h2>;
    }

    return (
        <div className="dashboard">
            <MetaData title="Dashboard - Admin Panel" />
            <Sidebar />

            <div className="dashboardContainer">
                <Typography component="h1">Dashboard</Typography>

                <div className="dashboardSummary">
                    <div>
                        <p>
                            Total Amount <br /> ₹{totalAmount}
                        </p>
                    </div>
                    <div className="dashboardSummaryBox2">
                        <Link to="/admin/products">
                            <p>Product</p>
                            <p>{products.products && products.products.length}</p>
                        </Link>
                        <Link to="/admin/orders">
                            <p>Orders</p>
                            <p>{orders.orders && orders.orders.length}</p>
                        </Link>
                        <Link to="/admin/users">
                            <p>Users</p>
                            <p>{users.users && users.users.length}</p>
                        </Link>
                    </div>
                </div>

                <div className="lineChart">
                    <Line
                        data={lineState}
                    />
                </div>

                <div className="doughnutChart">
                    <Doughnut data={doughnutState} />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
