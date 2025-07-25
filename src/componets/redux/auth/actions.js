import { AuthActionTypes } from './constants';

export const loginUser = (payload) => ({
    type: AuthActionTypes.LOGIN_USER,
    payload,
});

export const signupUser = (payload) => ({
    type: AuthActionTypes.SIGNUP_USER,
    payload,
});

export const verifyOTP = (payload) => ({
    type: AuthActionTypes.VERIFY_EMAIL,
    payload,
});

export const forgotPassword = (payload) => ({
    type: AuthActionTypes.FORGOT_PASSWORD,
    payload,
});

export const authApiResponseSuccess = (actionType, data) => ({
    type: AuthActionTypes.AUTH_API_RESPONSE_SUCCESS,
    payload: { actionType, data },
});

export const authApiResponseError = (actionType, error) => ({
    type: AuthActionTypes.AUTH_API_RESPONSE_ERROR,
    payload: { actionType, error },
});
