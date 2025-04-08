import React from 'react';
import { useSelector } from 'react-redux';

const About = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

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
    <div className="relative w-full h-screen flex items-center justify-center">
  {/* Background Image */}
  <div className="absolute inset-0 w-full h-full">
    <img 
      className="w-full h-full object-cover object-center" 
      src="/image.png" 
      alt="Project Background"
      onError={(e) => e.target.style.display = 'none'} // Hides image if it fails to load
    />
    {/* Overlay for better readability */}
    <div className="absolute inset-0 bg-black bg-opacity-40"></div>
  </div>

  {/* Main Content */}
  <div className="relative z-10 container mx-auto px-6 text-white md:px-12 xl:px-6">
    <div className="flex flex-col md:flex-row items-center gap-8">
      
      {/* Image */}
      <div className="md:w-5/12 lg:w-5/12 rounded-2xl overflow-hidden">
        <img src="/image.png" alt="Our Team" className="w-full h-auto rounded-2xl shadow-lg"/>
      </div>

      {/* Text Content */}
      <div className="md:w-7/12 lg:w-7/12 text-center md:text-left">
        <h2 className="text-5xl font-bold mt-10 md:text-6xl text-blue-400">
          Welcome to Our Company
        </h2>
        <p className="mt-6 text-lg">
          We are a team of passionate developers dedicated to building high-quality web applications using the latest technologies.
        </p>
        <p className="mt-4 text-lg">
          Our mission is to deliver exceptional value to our clients through innovative solutions and unparalleled customer service.
        </p>
      </div>
    </div>
  </div>
</div>
  );
}

export default About;