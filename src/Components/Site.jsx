import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Site() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/Login" replace />;
  }

  return (
    <div className="mx-auto">
      <div className="relative overflow-hidden text-white sm:py-16 bg-gray-800">
        {/* Background Image with improved overlay */}
        <div className="absolute inset-0">
          <img
            className="w-full h-full object-cover object-center opacity-50"
            src="/image.png"
            alt="Project Background"
          />
          {/* Dark overlay to improve text readability */}
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>
        
        {/* Content Section */}
        <div className="relative z-10 max-w-screen-xl px-4 pb-10 pt-10 sm:py-24 mx-auto sm:px-6 lg:px-8">
          <div className="max-w-xl mt-8 space-y-8 text-center sm:text-left bg-opacity-60 p-6 rounded-lg">
            <h2 className="text-4xl font-bold sm:text-5xl">
              <span className="text-blue-500">My new project</span>. More than just a project —
              <span className="block"> it's an experience.</span>
            </h2>
            <p className="text-lg">
              Located in Your City, we deliver high-quality solutions, made with precision and expertise.
              Innovative ideas. Robust implementation. Exceptional results. Partner with us and experience the difference!
            </p>
            <div className="mt-6">
              <Link to="/Contact">
                <button className="px-6 py-3 text-lg font-semibold bg-blue-500 text-white rounded-lg flex items-center gap-2 hover:bg-blue-600">
                  <span>📞</span> Contact Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Site;
