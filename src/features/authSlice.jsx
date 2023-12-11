import { createSlice } from "@reduxjs/toolkit";


const authSlice = createSlice({
    name: "auth",
    initialState: {
        currentUser: null,
        loading: false,
        error: false,
        isAdmin: false,
        token: null, 
        user: {}
    },
    reducers: {
        fetchStart: state => {
            state.loading = true;
            state.error = false;
        },
        loginSuccess: (state, { payload }) => {
            state.loading = false;
            state.currentUser = payload?.user?.username;
            state.isAdmin = payload?.user?.is_superuser;
            state.token = payload?.key;
            state.user = payload.user;
        },
        logoutSuccess: state => {
            state.loading = false;
            state.currentUser = null;
            state.token = null;
            state.isAdmin = false;
            state.user = null;
        },
        registerSuccess: (state, { payload }) => {
            state.loading = false;
            state.currentUser = payload?.username;
            state.token = payload?.key;
            state.error = false;
            state.user = payload.user;
        },
        userUpdateSuccess: (state, { payload }) => {
            state.loading = false;
            state.contributions = payload.data;
        },
        fetchFail: state => {
            state.loading = false;
            state.error = true;
        },

    }
});
export const {fetchStart, fetchFail, loginSuccess, registerSuccess, userUpdateSuccess, logoutSuccess} = authSlice.actions;

export default authSlice.reducer;