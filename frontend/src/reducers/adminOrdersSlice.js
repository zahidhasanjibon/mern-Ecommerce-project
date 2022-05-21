/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { STATUSES } from './productsSlice';

const adminOrdersSlice = createSlice({
    name: 'adminOrders',
    initialState: {
        orders: {},
        status: STATUSES.LOADING,
    },
    extraReducers: (builder) => {
        builder
            .addCase(adminOrderssFunc.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(adminOrderssFunc.fulfilled, (state, action) => {
                state.status = STATUSES.IDLE;
                state.orders = action.payload;
            })
            .addCase(adminOrderssFunc.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            });
    },
});
export default adminOrdersSlice.reducer;

export const adminOrderssFunc = createAsyncThunk('admin/orders', async () => {
    const url = '/api/v1/admin/orders';
    const res = await fetch(url);
    const data = await res.json();
    return data;
});
