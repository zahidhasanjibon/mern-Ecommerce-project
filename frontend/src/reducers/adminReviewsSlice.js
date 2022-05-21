/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { STATUSES } from './productsSlice';

const adminReviewsSlice = createSlice({
    name: 'adminReviews',
    initialState: {
        reviews: [],
        status: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(adminReviewsFunc.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(adminReviewsFunc.fulfilled, (state, action) => {
                state.status = STATUSES.IDLE;
                state.reviews = action.payload.reviews;
            })
            .addCase(adminReviewsFunc.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            });
    },
});
export default adminReviewsSlice.reducer;

export const adminReviewsFunc = createAsyncThunk(
    'admin/reviews',
    async ({ reviewId, productId }) => {
        if (productId && !reviewId) {
            const url = `/api/v1/reviews?id=${productId}`;
            const res = await fetch(url);
            const data = await res.json();
            return data;
        }
        if (productId && reviewId) {
            const url = `/api/v1/reviews?productId=${productId}&id=${reviewId}`;
            const res = await fetch(url, { method: 'DELETE' });
            const data = await res.json();
            return data;
        }
        // if (reset && !productId && !reviewId) {
        //     return { isDeleted: false };
        // }
    }
);
