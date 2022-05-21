import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="w-screen h-screen m-0 p-0 flex justify-center items-center bg-[#f1f1f4]">
      <div className="w-5/6 sm:w-[600px] h-80 shadow-2xl flex flex-col justify-center items-center bg-white">
        <span className="text-4xl font-semibold pb-3">404 Not Found</span>
        <Link to={'/'} className="underline text-blue-500 text-lg">
          <span>go to homepage</span>
          <i className="pl-2 text-center text-base font-bold fa-solid fa-arrow-right"></i>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
