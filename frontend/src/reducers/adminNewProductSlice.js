/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { STATUSES } from './productsSlice';

const adminNewProductSlice = createSlice({
    name: 'adminNewProduct',
    initialState: {
        product: {},
        status: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(adminNewProductFunc.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(adminNewProductFunc.fulfilled, (state, action) => {
                state.status = STATUSES.IDLE;
                state.product = action.payload;
            })
            .addCase(adminNewProductFunc.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            });
    },
});
export default adminNewProductSlice.reducer;

export const adminNewProductFunc = createAsyncThunk('admin/newProduct', async (productData) => {
    if (productData) {
        const res = await fetch('/api/v1/admin/product/new', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData),
        });
        const data = await res.json();
        return data;
    }

    if (!productData) {
        return {
            success: false,
        };
    }
});
