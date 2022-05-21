/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
// /* eslint-disable no-param-reassign */
// /* eslint-disable no-unused-vars */
// /* eslint-disable no-use-before-define */
// const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

// export const STATUSES = Object.freeze({
//     IDLE: 'idle',
//     ERROR: 'error',
//     LOADING: 'loading',
// });

// const productSlice = createSlice({
//     name: 'product',
//     initialState: {
//         data: [],
//         status: STATUSES.IDLE,
//     },
//     // reducers: {
//     //     setProduct(state, action) {
//     //         // eslint-disable-next-line no-param-reassign
//     //         state.data = action.payload;
//     //     },
//     //     setStatus(state, action) {
//     //         // eslint-disable-next-line no-param-reassign
//     //         state.status = action.payload;
//     //     },
//     // },
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchProduct.pending, (state, action) => {
//                 state.status = STATUSES.LOADING;
//             })
//             .addCase(fetchProduct.fulfilled, (state, action) => {
//                 state.status = STATUSES.IDLE;
//                 state.data = action.payload;
//             })
//             .addCase(fetchProduct.rejected, (state, action) => {
//                 state.status = STATUSES.ERROR;
//             });
//     },
// });

// export const { setProduct, setStatus } = productSlice.actions;
// export default productSlice.reducer;

// // thunk
// // export function fetchProduct() {
// //     // eslint-disable-next-line no-unused-vars
// //     return async function fetchProductThunk(dispatch, getState) {
// //         dispatch(setStatus(STATUSES.LOADING));
// //         try {
// //             const res = await fetch('https://fakestoreapi.com/products');
// //             const data = await res.json();
// //             dispatch(setProduct(data));
// //             console.log(data);
// //             dispatch(setStatus(STATUSES.IDLE));
// //         } catch (error) {
// //             console.log(error);
// //             dispatch(setStatus(STATUSES.ERROR));
// //         }
// //     };
// // }

// export const fetchProduct = createAsyncThunk('products/fetch', async () => {
//     const res = await fetch('https://fakestoreapi.com/products');
//     const data = await res.json();
//     return data;
// });

// import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// export const STATUSES = Object.freeze({
//     IDLE: 'idle',
//     ERROR: 'error',
//     LOADING: 'loading',
// });

// const productSlice = createSlice({
//     name: 'products',
//     initialState: {
//         data: [],
//         status: STATUSES.LOADING,
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchProducts.pending, (state, action) => {
//                 state.status = STATUSES.LOADING;
//             })
//             .addCase(fetchProducts.fulfilled, (state, action) => {
//                 state.status = STATUSES.IDLE;
//                 state.data = action.payload;
//             })
//             .addCase(fetchProducts.rejected, (state, action) => {
//                 state.status = STATUSES.ERROR;
//             });
//     },
// });

// export default productSlice.reducer;

// export const fetchProducts = createAsyncThunk('fetch/product', async () => {
//     const res = await fetch('https://fakestoreapi.com/products');
//     const data = await res.json();
//     return data; // action.payload
// });
