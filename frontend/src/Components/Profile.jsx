import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaCalendarAlt, FaKey, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import { authService } from '../services/authService';
import { updateProfile } from '../actions/authSlice';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Profile = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState("");
  
  // Edit states
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    email: ""
  });
  
  // Password change states
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [passwordUpdateSuccess, setPasswordUpdateSuccess] = useState(false);

  // Forgot password states
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetEmailError, setResetEmailError] = useState("");
  const [resetSent, setResetSent] = useState(false);
  
  useEffect(() => {
    // Fetch user profile data
    const fetchUserData = async () => {
      try {
        const userData = await authService.getCurrentUser();
        
        // Update redux store with latest user data
        dispatch({
          type: 'auth/updateUserProfile',
          payload: userData.user // Updated to match the structure from our backend
        });
        
        // Set edit data with current values
        setEditData({
          name: userData.user?.name || user?.name || "User",
          email: userData.user?.email || user?.email || ""
        });
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };
    
    if (isAuthenticated && token) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, token, dispatch, user?.name, user?.email]);

  // Handle edit form input changes
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value
    });
  };
  
  // Validate the edit form
  const validateEditForm = () => {
    const errors = {};
    if (!editData.name.trim()) {
      errors.name = "Name is required";
    }
    
    if (!editData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(editData.email)) {
      errors.email = "Email is invalid";
    }
    
    return errors;
  };
  
  // Handle edit form submission
  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    const errors = validateEditForm();
    
    if (Object.keys(errors).length === 0) {
      try {
        await dispatch(updateProfile(editData));
        
        setIsEditing(false);
        setUpdateSuccess(true);
        toast.success("Profile updated successfully!");
        
        // Hide success message after 3 seconds
        setTimeout(() => {
          setUpdateSuccess(false);
        }, 3000);
      } catch (error) {
        console.error("Error updating profile:", error);
        toast.error(error.message || "Failed to update profile"); 
        setUpdateError(error.message || "Failed to update profile");
        
        // Hide error message after 3 seconds
        setTimeout(() => {
          setUpdateError("");
        }, 3000);
      }
    }
  };
  
  // Handle password form input changes
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
  };
  
  // Validate password change form
  const validatePasswordForm = () => {
    const errors = {};
    
    if (!passwordData.currentPassword) {
      errors.currentPassword = "Current password is required";
    }
    
    if (!passwordData.newPassword) {
      errors.newPassword = "New password is required";
    } else if (passwordData.newPassword.length < 6) {
      errors.newPassword = "Password must be at least 6 characters";
    }
    
    if (!passwordData.confirmPassword) {
      errors.confirmPassword = "Please confirm your new password";
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    
    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Handle password update submission
  const handleSubmitPasswordChange = async (e) => {
    e.preventDefault();
    
    if (validatePasswordForm()) {
      try {
        await authService.changePassword({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        });
        
        // Reset form and show success
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: ""
        });
        
        setPasswordUpdateSuccess(true);
        toast.success("Password updated successfully!");
        
        // Hide success message and modal after 2 seconds
        setTimeout(() => {
          setPasswordUpdateSuccess(false);
          setShowPasswordModal(false);
        }, 2000);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to change password");
        setPasswordErrors({
          ...passwordErrors,
          auth: error.response?.data?.message || "Failed to change password"
        });
      }
    }
  };
  
  // Handle forgot password dialog open
  const handleForgotPasswordClick = () => {
    setShowForgotPasswordModal(true);
    setResetEmail(user?.email || "");
    setResetSent(false);
    setResetEmailError("");
  };

  // Close forgot password modal
  const closeForgotPasswordModal = () => {
    setShowForgotPasswordModal(false);
  };

  // Validate reset email
  const validateResetEmail = () => {
    if (!resetEmail) {
      setResetEmailError('Email is required');
      toast.error('Email is required');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(resetEmail)) {
      setResetEmailError('Email is invalid');
      toast.error('Email is invalid');
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
        toast.success("Password reset instructions sent to your email");
        
        // Close modal after 3 seconds
        setTimeout(() => {
          setShowForgotPasswordModal(false);
        }, 3000);
      } catch (error) {
        setResetEmailError(error.response?.data?.message || 'Failed to send reset email');
        toast.error(error.response?.data?.message || 'Failed to send reset email');
      }
    }
  };

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

  // Use real data from state or mock it if not available
  const profileData = {
    name: user?.name || editData.name || "User",
    email: user?.email || editData.email || "user@example.com",
    joinDate: user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : formatCurrentDate(),
    bio: user?.bio || "Developer",
    avatar: user?.profilePicture || null
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
     />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {updateSuccess && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded flex items-center justify-between">
            <div>Profile updated successfully!</div>
            <button onClick={() => setUpdateSuccess(false)}>
              <FaTimes />
            </button>
          </div>
        )}
        
        {updateError && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded flex items-center justify-between">
            <div>{updateError}</div>
            <button onClick={() => setUpdateError("")}>
              <FaTimes />
            </button>
          </div>
        )}
        
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
              <div className="md:ml-6 mt-4 md:mt-0 text-center md:text-left flex-grow">
                <h1 className="text-2xl font-bold text-white">{profileData.name}</h1>
                <p className="text-white opacity-90">{profileData.bio}</p>
              </div>
              {!isEditing && (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="bg-white text-orange-800 px-4 py-2 rounded-md hover:bg-orange-100 transition-colors flex items-center"
                >
                  <FaEdit className="mr-2" /> Edit Profile
                </button>
              )}
            </div>
          </div>
          
          {/* Profile Content */}
          <div className="p-6">
            {isEditing ? (
              <form onSubmit={handleSubmitEdit} className="mb-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Edit Profile</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={editData.name}
                      onChange={handleEditChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={editData.email}
                      onChange={handleEditChange}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                </div>
                
                <div className="mt-6 flex space-x-4">
                  <button
                    type="submit"
                    className="bg-orange-800 text-white px-4 py-2 rounded-md hover:bg-orange-900 transition-colors flex items-center"
                  >
                    <FaCheck className="mr-2" /> Save Changes
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors flex items-center"
                  >
                    <FaTimes className="mr-2" /> Cancel
                  </button>
                </div>
              </form>
            ) : (
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
                    <button
                      onClick={() => setShowPasswordModal(true)}
                      className="flex items-center w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                    >
                      <FaKey className="mr-3 text-gray-600" />
                      <span>Change Password</span>
                    </button>
                    
                    <button
                      onClick={handleForgotPasswordClick}
                      className="flex items-center w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                    >
                      <FaKey className="mr-3 text-gray-600" />
                      <span>Forgot Password</span>
                    </button>
                    
                    <Link
                      to="/Logout"
                      className="flex items-center px-4 py-3 bg-red-100 hover:bg-red-200 rounded-md transition-colors text-red-600"
                    >
                      <span>Logout</span>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
            <button 
              onClick={() => setShowPasswordModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
            
            <h2 className="text-xl font-semibold mb-4">Change Password</h2>
            
            {passwordUpdateSuccess ? (
              <div className="text-center py-4">
                <div className="mb-4 text-green-500 text-4xl">✓</div>
                <h3 className="text-lg font-medium mb-2">Password Updated</h3>
                <p className="text-gray-600 mb-6">
                  Your password has been successfully updated.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitPasswordChange}>
                {passwordErrors.auth && (
                  <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                    {passwordErrors.auth}
                  </div>
                )}
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                  <input 
                    type="password" 
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className={`w-full p-2 border rounded-md ${
                      passwordErrors.currentPassword 
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                      : 'border-gray-300 focus:ring-orange-500 focus:border-orange-500'
                    }`}
                  />
                  {passwordErrors.currentPassword && (
                    <p className="text-red-500 text-sm mt-1">{passwordErrors.currentPassword}</p>
                  )}
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                  <input 
                    type="password" 
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className={`w-full p-2 border rounded-md ${
                      passwordErrors.newPassword 
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                      : 'border-gray-300 focus:ring-orange-500 focus:border-orange-500'
                    }`}
                  />
                  {passwordErrors.newPassword && (
                    <p className="text-red-500 text-sm mt-1">{passwordErrors.newPassword}</p>
                  )}
                </div>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                  <input 
                    type="password" 
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className={`w-full p-2 border rounded-md ${
                      passwordErrors.confirmPassword 
                      ? 'border-red-500 focus:ring-red-500 focus:border-red-500' 
                      : 'border-gray-300 focus:ring-orange-500 focus:border-orange-500'
                    }`}
                  />
                  {passwordErrors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{passwordErrors.confirmPassword}</p>
                  )}
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-orange-800 text-white py-2 rounded-md hover:bg-orange-900 transition-colors"
                >
                  Update Password
                </button>
              </form>
            )}
          </div>
        </div>
      )}
      
      {/* Forgot Password Modal */}
      {showForgotPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
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
                    className="w-full bg-orange-800 text-white py-3 rounded hover:bg-orange-900 transition duration-300"
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
                  onClick={closeForgotPasswordModal}
                  className="bg-orange-800 text-white px-6 py-2 rounded hover:bg-orange-900 transition duration-300"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default Profile;