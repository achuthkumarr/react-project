import React from 'react';

const About = () => {
  return (
    <div className="py-16 bg-white">
      <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
        <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
          <div className="md:w-5/12 lg:w-5/12 rounded-2xl overflow-hidden">
            <img
              src="/about.jpg"
              alt="About Us"
            />
          </div>
          <div className="md:w-7/12 lg:w-6/12">
            <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
              Welcome to Our Company
            </h2>
            <p className="mt-6 text-gray-600">
              We are a team of passionate developers dedicated to building high-quality web applications using the latest technologies.
            </p>
            <p className="mt-4 text-gray-600">
              Our mission is to deliver exceptional value to our clients through innovative solutions and unparalleled customer service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;