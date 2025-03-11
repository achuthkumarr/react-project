import React from 'react'
import { FcGoogle } from 'react-icons/fc'

import backgroundImage from '/Background.png'

function Login() {
    return (
        <div className="flex bg-cover bg-center w-screen h-screen" style={{ backgroundImage: `url(${backgroundImage})` }}>
            {/* Left Section - Login Form */}
            <div className="w-full md:w-full flex flex-col justify-center items-center mb-20 bg-opacity-80 p-10">
                <div className="w-full max-w-md">
                    <div className="mb-10 flex justify-left text-2xl">
                        <img src="/logo.png" alt="Logo" className="h-10 " />
                        <span className="font-medium text-2xl pt-1 text-black pl-2">My React App</span>
                    </div>
                    <h2 className="text-2xl font-semibold text-left mb-5 ml-4">Sign In</h2>
                    <input type="text" placeholder="Email or Phone" className="w-full ml-4 p-3 border border-white rounded mb-4" />
                    <input type="password" placeholder="Password" className="w-full ml-4 p-3 border rounded mb-2 border-white" />
                    <div className="text-right text-sm text-black cursor-pointer mb-4 hover:text-blue-500">Forgot Password</div>
                    <button className="w-full ml-4 bg-blue-500 text-white py-3 rounded hover:bg-blue-700 mb-4">Sign In</button>
                    <div className="flex ml-6 items-center justify-center gap-2 text-gray-500 my-4">
                        <div className="border-t w-2/4"></div>
                        <span>or</span>
                        <div className="border-t w-2/4"></div>
                    </div>
                    <button className="w-full ml-4 flex items-center justify-center bg-gray-900 text-white gap-2 border py-3 rounded mb-4 hover:bg-blue-600">
                        <FcGoogle className="text-xl" /> Sign in with Google
                    </button>
                    <div className="text-center text-sm">
                        Don't have an account? <span className="text-black cursor-pointer hover:text-blue-800">Sign Up</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login