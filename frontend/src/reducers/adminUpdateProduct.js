/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { STATUSES } from './productsSlice';

const adminUpdateProductSlice = createSlice({
    name: 'adminupdate',
    initialState: {
        product: {},
        status: STATUSES.LOADING,
    },
    extraReducers: (builder) => {
        builder
            .addCase(adminUpdateProductFunc.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(adminUpdateProductFunc.fulfilled, (state, action) => {
                state.status = STATUSES.IDLE;
                state.product = action.payload;
            })
            .addCase(adminUpdateProductFunc.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            });
    },
});
export default adminUpdateProductSlice.reducer;

export const adminUpdateProductFunc = createAsyncThunk(
    'admin/updateProduct',
    async ({ id, updateProductData, reset }) => {
        if (id && updateProductData) {
            const res = await fetch(`/api/v1/admin/product/${id}`, {
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updateProductData),
            });
            const data = await res.json();
            return data;
        }
        if (reset) {
            return {
                success: 'reset',
            };
        }
    }
);
