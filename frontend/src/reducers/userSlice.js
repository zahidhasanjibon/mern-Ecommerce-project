/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { STATUSES } from './productsSlice';

const userSlice = createSlice({
    name: 'user',
    initialState: { user: {}, status: STATUSES.LOADING, isAuthenticate: false },
    extraReducers: (builder) => {
        builder
            .addCase(userRegLogin.pending, (state, action) => {
                state.status = STATUSES.LOADING;
                state.isAuthenticate = false;
                state.user = {};
            })
            .addCase(userRegLogin.fulfilled, (state, action) => {
                state.status = STATUSES.IDLE;
                state.user = action.payload;
                if (action.payload.success) {
                    state.isAuthenticate = true;
                } else {
                    state.isAuthenticate = false;
                }
            })
            .addCase(userRegLogin.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
                state.isAuthenticate = false;
                state.user = {};
            });
    },
});
export default userSlice.reducer;

export const userRegLogin = createAsyncThunk(
    'regLog/user',
    async ({ logout, loginData, myForm }) => {
        if (logout) {
            const res = await fetch('/api/v1/logout');
            const data = await res.json();
            return {
                user: null,
                success: false,
            };
        }

        // fetch loggedin user data
        if (!loginData && !myForm) {
            const res = await fetch('/api/v1/me');
            const data = await res.json();

            return data;
        }

        // for login user
        const url = '/api/v1/login';
        if (loginData) {
            const config = { headers: { 'Content-Type': 'multipart/form-data' } };
            const res = await fetch(url, {
                method: 'post',
                config,
                body: loginData,
            });
            const data = await res.json();
            return data;
        }

        // for sugn up user
        if (myForm) {
            // url = `/api/v1/register`;
            // const config = { headers: { 'Content-Type': 'multipart/form-data' } };
            // const res = await fetch(url, {
            //     method: 'post',
            //     config,
            //     body: myForm,
            // });
            // const data = await res.json();
            // return data;
            const res = await fetch('/api/v1/register', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(myForm),
            });
            const data = await res.json();
            return data;
        }
    }
);
