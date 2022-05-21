/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { STATUSES } from './productsSlice';

const adminDeleteProductSlice = createSlice({
    name: 'adminDeleteProduct',
    initialState: {
        message: {},
        status: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(adminDeleteProductFunc.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(adminDeleteProductFunc.fulfilled, (state, action) => {
                state.status = STATUSES.IDLE;
                state.message = action.payload;
            })
            .addCase(adminDeleteProductFunc.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            });
    },
});
export default adminDeleteProductSlice.reducer;

export const adminDeleteProductFunc = createAsyncThunk('admin/deleteProduct', async (id) => {
    if (id) {
        const res = await fetch(`/api/v1/admin/product/${id}`, {
            method: 'DELETE',
        });
        const data = await res.json();
        return data;
        // const { data } = await axios.delete(`api/v1/admin/product/${id}`);
    }

    if (!id) {
        return {
            success: false,
        };
    }
});
