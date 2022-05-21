/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
        shippingInfo: localStorage.getItem('shippingInfo')
            ? JSON.parse(localStorage.getItem('shippingInfo'))
            : {},
    },
    reducers: {
        addToCart(state, action) {
            const item = action.payload;
            const isItemExist = state.cartItems.find((i) => i.product === item.product);

            if (isItemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((i) =>
                        i.product === isItemExist.product ? item : i
                    ),
                };
            }
            return {
                ...state,
                cartItems: [...state.cartItems, item],
            };
        },
        remove(state, action) {
            return {
                ...state,
                cartItems: state.cartItems.filter(
                    (item) => item.product !== action.payload.product
                ),
            };
        },
        saveShippingInfo(state, action) {
            return {
                ...state,
                shippingInfo: action.payload,
            };
        },
        emptyCart(state, action) {
            return { ...state, shippingInfo: {}, cartItems: [] };
        },
        // getTotal(state, action) {
        //     const { totalItem, totalPrice } = state.products.reduce(
        //         (acc, curr) => {
        //             const { price, quantity } = curr;
        //             const itemsTotalAmount = price * quantity;
        //             acc.totalItem += quantity;
        //             acc.totalPrice += itemsTotalAmount;
        //             return acc;
        //         },
        //         { totalItem: 0, totalPrice: 0 }
        //     );

        //     state.totalItem = totalItem;

        //     state.totalPrice = totalPrice;
        // },

        // increment(state, action) {
        //     const updatedArr = state.products.map((item) => {
        //         if (item.id === action.payload.id) {
        //             return {
        //                 ...item,
        //                 quantity: item.quantity + 1,
        //             };
        //         }
        //         return item;
        //     });
        //     state.products = updatedArr;
        // },
        // decrement(state, action) {
        //     if (action.payload.quantity === 1) {
        //         state.products = state.products.filter((elm) => elm.id !== action.payload.id);
        //     }

        //     const updatedArr = state.products.map((elm) => {
        //         if (elm.id === action.payload.id) {
        //             return {
        //                 ...elm,
        //                 quantity: elm.quantity - 1,
        //             };
        //         }
        //         return elm;
        //     });

        //     state.products = updatedArr;
        // },
    },
});

export const { addToCart, remove, saveShippingInfo, emptyCart } = cartSlice.actions;
export default cartSlice.reducer;
