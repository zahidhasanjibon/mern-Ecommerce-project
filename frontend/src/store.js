import { configureStore } from '@reduxjs/toolkit';
import adminDeleteProductReducer from './reducers/adminDeleteProduct';
import adminNewProductReducer from './reducers/adminNewProductSlice';
import adminOrdersReducer from './reducers/adminOrdersSlice';
import adminProductsReducer from './reducers/adminProductsSlice';
import adminnReviewsReducer from './reducers/adminReviewsSlice';
import adminUpdateProductReducer from './reducers/adminUpdateProduct';
import adminUsersReducer from './reducers/adminUsersSlice';
import cartReducer from './reducers/cartSlice';
import myOrdersReducer from './reducers/myOrdersSlice';
import orderDetailsReducer from './reducers/orderDetailsSlice';
import newOrderReducer from './reducers/orderSlice';
import productsReducer from './reducers/productsSlice';
import profileReducer from './reducers/profileSlice';
import newReviewsReducer from './reducers/reviewsSlice';
import singleProductReducer from './reducers/singleProductSlice';
import userReducer from './reducers/userSlice';

const store = configureStore({
    reducer: {
        products: productsReducer,
        singleProductDetails: singleProductReducer,
        user: userReducer,
        profile: profileReducer,
        cart: cartReducer,
        orders: newOrderReducer,
        myOrders: myOrdersReducer,
        orderDetails: orderDetailsReducer,
        reviews: newReviewsReducer,
        adminProducts: adminProductsReducer,
        adminUsers: adminUsersReducer,
        adminOrders: adminOrdersReducer,
        adminNewProduct: adminNewProductReducer,
        adminDeleteProduct: adminDeleteProductReducer,
        adminUpdateProduct: adminUpdateProductReducer,
        adminReviews: adminnReviewsReducer,
    },
});
export default store;
