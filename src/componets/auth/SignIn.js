import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import { FaEye, FaEyeSlash, FaFacebook } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";
import { useDispatch, useSelector } from 'react-redux';
import { ButtonLoading } from '../helper/loading/Loaders';
import { loginOwner, userSignUp, verifyOtp } from '../redux/auth/thunk';
import '../styles/Auth.css';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const [mode, setMode] = useState('signin');
    const [showPassword, setShowPassword] = useState(false);
    const [signupEmail, setSignupEmail] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [alertMessage, setAlertMessage] = useState('');
    const [alertVariant, setAlertVariant] = useState('danger');

    const { loading, sentOTP, user, error, verifyEmailData } = useSelector((state) => ({
        loading: state.Auth.loading,
        user: state.Auth.user,
        error: state.Auth.error,
        sentOTP: state.Auth.sentOTP,
        verifyEmailData: state.Auth?.verifyEmailData
    }));

    const signinForm = useForm();
    const signupForm = useForm();
    const otpForm = useForm();

    const capitalizeName = (value) => value.charAt(0).toUpperCase() + value.slice(1);

    const handleSignIn = (data) => {
        const payload = {
            email: capitalizeName(data.email),
            password: data.password,
        };
        dispatch(loginOwner(payload));
    };

    useEffect(() => {
        if (user?.status === 200) {
            navigate('/camp/home');
        }
    }, [user, navigate]);

    const handleSignUp = (data) => {
        setSignupEmail(data.email);
        const payload = {
            email: capitalizeName(data.email),
            password: data.password,
            phone: data?.phone,
            name: capitalizeName(data?.name)
        };
        dispatch(userSignUp(payload));
    };

    const handleVerifyOTP = (data) => {
        const payload = {
            email: capitalizeName(signupEmail),
            otp: data.otp,
        };
        dispatch(verifyOtp(payload));
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
        if (verifyEmailData?.status === 200) {
            signupForm.reset();
            otpForm.reset();
            setSignupEmail("");
            setMode('signin');
        }
    }, [verifyEmailData]);

    return (
        <div className="auth-page p-0">
            <Container fluid className="h-100">
                <Row className="h-100 g-0">
                    {/* Left Side - Image/Branding */}
                    <Col lg={6} className="auth-left d-none d-lg-flex justify-content-center align-items-center text-start">
                        <div className="auth-brand">
                            <div className="brand-content ">
                                <h1>Welcome to Camp Rishikesh</h1>
                                <p>Experience nature at its finest with premium camping facilities</p>
                                <div className="brand-features">
                                    <div className="feature">✓ Luxury Tents & Cabins</div>
                                    <div className="feature">✓ Adventure Activities</div>
                                    <div className="feature">✓ Scenic Mountain Views</div>
                                </div>
                            </div>
                        </div>
                    </Col>

                    {/* Right Side - Auth Forms */}
                    <Col lg={6} className="auth-right">
                        <div className="auth-container">
                            {showAlert && alertMessage && (
                                <Alert variant={alertVariant} className="auth-alert">
                                    {alertMessage}
                                </Alert>
                            )}

                            {mode === 'signin' && (
                                <div className="auth-form">
                                    <div className="auth-header">
                                        <h2>Sign In</h2>
                                        <p>Welcome back! Please sign in to your account</p>
                                    </div>

                                    <form onSubmit={signinForm.handleSubmit(handleSignIn)}>
                                        <div className="form-group">
                                            <label>Email Address</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="Enter your email"
                                                {...signinForm.register('email', { required: 'Email is required' })}
                                            />
                                            {signinForm.formState.errors.email && (
                                                <span className="error-text">{signinForm.formState.errors.email.message}</span>
                                            )}
                                        </div>

                                        <div className="form-group">
                                            <label>Password</label>
                                            <div className="password-input">
                                                <input
                                                    type={showPassword ? 'text' : 'password'}
                                                    className="form-control"
                                                    placeholder="Enter your password"
                                                    {...signinForm.register('password', { required: 'Password is required' })}
                                                />
                                                <button
                                                    type="button"
                                                    className="password-toggle"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                                </button>
                                            </div>
                                            {signinForm.formState.errors.password && (
                                                <span className="error-text">{signinForm.formState.errors.password.message}</span>
                                            )}
                                        </div>

                                        <div className="form-options">
                                            <span className="forgot-link" onClick={() => setMode('forgot')}>
                                                Forgot Password?
                                            </span>
                                        </div>

                                        <button type="submit" className="auth-btn primary" disabled={loading}>
                                            {loading ? <ButtonLoading /> : "Sign In"}
                                        </button>
                                    </form>

                                    <div className="auth-divider">
                                        <span>or continue with</span>
                                    </div>

                                    <div className="social-buttons">
                                        <button className="social-btn google">
                                            <FcGoogle /> Google
                                        </button>
                                        <button className="social-btn facebook">
                                            <FaFacebook /> Facebook
                                        </button>
                                    </div>

                                    <div className="auth-switch">
                                        Don't have an account? 
                                        <span onClick={() => setMode('signup')}> Sign Up</span>
                                    </div>
                                </div>
                            )}

                            {mode === 'signup' && (
                                <div className="auth-form">
                                    <div className="auth-header">
                                        <h2>Create Account</h2>
                                        <p>Join us for an amazing camping experience</p>
                                    </div>

                                    <form onSubmit={signupForm.handleSubmit(handleSignUp)}>
                                        <div className="form-group">
                                            <label>Full Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter your full name"
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
                                                <span className="error-text">{signupForm.formState.errors.name.message}</span>
                                            )}
                                        </div>

                                        <div className="form-group">
                                            <label>Email Address</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="Enter your email"
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
                                                <span className="error-text">{signupForm.formState.errors.email.message}</span>
                                            )}
                                        </div>

                                        <div className="form-group">
                                            <label>Phone Number</label>
                                            <input
                                                type="tel"
                                                className="form-control"
                                                placeholder="Enter your phone number"
                                                maxLength="10"
                                                {...signupForm.register('phone', {
                                                    required: 'Phone number is required',
                                                    pattern: {
                                                        value: /^[0-9]{10}$/,
                                                        message: 'Phone number must be exactly 10 digits',
                                                    },
                                                })}
                                            />
                                            {signupForm.formState.errors.phone && (
                                                <span className="error-text">{signupForm.formState.errors.phone.message}</span>
                                            )}
                                        </div>

                                        <div className="form-group">
                                            <label>Password</label>
                                            <div className="password-input">
                                                <input
                                                    type={showPassword ? 'text' : 'password'}
                                                    className="form-control"
                                                    placeholder="Create a password"
                                                    {...signupForm.register('password', {
                                                        required: 'Password is required',
                                                        pattern: {
                                                            value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                                                            message: 'Password must be 8+ chars, include uppercase, lowercase, number & symbol',
                                                        },
                                                    })}
                                                    disabled={sentOTP?.status === 200}
                                                />
                                                <button
                                                    type="button"
                                                    className="password-toggle"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                >
                                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                                </button>
                                            </div>
                                            {signupForm.formState.errors.password && (
                                                <span className="error-text">{signupForm.formState.errors.password.message}</span>
                                            )}
                                        </div>

                                        {sentOTP?.status !== 200 && (
                                            <button type="submit" className="auth-btn primary" disabled={loading}>
                                                {loading ? <ButtonLoading /> : "Create Account"}
                                            </button>
                                        )}

                                        {sentOTP?.status === 200 && (
                                            <div className="otp-section">
                                                <div className="form-group">
                                                    <label>Verification Code</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Enter 6-digit code"
                                                        maxLength="6"
                                                        {...otpForm.register('otp', { required: 'OTP is required' })}
                                                    />
                                                    {otpForm.formState.errors.otp && (
                                                        <span className="error-text">{otpForm.formState.errors.otp.message}</span>
                                                    )}
                                                </div>
                                                <button 
                                                    type="button" 
                                                    className="auth-btn primary"
                                                    onClick={otpForm.handleSubmit(handleVerifyOTP)}
                                                    disabled={loading}
                                                >
                                                    {loading ? <ButtonLoading /> : "Verify Email"}
                                                </button>
                                            </div>
                                        )}
                                    </form>

                                    <div className="auth-switch">
                                        Already have an account? 
                                        <span onClick={() => setMode('signin')}> Sign In</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default SignIn;