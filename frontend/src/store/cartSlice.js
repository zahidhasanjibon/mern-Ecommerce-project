/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-self-assign */
/* eslint-disable no-param-reassign */
// /* eslint-disable no-param-reassign */
// const { createSlice } = require('@reduxjs/toolkit');

// const initialState = [];

// const cartSlice = createSlice({
//     name: 'cart',
//     initialState,
//     reducers: {
//         add(state, action) {
//             state.push(action.payload);
//         },
//         remove(state, action) {
//             return state.filter((item) => item.id !== action.payload);
//         },
//     },
// });

// export const { add, remove } = cartSlice.actions;
// export default cartSlice.reducer;

// import { createSlice } from '@reduxjs/toolkit';

// const cartSlice = createSlice({
//     name: 'cart',
//     initialState: { products: [], totalItem: 0, totalPrice: 0 },
//     reducers: {
//         add(state, action) {
//             const { id } = action.payload;
//             const dupe = state.products.find((obj) => obj.id === id);
//             state.products = dupe
//                 ? (state.products = state.products)
//                 : (state.products = [...state.products, action.payload]);
//         },
//         remove(state, action) {
//             state.products = state.products.filter((item) => item.id !== action.payload);
//         },
//         getTotal(state, action) {
//             const { totalItem, totalPrice } = state.products.reduce(
//                 (acc, curr) => {
//                     const { price, quantity } = curr;
//                     const itemsTotalAmount = price * quantity;
//                     acc.totalItem += quantity;
//                     acc.totalPrice += itemsTotalAmount;
//                     return acc;
//                 },
//                 { totalItem: 0, totalPrice: 0 }
//             );

//             state.totalItem = totalItem;

//             state.totalPrice = totalPrice;
//         },

//         increment(state, action) {
//             const updatedArr = state.products.map((item) => {
//                 if (item.id === action.payload.id) {
//                     return {
//                         ...item,
//                         quantity: item.quantity + 1,
//                     };
//                 }
//                 return item;
//             });
//             state.products = updatedArr;
//         },
//         decrement(state, action) {
//             if (action.payload.quantity === 1) {
//                 state.products = state.products.filter((elm) => elm.id !== action.payload.id);
//             }

//             const updatedArr = state.products.map((elm) => {
//                 if (elm.id === action.payload.id) {
//                     return {
//                         ...elm,
//                         quantity: elm.quantity - 1,
//                     };
//                 }
//                 return elm;
//             });

//             state.products = updatedArr;
//         },
//     },
// });

// export const { add, remove, getTotal, increment, decrement } = cartSlice.actions;
// export default cartSlice.reducer;
