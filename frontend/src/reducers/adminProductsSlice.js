/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { STATUSES } from './productsSlice';

const adminProductsSlice = createSlice({
    name: 'adminProducts',
    initialState: {
        products: {},
        status: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(adminProductsFunc.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(adminProductsFunc.fulfilled, (state, action) => {
                state.status = STATUSES.IDLE;
                state.products = action.payload;
            })
            .addCase(adminProductsFunc.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            });
    },
});
export default adminProductsSlice.reducer;

export const adminProductsFunc = createAsyncThunk('admin/Products', async () => {
    const url = '/api/v1/admin/products';
    const res = await fetch(url);
    const data = await res.json();
    return data;
});
