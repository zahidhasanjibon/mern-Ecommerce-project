/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { STATUSES } from './productsSlice';

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        data: {},
        status: false,
        isUpdated: false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateProfile.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.status = STATUSES.IDLE;
                state.data = action.payload;
                if (action.payload.success) {
                    state.isUpdated = true;
                } else {
                    state.isUpdated = false;
                }
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
                state.isUpdated = false;
            });
    },
});
export default profileSlice.reducer;

export const updateProfile = createAsyncThunk(
    'update/profile',
    async ({ myForm, reset, updatePasswordData, forgotPasswordData, resetPasswordData, token }) => {
        if (myForm) {
            const url = `/api/v1/me/update`;
            const config = { headers: { 'Content-Type': 'multipart/form-data' } };
            const res = await fetch(url, {
                method: 'put',
                config,
                body: myForm,
            });
            const data = await res.json();
            return data;
        }
        if (updatePasswordData) {
            const url = `/api/v1/password/update`;
            const config = { headers: { 'Content-Type': 'multipart/form-data' } };
            const res = await fetch(url, {
                method: 'put',
                config,
                body: updatePasswordData,
            });
            const data = await res.json();
            return data;
        }
        if (forgotPasswordData) {
            const url = '/api/v1/password/forgot';
            const config = { headers: { 'Content-Type': 'multipart/form-data' } };
            const res = await fetch(url, {
                method: 'post',
                config,
                body: forgotPasswordData,
            });
            const data = await res.json();
            return data;
        }
        if (resetPasswordData && token) {
            const url = `/api/v1/password/reset/${token}`;
            const config = { headers: { 'Content-Type': 'multipart/form-data' } };
            const res = await fetch(url, {
                method: 'put',
                config,
                body: resetPasswordData,
            });
            const data = await res.json();
            return data;
        }

        if (reset) {
            return { success: false, user: null };
        }
    }
);
