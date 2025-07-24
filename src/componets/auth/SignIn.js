import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Container, Row, Col } from 'react-bootstrap'
import ForgotPassword from './ForgotPassword'
import '../styles/Auth.css'
import TextField from '@mui/material/TextField';


const SignIn = () => {
    const [mode, setMode] = useState('signin') // 'signin', 'signup', 'forgot'

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm()

    const onSubmit = (data) => {
        console.log(mode === 'signin' ? 'Sign In Data:' : 'Sign Up Data:', data)
        reset()
    }

    return (
        <Container fluid>
            <Row>
                <Col className="p-0 m-0">
                    <div className="auth-container">
                        <div className={`auth-card ${mode === 'signup' ? 'flipped' : ''} ${mode === 'forgot' ? 'forgot-mode' : ''}`}>
                            {/* Sign In */}
                            <div className="auth-face front">
                                <h2>Sign In</h2>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <TextField id="outlined-basic" className='w-100 ' label="Email" variant="outlined" {...register('email', { required: 'Email is required' })} />
                                    {errors.email && <p className="error text-start">{errors.email.message}</p>}

                                    <TextField id="outlined-basic" className='w-100 mt-3' label="Password" variant="outlined" {...register('password', { required: 'Password is required' })} />

                                    {errors.password && <p className="error text-start">{errors.password.message}</p>}
                                    <div className="text-end">
                                        <p className="text-end m-0">
                                            <span
                                                style={{ cursor: "pointer", display: "inline", color: "#007bff" }}
                                                onClick={() => setMode('forgot')}
                                            >
                                                Forgot Password?
                                            </span>
                                        </p>
                                    </div>

                                    <button type="submit">Login</button>
                                    <p>
                                        <italic>You don't have an account?</italic>{' '}
                                        <span onClick={() => setMode('signup')} style={{ color: '#007bff', cursor: 'pointer', textDecoration: 'underline' }}>
                                            Sign Up
                                        </span>
                                    </p>
                                </form>
                            </div>

                            {/* Sign Up */}
                            <div className="auth-face back py-3">
                                <h2>Sign Up</h2>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <TextField id="outlined-basic" className='w-100 ' label="Name" variant="outlined" {...register('name', { required: 'Name is required' })} />
                                    {errors.name && <p className="error text-start">{errors.name.message}</p>}
                                    <TextField id="outlined-basic" className='w-100 mt-2' label="Email" variant="outlined" {...register('email', { required: 'Email is required' })} />
                                    {errors.email && <p className="error text-start">{errors.email.message}</p>}
                                    <TextField id="outlined-basic" className='w-100 mt-2' label="Password" variant="outlined" {...register('password', { required: 'Password is required' })} />
                                    {errors.password && <p className="error text-start">{errors.password.message}</p>}
                                    <button type="submit">Register</button>
                                    <p>
                                        <italic>Already have an account? </italic>
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
    )
}

export default SignIn
