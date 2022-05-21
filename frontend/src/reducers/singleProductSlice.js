/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { STATUSES } from './productsSlice';

const singleProductSlice = createSlice({
    name: 'products',
    initialState: {
        data: {},
        status: STATUSES.LOADING,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProductDetails.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(getProductDetails.fulfilled, (state, action) => {
                state.status = STATUSES.IDLE;
                state.data = action.payload;
            })
            .addCase(getProductDetails.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            });
    },
});
export default singleProductSlice.reducer;

export const getProductDetails = createAsyncThunk('fetch/product', async (id) => {
    const { data } = await axios.get(`/api/v1/product/${id}`);
    return data;
});
