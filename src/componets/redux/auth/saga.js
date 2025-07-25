import { all, fork, put, takeEvery, call } from 'redux-saga/effects';
import {
    login as loginApi,
    signup as signupApi,
    forgotPassword as forgotPasswordApi,
    verifyApi as verifyEmailApi
} from '../../helper/api/auth';

import { APICore, setAuthorization } from '../../helper/api/apiCore';
import { authApiResponseSuccess, authApiResponseError } from './actions';
import { AuthActionTypes } from './constants';
import ToastHandle from '../../helper/ToastMessage';

const api = new APICore();

// LOGIN
function* login(action) {
    try {
        const response = yield call(loginApi, action.payload);
        const user = response.data.user;
        const userData = {
            id: user.id,
            firstName: user.name,
            email: user.email,
            phoneNumber: user.phone,
            token: response.data.token,
        };

        localStorage.setItem('camp_booking', JSON.stringify(userData));
        api.setLoggedInUser(userData);
        setAuthorization(userData.token);
        yield put(authApiResponseSuccess(AuthActionTypes.LOGIN_USER, userData));
    } catch (error) {
        yield put(authApiResponseError(AuthActionTypes.LOGIN_USER, error));
        api.setLoggedInUser(null);
        setAuthorization(null);
    }
}

// SIGNUP
function* signup(action) {
    try {
        const response = yield call(signupApi, action.payload);
        yield put(authApiResponseSuccess(AuthActionTypes.SIGNUP_USER, response.data));
        ToastHandle(response?.data?.message, 'success');
    } catch (error) {
        yield put(authApiResponseError(AuthActionTypes.SIGNUP_USER, error));
        api.setLoggedInUser(null);
        setAuthorization(null);
    }
}
// verifyemail
function* verifyEmail(action) {
    try {
        const response = yield call(verifyEmailApi, action.payload);
        console.log(response, '0000000000000p');
        yield put(authApiResponseSuccess(AuthActionTypes.VERIFY_EMAIL, response.data));
        ToastHandle(response?.data?.message, 'success');
    } catch (error) {
        yield put(authApiResponseError(AuthActionTypes.VERIFY_EMAIL, error));
        api.setLoggedInUser(null);
        setAuthorization(null);
    }
}


// FORGOT PASSWORD
function* forgotPassword(action) {
    try {
        const response = yield call(forgotPasswordApi, action.payload);
        yield put(authApiResponseSuccess(AuthActionTypes.FORGOT_PASSWORD, response.data));
    } catch (error) {
        yield put(authApiResponseError(AuthActionTypes.FORGOT_PASSWORD, error));
    }
}

export function* watchLoginUser() {
    yield takeEvery(AuthActionTypes.LOGIN_USER, login);
}

export function* watchSignup() {
    yield takeEvery(AuthActionTypes.SIGNUP_USER, signup);
}

export function* watchVerifyEmail() {
    yield takeEvery(AuthActionTypes.VERIFY_EMAIL, verifyEmail);
}

export function* watchForgotPassword() {
    yield takeEvery(AuthActionTypes.FORGOT_PASSWORD, forgotPassword);
}

export default function* authSaga() {
    yield all([
        fork(watchLoginUser),
        fork(watchSignup),
        fork(watchVerifyEmail),
        fork(watchForgotPassword),
    ]);
}
