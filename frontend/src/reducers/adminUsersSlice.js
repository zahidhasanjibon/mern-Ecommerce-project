/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { STATUSES } from './productsSlice';

const adminUsersSlice = createSlice({
    name: 'adminUsers',
    initialState: {
        users: {},
        status: STATUSES.LOADING,
    },
    extraReducers: (builder) => {
        builder
            .addCase(adminUsersFunc.pending, (state, action) => {
                state.status = STATUSES.LOADING;
            })
            .addCase(adminUsersFunc.fulfilled, (state, action) => {
                state.status = STATUSES.IDLE;
                state.users = action.payload;
            })
            .addCase(adminUsersFunc.rejected, (state, action) => {
                state.status = STATUSES.ERROR;
            });
    },
});
export default adminUsersSlice.reducer;

export const adminUsersFunc = createAsyncThunk('admin/users', async () => {
    const url = '/api/v1/admin/users';
    const res = await fetch(url);
    const data = await res.json();
    return data;
});
