import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    isAuthenticated: false,
    user: null,
    error: null,
    message: null,
    isUpdated: false
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Login
        loginRequest(state) {
            state.loading = true;
            state.error = null;
        },
        loginSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.error = null;
        },
        loginFail(state, action) {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        },

        // Register
        registerRequest(state) {
            state.loading = true;
            state.error = null;
        },
        registerSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.error = null;
        },
        registerFail(state, action) {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        },

        // Load User
        loadUserRequest(state) {
            state.loading = true;
            state.error = null;
        },
        loadUserSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.error = null;
        },
        loadUserFail(state, action) {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        },

        // Logout
        logoutSuccess(state) {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = null;
            state.message = null;
            state.isUpdated = false;
        },
        logoutFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },

        // Update Profile
        updateProfileRequest(state) {
            state.loading = true;
            state.isUpdated = false;
            state.error = null;
        },
        updateProfileSuccess(state, action) {
            state.loading = false;
            state.user = action.payload.user;
            state.isUpdated = true;
            state.error = null;
        },
        updateProfileFail(state, action) {
            state.loading = false;
            state.isUpdated = false;
            state.error = action.payload;
        },
        clearUpdateProfile(state) {
            state.isUpdated = false;
        },

        // Update Password
        updatePasswordRequest(state) {
            state.loading = true;
            state.isUpdated = false;
            state.error = null;
        },
        updatePasswordSuccess(state) {
            state.loading = false;
            state.isUpdated = true;
            state.error = null;
        },
        updatePasswordFail(state, action) {
            state.loading = false;
            state.isUpdated = false;
            state.error = action.payload;
        },

        // Forgot Password
        forgotPasswordRequest(state) {
            state.loading = true;
            state.message = null;
            state.error = null;
        },
        forgotPasswordSuccess(state, action) {
            state.loading = false;
            state.message = action.payload.message;
            state.error = null;
        },
        forgotPasswordFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        },

        // Reset Password
        resetPasswordRequest(state) {
            state.loading = true;
            state.error = null;
        },
        resetPasswordSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.error = null;
        },
        resetPasswordFail(state, action) {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload;
        },

        // Clear Error & Message
        clearError(state) {
            state.error = null;
            state.message = null;
        }
    }
});

export const {
    loginRequest,
    loginSuccess,
    loginFail,
    registerRequest,
    registerSuccess,
    registerFail,
    loadUserRequest,
    loadUserSuccess,
    loadUserFail,
    logoutSuccess,
    logoutFail,
    updateProfileRequest,
    updateProfileSuccess,
    updateProfileFail,
    clearUpdateProfile,
    updatePasswordRequest,
    updatePasswordSuccess,
    updatePasswordFail,
    forgotPasswordRequest,
    forgotPasswordSuccess,
    forgotPasswordFail,
    resetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordFail,
    clearError
} = authSlice.actions;

export default authSlice.reducer;

