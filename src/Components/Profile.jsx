import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaCalendarAlt,FaKey } from 'react-icons/fa';

const Profile = () => {
    const { user, isAuthenticated } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(true);
  
  // You would typically fetch additional user data here
    useEffect(() => {
    // Simulate loading user data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-6">Please log in to view your profile.</p>
          <Link
            to="/Login"
            className="px-4 py-2 bg-orange-800 text-white rounded-md transition-colors hover:bg-orange-900"
          >
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-800"></div>
      </div>
    );
  }

  const formatCurrentDate = () => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June', 
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const now = new Date();
    return `${months[now.getMonth()]} ${now.getFullYear()}`;
  };

  // Mock data - in a real app, this would come from your state/API
  const profileData = {
    name: user?.name || "Achuth.R",
    email: user?.email || "john.doe@example.com",
    joinDate: user?.joinDate || formatCurrentDate(),
    bio: user?.bio || "Developer",
    avatar: user?.avatar || null
  };
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          {/* Profile Header */}
          <div className="bg-orange-800 px-6 py-10">
            <div className="flex flex-col md:flex-row items-center">
              <div className="h-24 w-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden border-4 border-white">
                {profileData.avatar ? (
                  <img 
                    src={profileData.avatar} 
                    alt="Profile avatar" 
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <FaUser className="text-gray-400 text-4xl" />
                )}
              </div>
              <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left">
                <h1 className="text-2xl font-bold text-white">{profileData.name}</h1>
                <p className="text-white opacity-90">{profileData.bio}</p>
              </div>
            </div>
          </div>
          
          {/* Profile Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left Column - User Info */}
              <div className="md:col-span-2">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Profile Information</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <FaUser className="text-orange-800" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Full Name</p>
                      <p className="text-gray-800">{profileData.name}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <FaEnvelope className="text-orange-800" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="text-gray-800">{profileData.email}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                      <FaCalendarAlt className="text-orange-800" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-500">Member Since</p>
                      <p className="text-gray-800">{profileData.joinDate}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Column - Actions */}
              <div>
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Account</h2>
                
                <div className="space-y-3">
                  <Link
                    to="/forgot-password"
                    className="flex items-center px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                  >
                    <FaKey className="mr-3 text-gray-600" />
                    <span>Forgot Password</span>
                  </Link>
                  
                  <Link
                    to="/Logout"
                    className="flex items-center px-4 py-3 bg-red-100 hover:bg-red-200 rounded-md transition-colors text-red-600"
                  >
                    <span>Logout</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
