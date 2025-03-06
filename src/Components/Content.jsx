import React from 'react';

const Content = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-800 text-gray-200">
            <div className="text-center bg-gray-900 p-8 rounded-lg shadow-lg max-w-lg">
                <h1 className="text-3xl font-bold text-white mb-4">Content Page</h1>
                <p className="text-lg text-gray-400">
                    Welcome to the content page. Here you can find various articles and resources.
                </p>
            </div>
        </div>
    );
}

export default Content;