import React, { useState, useEffect } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { registerUser, googleAuthUser } from '../actions/authSlice'
import logo from '/logo.png'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Register() {
    // Navigation and Redux dispatch hooks
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Form state
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [bio, setBio] = useState(""); // Added bio state with default value
    const [errors, setErrors] = useState({});

    // Validation function
    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        // Name validation
        if (!fullName) {
            toast.error("Please enter your full name to create your account");
            isValid = false;
        }

        // Email validation
        if (!email) {
            toast.error("Please enter your email address to create your account");
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            toast.error("The email address you entered appears to be invalid. Please check and try again");
            isValid = false;
        }

        // Password validation
        if (!password) {
            toast.error("Please enter a password to secure your account");
            isValid = false;
        } else if (password.length < 6) {
            toast.error("Your password must be at least 6 characters long for security purposes");
            isValid = false;
        }

        // Confirm password validation
        if (!confirmPassword) {
            toast.error("Please confirm your password by entering it again");
            isValid = false;
        } else if (confirmPassword !== password) {
            toast.error("The passwords you entered don't match. Please try again");
            isValid = false;
        }

        // Bio validation (optional - only if you want to set requirements)
        if (bio && bio.length > 160) {
            toast.error("Your bio exceeds the maximum length of 160 characters");
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            try {
                await dispatch(registerUser({
                    fullName,
                    email,
                    password,
                    bio, // Include bio in registration data
                }));
                toast.success(`Account created successfully! Welcome, ${fullName}!`);
                navigate('/');
            } catch (error) {
                console.error('Registration failed', error);
                
                // Handle specific error cases
                if (error.response?.status === 409 || 
                    error.message?.includes('Email already exists') || 
                    error.response?.data?.message?.includes('Email already exists')) {
                    toast.error(`An account with the email ${email} already exists. Please try logging in instead.`);
                } else {
                    const errorMsg = error.message || 'Registration failed';
                    toast.error(`Registration failed: ${errorMsg}. Please try again.`);
                }
                
                setErrors(prev => ({ ...prev, auth: error.message || 'Registration failed' }));
            }
        }
    };

    // Handle Google authentication
    const handleGoogleSignUp = async () => {
        try {
            // Simulate Google response for demo
            const mockGoogleResponse = {
                googleId: "google-id",
                profileObj: { email: email || "user@example.com" }
            };
            
            await dispatch(googleAuthUser({
                googleId: mockGoogleResponse.googleId,
                email: mockGoogleResponse.profileObj.email,
                bio // Include bio for Google sign-up too
            }));
            
            toast.success("Google sign-up successful! Your account has been created.");
            navigate('/');
        } catch (error) {
            console.error('Google sign-up failed', error);
            
            // Handle specific error cases
            if (error.response?.status === 409 || 
                error.message?.includes('Email already exists') || 
                error.response?.data?.message?.includes('Email already exists')) {
                toast.error(`An account with this Google email already exists. Please try logging in instead.`);
            } else {
                const errorMsg = error.message || 'Google authentication failed';
                toast.error(`Google sign-up failed: ${errorMsg}. Please try again.`);
            }
            
            setErrors(prev => ({ ...prev, auth: error.message || 'Google authentication failed' }));
        }
    };

    // Navigate to login page
    const navigateToLogin = () => {
        toast.info("Redirecting you to the login page");
        navigate('/login');
    };

    // Clear errors when inputs change
    useEffect(() => {
        if (fullName) {
            setErrors(prev => ({ ...prev, fullName: undefined }));
        }
        if (email) {
            setErrors(prev => ({ ...prev, email: undefined }));
        }
        if (password) {
            setErrors(prev => ({ ...prev, password: undefined }));
        }
        if (confirmPassword) {
            setErrors(prev => ({ ...prev, confirmPassword: undefined }));
        }
        if (bio) {
            setErrors(prev => ({ ...prev, bio: undefined }));
        }
    }, [fullName, email, password, confirmPassword, bio]);

    // Reset form handler
    const handleReset = () => {
        setFullName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setBio("");
        setErrors({});
        toast.info("Registration form has been reset");
    };

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

                {/* Register Form */}
                <form onSubmit={handleSubmit} noValidate>
                    <h2 className="text-2xl font-semibold text-left mb-5">
                        Create Account
                    </h2>

                    {/* Display auth error if any */}
                    {errors.auth && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                            {errors.auth}
                        </div>
                    )}

                    {/* Full Name Input */}
                    <div className="mb-4">
                        <input 
                            type="text" 
                            placeholder="Full Name" 
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className={`w-full p-3 border rounded ${
                                errors.fullName 
                                ? 'border-red-500 focus:outline-red-500' 
                                : 'border-gray-300'
                            }`}
                        />
                        {errors.fullName && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.fullName}
                            </p>
                        )}
                    </div>

                    {/* Email Input */}
                    <div className="mb-4">
                        <input 
                            type="email" 
                            placeholder="Email Address" 
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

                    {/* Bio Input */}
                    <div className="mb-4">
                        <textarea
                            placeholder="Short bio (optional)"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            className={`w-full p-3 border rounded resize-none ${
                                errors.bio
                                ? 'border-red-500 focus:outline-red-500'
                                : 'border-gray-300'
                            }`}
                            rows="3"
                        />
                        <p className={`text-xs mt-1 ${bio.length > 160 ? 'text-red-500' : 'text-gray-500'}`}>
                            {bio ? bio.length : 0}/160 characters
                        </p>
                        {errors.bio && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.bio}
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

                    {/* Confirm Password Input */}
                    <div className="mb-4">
                        <input 
                            type="password" 
                            placeholder="Confirm Password" 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className={`w-full p-3 border rounded ${
                                errors.confirmPassword 
                                ? 'border-red-500 focus:outline-red-500' 
                                : 'border-gray-300'
                            }`}
                        />
                        {errors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.confirmPassword}
                            </p>
                        )}
                    </div>

                    {/* Form Buttons */}
                    <div className="flex gap-3 mb-4">
                        <button 
                            type="submit" 
                            className="flex-1 bg-blue-500 text-white py-3 rounded hover:bg-blue-700 transition duration-300"
                        >
                            Create Account
                        </button>
                        <button 
                            type="button" 
                            onClick={handleReset}
                            className="px-4 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition duration-300"
                        >
                            Reset
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center justify-center gap-2 text-gray-500 my-4">
                        <div className="border-t w-2/4"></div>
                        <span>or</span>
                        <div className="border-t w-2/4"></div>
                    </div>

                    {/* Google Sign Up Button */}
                    <button 
                        type="button"
                        className="w-full flex items-center justify-center bg-gray-900 text-white gap-2 border py-3 rounded mb-4 hover:bg-gray-700 transition duration-300"
                        onClick={handleGoogleSignUp}
                    >
                        <FcGoogle className="text-xl" /> 
                        Sign up with Google
                    </button>
                </form>

                {/* Login Link */}
                <div className="text-center text-sm">
                    Already have an account? 
                    <span 
                        className="text-black cursor-pointer hover:text-blue-800 ml-1"
                        onClick={navigateToLogin}
                    >
                        Log In
                    </span>
                </div>
            </div>
            
            {/* Toast Container */}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </div>
    )
}

export default Register