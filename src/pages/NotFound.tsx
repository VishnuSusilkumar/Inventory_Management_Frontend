import React from "react";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <svg
        className="w-64 h-64 mb-8"
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="200" height="200" rx="100" fill="#F3F4F6" />
        <path
          d="M65 100C65 87.2975 75.2975 77 88 77H112C124.703 77 135 87.2975 135 100V123C135 135.703 124.703 146 112 146H88C75.2975 146 65 135.703 65 123V100Z"
          fill="#111827"
        />
        <circle cx="88" cy="100" r="8" fill="white" />
        <circle cx="112" cy="100" r="8" fill="white" />
        <path
          d="M82 123C82 123 86 130 100 130C114 130 118 123 118 123"
          stroke="white"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </svg>
      <h1 className="text-6xl font-bold text-black mb-4">404</h1>
      <p className="text-2xl text-gray-600 mb-8 text-center">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="bg-black text-white font-bold py-2 px-4 rounded transition-colors hover:bg-gray-800 flex items-center"
      >
        <Home size={20} className="mr-2" />
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
