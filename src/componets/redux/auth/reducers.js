// @flow
import { AuthActionTypes } from './constants';
import { APICore } from '../../helper/api/apiCore';

const api = new APICore();

const INIT_STATE = {
    user: api.getLoggedInUser(),
    sentOTP: {},
    loading: false,
    error: null,
    message: null,
    userSignUp: false,
    verifyEmail: false,
    userLoggedIn: false,
    passwordReset: false,
    setUserPassword: false,
    resetPasswordSuccess: null,
    userLogout: false,
    signInByOtp: false,
    verifyEmailData: {}
};

const Auth = (state = INIT_STATE, action) => {
    console.log(action.payload, 'pppppppppppppppp');
    switch (action.type) {
        case AuthActionTypes.AUTH_API_RESPONSE_SUCCESS:
            return {
                ...state,
                loading: false,
                message: null,
                error: null, // Reset error on success
                ...(action.payload.actionType === AuthActionTypes.LOGIN_USER && {
                    user: action.payload,
                    userLoggedIn: true,
                }),
                ...(action.payload.actionType === AuthActionTypes.SIGNUP_USER && {
                    userSignUp: true,
                    sentOTP: action.payload?.data
                }),
                ...(action.payload.actionType === AuthActionTypes.VERIFY_EMAIL && {
                    verifyEmail: true,
                    verifyEmailData: action.payload?.data  
                }),

                ...(action.payload.actionType === AuthActionTypes.FORGOT_PASSWORD && {
                    resetPasswordSuccess: action.payload.data,
                    passwordReset: true,
                }),
            };

        case AuthActionTypes.AUTH_API_RESPONSE_ERROR:
            return {
                ...state,
                loading: false,
                message: action.payload?.response?.data?.message
                    ? action.payload.response.data.message
                    : JSON.stringify(action.payload?.response?.data?.message) || "An error occurred",
                error: action.payload.error,
                ...(action.payload.actionType === AuthActionTypes.LOGIN_USER && {
                    userLoggedIn: false,
                }),
                ...(action.payload.actionType === AuthActionTypes.SIGNUP_USER && {
                    userSignUp: false,
                }),
                ...(action.payload.actionType === AuthActionTypes.VERIFY_EMAIL && {
                    verifyEmail: false,
                }),
                ...(action.payload.actionType === AuthActionTypes.FORGOT_PASSWORD && {
                    passwordReset: false,
                }),
            };

        case AuthActionTypes.LOGIN_USER:
        case AuthActionTypes.SIGNUP_USER:
        case AuthActionTypes.VERIFY_EMAIL:
        case AuthActionTypes.FORGOT_PASSWORD:
            return {
                ...state,
                loading: true,
                error: null, // Reset error on new request
            };


        case AuthActionTypes.AUTH_RESET:
            return { ...INIT_STATE, user: null }; // Reset state properly

        default:
            return state;
    }
};

export default Auth;