/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { STATUSES } from './productsSlice';

const newOrderSlice = createSlice({
    name: 'orders',
    initialState: {
        data: {},
        status: STATUSES.LOADING,
    },
    extraReducers: (builder) => {
        builder
            .addCase(newOrderFunc.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(newOrderFunc.fulfilled, (state, action) => {
                state.status = STATUSES.IDLE;
                state.data = action.payload;
            })
            .addCase(newOrderFunc.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            });
    },
});
export default newOrderSlice.reducer;

export const newOrderFunc = createAsyncThunk('create/order', async (order) => {
    const url = '/api/v1/order/new';
    const res = await fetch(url, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
    });
    const data = await res.json();
    return data;
});
