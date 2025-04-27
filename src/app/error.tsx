"use client";
export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html>
      <body className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Something went wrong!
          </h2>
          <p className="text-gray-700 mb-6">{error.message}</p>
          <button
            onClick={reset}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
