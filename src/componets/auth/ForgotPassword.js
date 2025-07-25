import TextField from '@mui/material/TextField';
import React from 'react'
import { useForm } from 'react-hook-form'

const ForgotPassword = ({ onBack }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log('Forgot Password Data:', data);
    };

    return (
        <div className="auth-face forgot">
            <h2>Forgot Password</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField id="outlined-basic" className='w-100 ' size="small" label="Email" variant="outlined" {...register('email', { required: 'Email is required' })} />
                {errors.email && <p className="error text-start">{errors.email.message}</p>}
                <button type="submit">Send Reset Link</button>
                <p><span onClick={onBack}>Back to Sign In</span></p>
            </form>
        </div>
    );
};

export default ForgotPassword;
