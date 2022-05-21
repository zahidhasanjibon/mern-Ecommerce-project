/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { STATUSES } from './productsSlice';

const orderDetailsSlice = createSlice({
    name: 'orderDetails',
    initialState: {
        order: {},
        status: STATUSES.LOADING,
    },
    extraReducers: (builder) => {
        builder
            .addCase(orderDetailsFunc.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(orderDetailsFunc.fulfilled, (state, action) => {
                state.status = STATUSES.IDLE;
                state.order = action.payload.order;
            })
            .addCase(orderDetailsFunc.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            });
    },
});
export default orderDetailsSlice.reducer;

export const orderDetailsFunc = createAsyncThunk('my/ordersDetails', async (id) => {
    const url = `/api/v1/order/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    return data;
});
