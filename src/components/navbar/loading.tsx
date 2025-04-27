import React from "react";

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center w-full h-[500px] bg-gray-100">
      <div className="flex flex-col items-center justify-center space-y-4">
        {/* Spinner Animation */}
        <div className="w-16 h-16 border-4 border-t-transparent border-baseGreen rounded-full animate-spin"></div>

        {/* Loading Text */}
        <p className="text-lg font-medium text-gray-700">
          Loading, please wait...
        </p>
      </div>
    </div>
  );
};

export default LoadingPage;
