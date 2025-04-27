"use client";

import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex items-center py-10 justify-center  bg-gray-100 text-black">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold mb-4">404</h1>
        <p className="text-xl mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link href="/">
          <span className="inline-block py-2 px-6 bg-baseGreen rounded-lg text-white text-lg  transition duration-300">
            Back to Home
          </span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
