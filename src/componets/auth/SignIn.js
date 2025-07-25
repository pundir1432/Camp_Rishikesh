import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ForgotPassword from './ForgotPassword';
import '../styles/Auth.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser, signupUser, verifyOTP } from '../redux/actions';
import { AuthActionTypes } from '../redux/auth/constants';
import { ButtonLoading } from '../helper/loading/Loading';

const SignIn = () => {
    const [mode, setMode] = useState('signin');
    const [showPassword, setShowPassword] = useState(false);
    const [signupEmail, setSignupEmail] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVariant, setAlertVariant] = useState('danger');

    const { loading, userLoggedIn, verifyEmailData, userLogout, sentOTP, user, error } = useSelector((state) => ({
        loading: state.Auth.loading,
        user: state.Auth.user?.data,
        error: state.Auth.error,
        userLoggedIn: state.Auth.userLoggedIn,
        sentOTP: state.Auth.sentOTP,
        verifyEmailData: state.Auth?.verifyEmailData

    }));
    console.log(sentOTP, 'loading, userLoggedIn,sentOTP,userLogout, user, error');

    useEffect(() => {
        if (user) {
            localStorage.setItem('camp_booking', user?.data)
            navigate('/camp/home')
        }
    }, [user])
    const signinForm = useForm();
    const signupForm = useForm();
    const otpForm = useForm();
    const capitalizeName = (value) => value.charAt(0).toUpperCase() + value.slice(1);


    const handleSignIn = (data) => {
        const payload = {
            email: capitalizeName(data.email),
            password: data.password,
        };
        dispatch(loginUser(payload));
    };

    const handleSignUp = (data) => {
        setSignupEmail(data.email);
        const payload = {
            email: capitalizeName(data.email),
            password: data.password,
            phone: data?.phone,
            name: capitalizeName(data?.name)
        };
        dispatch(signupUser(payload));
    };

    const handleVerifyOTP = (data) => {
        const payload = {
            email: capitalizeName(signupEmail),
            otp: data.otp,
        };
        dispatch(verifyOTP(payload));

    };

    useEffect(() => {
        const message = error?.msg || error?.message || sentOTP?.message;

        if (message) {
            setAlertMessage(message);
            setAlertVariant(error ? 'danger' : 'success');
            setShowAlert(true);

            const timer = setTimeout(() => {
                setShowAlert(false);
                setAlertMessage('');
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [error, sentOTP]);


    useEffect(() => {
        if (mode === 'signup') {
            dispatch({
                type: AuthActionTypes.AUTH_API_RESPONSE_SUCCESS,
                payload: {
                    actionType: AuthActionTypes.SIGNUP_USER,
                    data: {},
                },
            });
        }
    }, [mode]);

    useEffect(() => {
        if (verifyEmailData?.status === 200) {
            signupForm.reset();
            otpForm.reset();
            setSignupEmail("");
            setMode('signin');
        }
    }, [verifyEmailData]);

    return (
        <Container fluid>
            <Row>
                <Col className="p-0 m-0">
                    <div className="auth-container">
                        <div className={`auth-card ${mode === 'signup' ? 'flipped' : ''} ${mode === 'forgot' ? 'forgot-mode' : ''}`}>

                            {/* Sign In */}
                            <div className="auth-face front">
                                {showAlert && alertMessage && mode === 'signin' && (
                                    <Alert variant={alertVariant} className="text-center">
                                        {alertMessage}
                                    </Alert>
                                )}
                                <h2>Sign In</h2>
                                <form onSubmit={signinForm.handleSubmit(handleSignIn)}>
                                    <TextField
                                        className="w-100"
                                        label="Email"
                                        size="small"
                                        variant="outlined"
                                        {...signinForm.register('email', { required: 'Email is required' })}
                                    />
                                    {signinForm.formState.errors.email && (
                                        <p className="error text-start">{signinForm.formState.errors.email.message}</p>
                                    )}

                                    <TextField
                                        className="w-100 mt-3"
                                        label="Password"
                                        size="small"
                                        type={showPassword ? 'text' : 'password'}
                                        variant="outlined"
                                        {...signinForm.register('password', { required: 'Password is required' })}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    {signinForm.formState.errors.password && (
                                        <p className="error text-start">{signinForm.formState.errors.password.message}</p>
                                    )}

                                    <div className="text-end">
                                        <span
                                            style={{ cursor: "pointer", color: "#007bff" }}
                                            onClick={() => setMode('forgot')}
                                        >
                                            Forgot Password?
                                        </span>
                                    </div>

                                    <button type="submit">{loading ? <ButtonLoading /> : "Login"}</button>

                                    <p>
                                        <span>You don't have an account? </span>
                                        <span
                                            onClick={() => setMode('signup')}
                                            style={{ color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}
                                        >
                                            Sign Up
                                        </span>
                                    </p>
                                </form>
                            </div>

                            {/* Sign Up */}
                            <div className="auth-face-signup back py-3">
                                <div style={{ minHeight: '20px' }}>
                                    {showAlert && alertMessage && mode === 'signup' && (
                                        <Alert variant={alertVariant} className="text-center mb-2">
                                            {alertMessage}
                                        </Alert>
                                    )}
                                </div>

                                <h2>Sign Up</h2>
                                <form onSubmit={signupForm.handleSubmit(handleSignUp)}>
                                    <TextField
                                        className="w-100"
                                        label="Name"
                                        size="small"
                                        variant="outlined"
                                        {...signupForm.register('name', {
                                            required: 'Name is required',
                                            pattern: {
                                                value: /^[A-Z][a-zA-Z ]*$/,
                                                message: 'First letter must be capital and only letters allowed',
                                            },
                                        })}
                                        disabled={sentOTP?.status === 200}
                                    />
                                    {signupForm.formState.errors.name && (
                                        <p className="error text-start">{signupForm.formState.errors.name.message}</p>
                                    )}

                                    {/* Email Field */}
                                    <TextField
                                        className="w-100 mt-3"
                                        label="Email"
                                        size="small"
                                        variant="outlined"
                                        {...signupForm.register('email', {
                                            required: 'Email is required',
                                            pattern: {
                                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                message: 'Invalid email format',
                                            },
                                        })}
                                        disabled={sentOTP?.status === 200}
                                    />
                                    {signupForm.formState.errors.email && (
                                        <p className="error text-start">{signupForm.formState.errors.email.message}</p>
                                    )}

                                    {/* Phone Field */}
                                    <TextField
                                        className="w-100 mt-3"
                                        label="Phone Number"
                                        variant="outlined"
                                        size="small"
                                        inputProps={{ maxLength: 10 }}
                                        {...signupForm.register('phone', {
                                            required: 'Phone number is required',
                                            pattern: {
                                                value: /^[0-9]{10}$/,
                                                message: 'Phone number must be exactly 10 digits',
                                            },
                                            onChange: (e) => {
                                                const onlyDigits = e.target.value.replace(/\D/g, '');
                                                if (onlyDigits.length <= 10) {
                                                    signupForm.setValue('phone', onlyDigits);
                                                }
                                            },
                                        })}
                                    />
                                    {signupForm.formState.errors.phone && (
                                        <p className="error text-start">{signupForm.formState.errors.phone.message}</p>
                                    )}


                                    {/* Password Field */}
                                    <TextField
                                        className="w-100 mt-3"
                                        label="Password"
                                        size="small"
                                        type={showPassword ? 'text' : 'password'}
                                        variant="outlined"
                                        {...signupForm.register('password', {
                                            required: 'Password is required',
                                            pattern: {
                                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                                                message: 'Password must be 8+ chars, include uppercase, lowercase, number & symbol',
                                            },
                                        })}
                                        disabled={sentOTP?.status === 200}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    {signupForm.formState.errors.password && (
                                        <p className="error text-start">{signupForm.formState.errors.password.message}</p>
                                    )}

                                    {sentOTP?.status !== 200 && (
                                        <button type="submit">{loading ? <ButtonLoading /> : "Register"}</button>
                                    )}
                                    {sentOTP?.status === 200 && (
                                        <div className="otp-wrapper">
                                            <TextField
                                                className="w-100"
                                                size="small"
                                                label="Enter OTP"
                                                variant="outlined"
                                                {...otpForm.register('otp', { required: 'OTP is required' })}
                                            />
                                            {otpForm.formState.errors.otp && (
                                                <p className="error text-start">{otpForm.formState.errors.otp.message}</p>
                                            )}
                                            <button type="button" onClick={otpForm.handleSubmit(handleVerifyOTP)}>
                                                {loading ? <ButtonLoading /> : "Verify Email"}
                                            </button>
                                        </div>
                                    )}



                                    <p>
                                        <span>Already have an account? </span>
                                        <span
                                            onClick={() => setMode('signin')}
                                            style={{ color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}
                                        >
                                            Sign In
                                        </span>
                                    </p>
                                </form>
                            </div>

                            {/* Forgot Password */}
                            <ForgotPassword onBack={() => setMode('signin')} />
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default SignIn;
