/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { STATUSES } from './productsSlice';

const newReviewsSlice = createSlice({
    name: 'reviews',
    initialState: {
        message: {},
        status: STATUSES.LOADING,
    },
    extraReducers: (builder) => {
        builder
            .addCase(newReviewsFunc.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(newReviewsFunc.fulfilled, (state, action) => {
                state.status = STATUSES.IDLE;
                state.message = action.payload;
            })
            .addCase(newReviewsFunc.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            });
    },
});
export default newReviewsSlice.reducer;

export const newReviewsFunc = createAsyncThunk('new/reviews', async ({ myForm, reset }) => {
    if (myForm) {
        const url = `/api/v1/review`;
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        const res = await fetch(url, {
            method: 'put',
            config,
            body: myForm,
        });
        const data = await res.json();
        return data;
    }
    if (reset) {
        return { success: false };
    }
});
