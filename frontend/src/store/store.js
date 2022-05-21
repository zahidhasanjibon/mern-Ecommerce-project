// import { configureStore } from '@reduxjs/toolkit';
// import cartReducer from './cartSlice';
// import productReducer from './productSlice';

// const store = configureStore({
//     reducer: {
//         cart: cartReducer,
//         product: productReducer,
//     },
// });
// export default store;

import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import productReducer from './productSlice';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        products: productReducer,
    },
});
export default store;
