function Site() {
return (
    <div className=" mx-auto">
        <div className="relative overflow-hidden text-white  mx-0  sm:py-16 bg-gray-800">
            <div className="relative z-10 max-w-screen-xl px-4 pb-10 pt-10 sm:py-24 mx-auto sm:px-6 lg:px-8">
                <div className="max-w-xl mt-8 space-y-8 text-center sm:text-left">
                    <h2 className="text-4xl font-bold sm:text-5xl">
                        <span className="text-blue-500">My new project</span>. More than just a project —
                        <span className="block"> it's an experience.</span>
                    </h2>
                    <p className="text-lg">
                        Located in Your City, we deliver high-quality solutions, made with precision and expertise.
                        Innovative ideas. Robust implementation. Exceptional results. Partner with us and experience the difference!
                    </p>
                    <div className="mt-6">
                        <button className="px-6 py-3 text-lg font-semibold bg-blue-500 text-white rounded-lg flex items-center gap-2 hover:bg-blue-600">
                            <span>📞</span> Contact Us
                        </button>
                    </div>
                </div>
            </div>

            <div className="absolute inset-0 w-full h-full">
                <img className="w-full h-full object-cover object-center opacity-60" 
                src="/image.png" alt="Project Background" />
            </div>
        </div>
    </div>
);
}

export default Site;
