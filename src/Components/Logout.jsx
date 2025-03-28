import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../actions/authSlice';

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Dispatch logout action
    dispatch(logout());

    // Redirect to login page after a short delay
    const redirectTimer = setTimeout(() => {
      navigate('/Login');
    }, 2000);

    // Cleanup the timer if component unmounts
    return () => clearTimeout(redirectTimer);
  }, [dispatch, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Logging Out
        </h1>
        <p className="text-gray-600 mb-6">
          You are being logged out. Please wait...
        </p>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        </div>
        <p className="mt-6 text-sm text-gray-500">
          You will be redirected to the login page shortly.
        </p>
      </div>
    </div>
  );
}

export default Logout;