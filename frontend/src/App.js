import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import webFont from 'webfontloader';
import './app.css';
import Dashboard from './components/admin/Dashboard';
import NewProduct from './components/admin/NewProduct';
import OrderList from './components/admin/OrderList';
import ProcessOrder from './components/admin/ProcessOrder';
import ProductList from './components/admin/ProductList';
import ProductReviews from './components/admin/ProductReviews';
import UpdateProduct from './components/admin/UpdateProduct';
import UpdateUser from './components/admin/UpdateUser';
import UsersList from './components/admin/UsersList';
import Cart from './components/cart/Cart';
import ConfirmOrder from './components/cart/ConfirmOrder';
import OrderSuccess from './components/cart/OrdersSuccess';
import Payment from './components/cart/Payment';
import Shipping from './components/cart/Shipping';
import Home from './components/home/Home';
import About from './components/layout/about/About';
import Contact from './components/layout/contact/Contact';
import Footer from './components/layout/footer/Footer';
import Header from './components/layout/header/Header';
import UserOptions from './components/layout/header/UserOptions';
import NotFound from './components/layout/notFound/NotFound';
import ScrollToTop from './components/layout/ScrollToTop';
import MyOrder from './components/order/MyOrder';
import OrderDetails from './components/order/OrderDetails';
import ProductDetails from './components/product/ProductDetails';
import Products from './components/product/products';
import Search from './components/product/Search';
import PrivateRoute from './components/route/PrivateRoute';
import ForgotPassword from './components/user/ForgotPassword';
import LoginSignup from './components/user/LoginSignup';
import Profile from './components/user/Profile';
import Resetpassword from './components/user/Resetpassword';
import UpdatePassword from './components/user/UpdatePassword';
import UpdateProfile from './components/user/UpdateProfile';
import { userRegLogin } from './reducers/userSlice';
import store from './store';

function App() {
    const { user, isAuthenticate } = useSelector((state) => state.user);
    const [stripeApiKey, setStripeApiKey] = useState('');
    async function getStripeAPiKey() {
        const res = await fetch('/api/v1/stripeapikey');
        const data = await res.json();
        setStripeApiKey(data.stripeApiKey);
    }

    useEffect(() => {
        webFont.load({
            google: {
                families: ['Roboto', 'Droid Sans', 'Chilanka'],
            },
        });
        store.dispatch(userRegLogin({}));
        getStripeAPiKey();
    }, []);
    window.addEventListener('contextmenu', (e) => e.preventDefault());
    return (
        <Router>
            <ScrollToTop />
            <Header />

            {isAuthenticate && <UserOptions user={user} />}

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:keyword" element={<Products />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/search" element={<Search />} />
                <Route path="/login" element={<LoginSignup />} />
                <Route
                    path="/account"
                    element={
                        <PrivateRoute>
                            <Profile />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/me/update"
                    element={
                        <PrivateRoute>
                            <UpdateProfile />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/password/update"
                    element={
                        <PrivateRoute>
                            <UpdatePassword />
                        </PrivateRoute>
                    }
                />
                <Route path="/password/forgot" element={<ForgotPassword />} />
                <Route path="/password/reset/:token" element={<Resetpassword />} />
                <Route path="/cart" element={<Cart />} />
                <Route
                    path="/shipping"
                    element={
                        <PrivateRoute>
                            <Shipping />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/order/confirm"
                    element={
                        <PrivateRoute>
                            <ConfirmOrder />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/success"
                    element={
                        <PrivateRoute>
                            <OrderSuccess />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/orders"
                    element={
                        <PrivateRoute>
                            <MyOrder />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/order/:id"
                    element={
                        <PrivateRoute>
                            <OrderDetails />
                        </PrivateRoute>
                    }
                />
                {stripeApiKey && (
                    <Route
                        path="/process/payment"
                        element={
                            <Elements stripe={loadStripe(stripeApiKey)}>
                                <PrivateRoute>
                                    <Payment />
                                </PrivateRoute>
                            </Elements>
                        }
                    />
                )}
                <Route
                    path="/admin/dashboard"
                    element={isAuthenticate ? <Dashboard /> : <LoginSignup />}
                />
                <Route
                    path="/admin/products"
                    element={isAuthenticate ? <ProductList /> : <LoginSignup />}
                />
                <Route
                    path="/admin/product"
                    element={isAuthenticate ? <NewProduct /> : <LoginSignup />}
                />
                <Route
                    path="/admin/product/:id"
                    element={isAuthenticate ? <UpdateProduct /> : <LoginSignup />}
                />
                <Route
                    path="/admin/orders"
                    element={isAuthenticate ? <OrderList /> : <LoginSignup />}
                />
                <Route
                    path="/admin/order/:id"
                    element={isAuthenticate ? <ProcessOrder /> : <LoginSignup />}
                />
                <Route
                    path="/admin/users"
                    element={isAuthenticate ? <UsersList /> : <LoginSignup />}
                />
                <Route
                    path="/admin/user/:id"
                    element={isAuthenticate ? <UpdateUser /> : <LoginSignup />}
                />
                <Route
                    path="/admin/reviews"
                    element={isAuthenticate ? <ProductReviews /> : <LoginSignup />}
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
