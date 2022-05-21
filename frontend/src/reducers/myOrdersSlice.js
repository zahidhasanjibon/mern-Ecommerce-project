/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { STATUSES } from './productsSlice';

const myOrdersSlice = createSlice({
    name: 'myOrders',
    initialState: {
        orders: {},
        status: STATUSES.LOADING,
    },
    extraReducers: (builder) => {
        builder
            .addCase(myOrdersFunc.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(myOrdersFunc.fulfilled, (state, action) => {
                state.status = STATUSES.IDLE;
                state.orders = action.payload;
            })
            .addCase(myOrdersFunc.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            });
    },
});
export default myOrdersSlice.reducer;

export const myOrdersFunc = createAsyncThunk('my/allOrders', async () => {
    const url = '/api/v1/orders/me';
    const res = await fetch(url);
    const data = await res.json();
    return data;
});
