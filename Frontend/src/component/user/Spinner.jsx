import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <svg
        className="animate-spin h-5 w-5 mr-3 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.373A8 8 0 0012 20v-4c-3.314 0-6-2.686-6-6H0c0 4.962 4.037 9 9 9z"
        ></path>
      </svg>
      Processing...
    </div>
  );
};

export default Spinner;
