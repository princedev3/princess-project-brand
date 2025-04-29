import React from "react";

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center w-full h-[500px] bg-gradient-to-br from-gray-50 to-gray-200">
  <div className="flex flex-col items-center justify-center gap-4 px-6 py-8 rounded-xl shadow-lg bg-white/70 backdrop-blur-md border border-gray-200">
    <div className="w-14 h-14 border-[5px] border-t-transparent border-teal-500 rounded-full animate-spin shadow-md"></div>
      <div className="text-center">
      <p className="text-gray-800 text-lg font-semibold animate-pulse">
        Getting things ready for you...
      </p>
      <p className="text-sm text-gray-500 mt-1">
      Hang tight &ndash; we&rsquo;re loading something amazing

      </p>
    </div>
  </div>
</div>

  );
};

export default LoadingPage;
