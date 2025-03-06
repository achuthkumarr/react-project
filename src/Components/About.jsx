import React from 'react';

const About = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800 text-gray-200 p-6">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-2xl text-center">
        <h1 className="text-3xl font-bold text-white mb-4">About Us</h1>
        <p className="text-lg text-gray-400 mb-2">
          Welcome to our project! We are dedicated to building amazing web applications using modern technologies.
        </p>
        <p className="text-lg text-gray-400">
          Our team consists of experienced developers who are passionate about creating high-quality software.
        </p>
      </div>
    </div>
  );
}

export default About;