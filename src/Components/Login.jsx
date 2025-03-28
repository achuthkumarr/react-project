import React, { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginSuccess } from '../actions/authSlice'
import logo from '/logo.png'

function Login() {
    // Navigation and Redux dispatch hooks
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState({});

    // Validation function
    const validateForm = () => {
        const newErrors = {};

        // Email validation
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email is invalid';
        }

        // Password validation
        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            try {
                dispatch(loginSuccess({
                    email: email,
                }));
                navigate('/');
            } catch (error) {
                console.error('Login failed', error);
            }
        }
    };
    {/*const handleGoogleSignIn = () => {
        try {
            dispatch(loginSuccess({
                email: 'google-user@example.com',
            }));
            navigate('/');
        } catch (error) {
            console.error('Google Sign In failed', error);
        }
    };*/}

    return (
        <div className="w-full md:w-full flex flex-col justify-center items-center bg-white bg-opacity-80 p-10">
            <div className="w-full max-w-md">
                {/* Logo Section */}
                <div className="mb-10 flex items-center">
                    <img 
                        src={logo} 
                        alt="Logo" 
                        className="h-10 mr-2" 
                    />
                    <span className="font-medium text-2xl text-black">
                        My React App
                    </span>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} noValidate>
                    <h2 className="text-2xl font-semibold text-left mb-5">
                        Sign In
                    </h2>

                    {/* Email Input */}
                    <div className="mb-4">
                        <input 
                            type="email" 
                            placeholder="Email or Phone" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full p-3 border rounded ${
                                errors.email 
                                ? 'border-red-500 focus:outline-red-500' 
                                : 'border-gray-300'
                            }`}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    {/* Password Input */}
                    <div className="mb-4">
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full p-3 border rounded ${
                                errors.password 
                                ? 'border-red-500 focus:outline-red-500' 
                                : 'border-gray-300'
                            }`}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    {/* Forgot Password */}
                    <div className="text-right text-sm text-black cursor-pointer mb-4 hover:text-blue-500">
                        Forgot Password
                    </div>

                    {/* Sign In Button */}
                    <button 
                        type="submit" 
                        className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-700 mb-4 transition duration-300"
                    >
                        Sign In
                    </button>

                    {/* Divider */}
                    <div className="flex items-center justify-center gap-2 text-gray-500 my-4">
                        <div className="border-t w-2/4"></div>
                        <span>or</span>
                        <div className="border-t w-2/4"></div>
                    </div>

                    {/* Google Sign In Button */}
                    <button 
                        type="button"
                        className="w-full flex items-center justify-center bg-gray-900 text-white gap-2 border py-3 rounded mb-4 hover:bg-gray-700 transition duration-300"
                    >
                        <FcGoogle className="text-xl" /> 
                        Sign in with Google
                    </button>
                </form>

                {/* Sign Up Link */}
                <div className="text-center text-sm">
                    Don't have an account? 
                    <span className="text-black cursor-pointer hover:text-blue-800 ml-1">
                        Sign Up
                    </span>
                </div>
            </div>
        </div>
    )
}
export default Login