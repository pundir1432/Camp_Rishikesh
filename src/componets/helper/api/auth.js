// @flow
import { APICore } from './apiCore';
const api = new APICore();

// Sign In
function login(params) {
    return api.create('/api/auth/signin', params);
}

// Sign Up
function signup(params) {
    return api.create('/api/auth/signup', params);
}

// Verify OTP
function verifyApi(params) {
    return api.create('/api/auth/verifyOTP', params);
}

// Forgot Password
function forgotPassword(params) {
    return api.create('/api/auth/forgot-password', params);
}

export { login, signup, verifyApi, forgotPassword };
