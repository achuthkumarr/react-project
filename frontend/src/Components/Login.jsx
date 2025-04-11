import React, { useState, useEffect } from 'react'
import { FcGoogle } from 'react-icons/fc'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginUser, googleAuthUser } from '../actions/authSlice';
import { authService } from '../services/authService'
import logo from '/logo.png'
import { FaTimes } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Login() {
    // Navigation and Redux dispatch hooks
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    
    // Not registered state
    const [showNotRegistered, setShowNotRegistered] = useState(false);
    
    // Forgot password states
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [resetEmail, setResetEmail] = useState("");
    const [resetEmailError, setResetEmailError] = useState("");
    const [resetSent, setResetSent] = useState(false);

    // Validation function
    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        // Email validation
        if (!email) {
            toast.error("Please enter your email address to continue");
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            toast.error("The email address you entered appears to be invalid. Please check and try again");
            isValid = false;
        }

        // Password validation
        if (!password) {
            toast.error("Please enter your password to continue");
            isValid = false;
        } else if (password.length < 6) {
            toast.error("Your password must be at least 6 characters long");
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
            await dispatch(loginUser(email, password));
            toast.success("Login successful! Welcome back.");
            navigate('/');
          } catch (error) {
            console.error('Login failed', error);
            
            // Check if the error is due to user not being registered
            if (error.message === 'User not found' || 
                error.response?.data?.message === 'User not found' ||
                error.response?.status === 404) {
              setShowNotRegistered(true);
            } else {
              const errorMsg = error.message || 'Authentication failed';
              toast.error(`Login failed: ${errorMsg}. Please try again.`);
              setErrors(prev => ({ ...prev, auth: errorMsg }));
            }
          }
        }
    };

    // Navigate to register page
    const navigateToRegister = () => {
        navigate('/register');
    };

    // Close not registered modal
    const closeNotRegisteredModal = () => {
        setShowNotRegistered(false);
    };

    // Handle forgot password dialog open
    const handleForgotPasswordClick = () => {
        setShowForgotPassword(true);
        setResetEmail(email); // Pre-fill with email from login form if available
        setResetSent(false);
        setResetEmailError("");
    };

    // Close forgot password modal
    const closeForgotPasswordModal = () => {
        setShowForgotPassword(false);
    };

    // Validate reset email
    const validateResetEmail = () => {
        if (!resetEmail) {
            setResetEmailError('Email is required');
            toast.error("Please enter your email address to receive password reset instructions");
            return false;
        } else if (!/\S+@\S+\.\S+/.test(resetEmail)) {
            setResetEmailError('Email is invalid');
            toast.error("The email address you entered appears to be invalid. Please check and try again");
            return false;
        }
        setResetEmailError("");
        return true;
    };

    // Handle password reset submit
    const handleResetSubmit = async (e) => {
        e.preventDefault();
        
        if (validateResetEmail()) {
          try {
            await authService.forgotPassword(resetEmail);
            setResetSent(true);
            toast.success(`Password reset instructions have been sent to ${resetEmail}. Please check your inbox.`);
          } catch (error) {
            // Check if the error is due to user not being registered
            if (error.message === 'User not found' || 
                error.response?.data?.message === 'User not found' ||
                error.response?.status === 404) {
              setShowNotRegistered(true);
              closeForgotPasswordModal();
              toast.error(`We couldn't find an account with the email ${resetEmail}. Would you like to create a new account?`);
            } else {
              const errorMsg = error.message || 'Failed to send reset email';
              setResetEmailError(errorMsg);
              toast.error(`Failed to send reset email: ${errorMsg}. Please try again later.`);
            }
          }
        }
    };

    // Handle Google authentication
    const handleGoogleSignIn = async () => {
        try {
          // Simulate Google response for demo
          const mockGoogleResponse = {
            googleId: "google-id",
            profileObj: { email: email || "user@example.com" }
          };
          
          await dispatch(googleAuthUser({
            googleId: mockGoogleResponse.googleId,
            email: mockGoogleResponse.profileObj.email
          }));
          
          toast.success("Google sign-in successful! Welcome back.");
          navigate('/');
        } catch (error) {
          console.error('Google sign-in failed', error);
          
          // Check if the error is due to user not being registered
          if (error.message === 'User not found' || 
              error.response?.data?.message === 'User not found' ||
              error.response?.status === 404) {
            setShowNotRegistered(true);
          } else {
            const errorMsg = error.message || 'Google authentication failed';
            toast.error(`Google sign-in failed: ${errorMsg}. Please try again.`);
          }
        }
    };

    // Clear errors when inputs change
    useEffect(() => {
        if (email) {
            setErrors(prev => ({ ...prev, email: undefined }));
        }
        if (password) {
            setErrors(prev => ({ ...prev, password: undefined }));
        }
    }, [email, password]);

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
                        LogIn to Your Account
                    </h2>

                    {/* Display auth error if any */}
                    {errors.auth && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                            {errors.auth}
                        </div>
                    )}

                    {/* Email Input */}
                    <div className="mb-4">
                        <input 
                            type="email" 
                            placeholder="Email" 
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
                    <div className="mb-2">
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
                    <div 
                        className="text-right text-base text-black cursor-pointer mb-2 hover:text-blue-500"
                        onClick={handleForgotPasswordClick}
                    >
                        Forgot Password
                    </div>

                    {/* Sign In Button */}
                    <button 
                        type="submit" 
                        className="w-full bg-blue-700 text-white text-base py-3 rounded hover:bg-blue-900 mb-4 transition duration-300"
                    >
                        LogIn
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
                        className="w-full flex items-center justify-center bg-black text-white gap-2 border py-3 rounded mb-4 hover:bg-blue-900 transition duration-300"
                        onClick={handleGoogleSignIn}
                    >
                        <FcGoogle className="text-xl" /> 
                        Sign in with Google
                    </button>
                </form>

                {/* Sign Up Link */}
                <div className="text-center text-base font-medium">
                    Don't have an account? 
                    <span 
                        className="text-black cursor-pointer hover:text-blue-800 ml-1"
                        onClick={navigateToRegister}
                    >
                        Sign Up
                    </span>
                </div>
            </div>

            {/* Not Registered Modal */}
            {showNotRegistered && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                        {/* Close button */}
                        <button 
                            onClick={closeNotRegisteredModal}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                        >
                            <FaTimes />
                        </button>

                        <div className="text-center py-4">
                            <div className="mb-4 text-yellow-500 text-4xl">!</div>
                            <h3 className="text-lg font-medium mb-2">Account Not Found</h3>
                            <p className="text-gray-600 mb-6">
                                We couldn't find an account with the email <strong>{email}</strong>. Would you like to create a new account?
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <button 
                                    onClick={() => {
                                        toast.info("Redirecting you to the registration page to create a new account");
                                        navigateToRegister();
                                    }}
                                    className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-300"
                                >
                                    Create Account
                                </button>
                                <button 
                                    onClick={closeNotRegisteredModal}
                                    className="bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 transition duration-300"
                                >
                                    Try Again
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Forgot Password Modal */}
            {showForgotPassword && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
                        {/* Close button */}
                        <button 
                            onClick={closeForgotPasswordModal}
                            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                        >
                            <FaTimes />
                        </button>

                        <h2 className="text-xl font-semibold mb-4">
                            Reset Your Password
                        </h2>

                        {!resetSent ? (
                            <>
                                <p className="text-gray-600 mb-6">
                                    Enter your email address and we will send you instructions to reset your password.
                                </p>

                                <form onSubmit={handleResetSubmit}>
                                    <div className="mb-4">
                                        <input 
                                            type="email" 
                                            placeholder="Email Address" 
                                            value={resetEmail}
                                            onChange={(e) => setResetEmail(e.target.value)}
                                            className={`w-full p-3 border rounded ${
                                                resetEmailError 
                                                ? 'border-red-500 focus:outline-red-500' 
                                                : 'border-gray-300'
                                            }`}
                                        />
                                        {resetEmailError && (
                                            <p className="text-red-500 text-sm mt-1">
                                                {resetEmailError}
                                            </p>
                                        )}
                                    </div>

                                    <button 
                                        type="submit" 
                                        className="w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-700 transition duration-300"
                                    >
                                        Send Reset Instructions
                                    </button>
                                </form>
                            </>
                        ) : (
                            <div className="text-center py-4">
                                <div className="mb-4 text-green-500 text-4xl">✓</div>
                                <h3 className="text-lg font-medium mb-2">Email Sent</h3>
                                <p className="text-gray-600 mb-6">
                                    Password reset instructions have been sent to <strong>{resetEmail}</strong>
                                </p>
                                <button 
                                    onClick={() => {
                                        closeForgotPasswordModal();
                                        toast.info("You've been returned to the login page. Check your email for reset instructions.");
                                    }}
                                    className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-300"
                                >
                                    Return to Login
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
            
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

export default Login