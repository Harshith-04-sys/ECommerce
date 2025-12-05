import {
    loginFail,
    loginRequest, 
    loginSuccess, 
    clearError,
    registerFail,
    registerRequest,
    registerSuccess,
    loadUserRequest,
    loadUserSuccess,
    loadUserFail,
    logoutSuccess,
    logoutFail,
    updateProfileRequest,
    updateProfileSuccess,
    updateProfileFail,
    updatePasswordRequest,
    updatePasswordSuccess,
    updatePasswordFail,
    forgotPasswordRequest,
    forgotPasswordSuccess,
    forgotPasswordFail,
    resetPasswordRequest,
    resetPasswordSuccess,
    resetPasswordFail
} from '../slices/authSlice';

import {
    usersRequest,
    usersSuccess,
    usersFail,
    userRequest,
    userSuccess,
    userFail,
    deleteUserRequest,
    deleteUserSuccess,
    deleteUserFail,
    updateUserRequest,
    updateUserSuccess,
    updateUserFail

} from '../slices/userSlice'
import axios from 'axios';

// Use the same API base URL everywhere so auth works in both dev (localhost:3000 -> 8000)
// and production (deployed frontend -> backend).
const API_BASE_URL = process.env.REACT_APP_API_URL || '';

const getErrorMessage = (error) => error?.response?.data?.message || error?.message || 'Something went wrong';

export const login = (email, password) => async (dispatch) => {

        try {
            dispatch(loginRequest())
            const { data }  = await axios.post(`${API_BASE_URL}/api/v1/login`,{email,password});
            dispatch(loginSuccess(data))
        } catch (error) {
            dispatch(loginFail(getErrorMessage(error)))
        }

}

export const clearAuthError = () => (dispatch) => {
    dispatch(clearError())
}

export const register = (userData) => async (dispatch) => {

    try {
        dispatch(registerRequest())
        const config = {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }

        const { data }  = await axios.post(`${API_BASE_URL}/api/v1/register`,userData, config);
        dispatch(registerSuccess(data))
    } catch (error) {
        dispatch(registerFail(getErrorMessage(error)))
    }

}

export const loadUser =  async (dispatch) => {

    try {
        dispatch(loadUserRequest())
       

        const { data }  = await axios.get(`${API_BASE_URL}/api/v1/myprofile`);
        dispatch(loadUserSuccess(data))
    } catch (error) {
        dispatch(loadUserFail(getErrorMessage(error)))
    }

}

export const logout =  async (dispatch) => {

    try {
        await axios.get(`${API_BASE_URL}/api/v1/logout`);
        dispatch(logoutSuccess())
    } catch (error) {
        dispatch(logoutFail(error.response?.data?.message || error.message))
    }

}

export const updateProfile = (userData) => async (dispatch) => {

    try {
        dispatch(updateProfileRequest())
        const config = {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }

        const { data }  = await axios.put(`${API_BASE_URL}/api/v1/update`,userData, config);
        dispatch(updateProfileSuccess(data))
    } catch (error) {
        dispatch(updateProfileFail(getErrorMessage(error)))
    }

}

export const updatePassword = (formData) => async (dispatch) => {

    try {
        dispatch(updatePasswordRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        await axios.put(`${API_BASE_URL}/api/v1/password/change`, formData, config);
        dispatch(updatePasswordSuccess())
    } catch (error) {
        dispatch(updatePasswordFail(getErrorMessage(error)))
    }

}

export const forgotPassword = (formData) => async (dispatch) => {

    try {
        dispatch(forgotPasswordRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data} =  await axios.post(`${API_BASE_URL}/api/v1/password/forgot`, formData, config);
        dispatch(forgotPasswordSuccess(data))
    } catch (error) {
        dispatch(forgotPasswordFail(getErrorMessage(error)))
    }

}

export const resetPassword = (formData, token) => async (dispatch) => {

    try {
        dispatch(resetPasswordRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data} =  await axios.post(`${API_BASE_URL}/api/v1/password/reset/${token}`, formData, config);
        dispatch(resetPasswordSuccess(data))
    } catch (error) {
        dispatch(resetPasswordFail(getErrorMessage(error)))
    }

}

export const getUsers =  async (dispatch) => {

    try {
        dispatch(usersRequest())
        const { data }  = await axios.get(`${API_BASE_URL}/api/v1/admin/users`);
        dispatch(usersSuccess(data))
    } catch (error) {
        dispatch(usersFail(getErrorMessage(error)))
    }

}

export const getUser = id => async (dispatch) => {

    try {
        dispatch(userRequest())
        const { data }  = await axios.get(`${API_BASE_URL}/api/v1/admin/user/${id}`);
        dispatch(userSuccess(data))
    } catch (error) {
        dispatch(userFail(getErrorMessage(error)))
    }

}

export const deleteUser = id => async (dispatch) => {

    try {
        dispatch(deleteUserRequest())
        await axios.delete(`${API_BASE_URL}/api/v1/admin/user/${id}`);
        dispatch(deleteUserSuccess())
    } catch (error) {
        dispatch(deleteUserFail(getErrorMessage(error)))
    }

}

export const updateUser = (id, formData) => async (dispatch) => {

    try {
        dispatch(updateUserRequest())
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        await axios.put(`${API_BASE_URL}/api/v1/admin/user/${id}`, formData, config);
        dispatch(updateUserSuccess())
    } catch (error) {
        dispatch(updateUserFail(getErrorMessage(error)))
    }

}