import React, { useState } from 'react'
import { useSelector } from 'react-redux';

function Contact() {
    const { isAuthenticated } = useSelector((state) => state.auth);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        tel: ''
    });

    const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            setFormData({ name: '', email: '', tel: '' });
        }, 3000);
        }, 1500);
    };
    if (!isAuthenticated) {
        return (
          <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
              <p className="text-gray-600 mb-6">Please log in to view your Contact.</p>
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

  return (
    <div className="relative flex items-top justify-center min-h-screen bg-gray-100 sm:items-center sm:pt-0">
        {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
                <img className="w-full h-full object-cover object-center" 
                src="/image.png" alt="Project Background" />
            </div>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 relative">
                <div className="relative mt-8 bg-gray-200 bg-opacity-90 shadow-md rounded-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Contact Info Section */}
                        <div className="p-6">
                            <h1 className="text-3xl sm:text-4xl text-gray-800 font-extrabold tracking-tight">
                            Get in touch:
                            </h1>
                            <p className="text-lg sm:text-xl font-medium text-gray-600 mt-2">
                            Fill in the form to start a conversation
                            </p>

                        <div className="flex items-center mt-6 text-gray-600">
                        <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                            <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                        <span className="ml-4 text-md font-semibold w-40">Bengaluru,India</span>
                    </div>

                    <div className="flex items-center mt-4 text-gray-600">
                        <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                        </svg>
                        <span className="ml-4 text-md font-semibold w-40">+91 1234567890</span>
                    </div>

                    <div className="flex items-center mt-4 text-gray-600">
                        <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24">
                            <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                        </svg>
                        <span className="ml-4 text-md font-semibold w-40">info@nav.org</span>
                    </div>
                    </div>

                        {/* Contact Form */}
                        <form className="p-6 bg-gray-700 shadow-md rounded-lg flex flex-col justify-center" onSubmit={handleSubmit}>
                            {isSubmitted ? (
                                <div className="bg-green-600 text-white p-4 rounded-lg text-center">
                                    <svg className="w-16 h-16 mx-auto text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                    </svg>
                                    <h3 className="text-xl font-bold mt-2">Thank You!</h3>
                                    <p className="mt-1">Your message has been sent successfully.</p>
                                </div>
                            ) : (
                                <>
                                    <div className="flex flex-col">
                                        <label htmlFor="name" className="sr-only">Full Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Full Name"
                                            className="w-full mt-2 py-3 px-4 rounded-lg bg-white border border-gray-300 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                                            required
                                        />
                                    </div>

                                    <div className="flex flex-col mt-2">
                                        <label htmlFor="email" className="sr-only">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            id="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Email"
                                            className="w-full mt-2 py-3 px-4 rounded-lg bg-white border border-gray-300 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                                            required
                                        />
                                    </div>

                                    <div className="flex flex-col mt-2">
                                        <label htmlFor="tel" className="sr-only">Number</label>
                                        <input
                                            type="tel"
                                            name="tel"
                                            id="tel"
                                            value={formData.tel}
                                            onChange={handleChange}
                                            placeholder="Telephone Number"
                                            className="w-full mt-2 py-3 px-4 rounded-lg bg-white border border-gray-300 text-gray-800 font-semibold focus:border-orange-500 focus:outline-none"
                                            required
                                        />
                                    </div>

                                    <button 
                                        type="submit" 
                                        disabled={isSubmitting}
                                        className={`w-full relative overflow-hidden font-bold py-3 px-6 rounded-lg mt-4 transition duration-300 flex items-center justify-center ${
                                            isSubmitting 
                                                ? 'bg-orange-800 cursor-not-allowed' 
                                                : 'bg-orange-700 hover:bg-orange-600'
                                        }`}
                                    >
                                        <span className={`${isSubmitting ? 'opacity-0' : 'opacity-100'} transition-opacity flex items-center`}>
                                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                            Submit
                                        </span>
                                        {isSubmitting && (
                                            <span className="absolute inset-0 flex items-center justify-center text-white">
                                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                            </span>
                                        )}
                                    </button>
                                </>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default Contact