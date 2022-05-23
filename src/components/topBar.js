import React from 'react';
import { Link } from 'react-router-dom';

export const TopBar = ({ showProfile = true }) => {
  return (
    <div
      style={{ position: 'fixed' }}
      className="w-full top-0 h-14 flex pl-4 pr-4 pb-1 md:pr-12 border border-x-0 border-t-0 z-20 bg-white"
    >
      <div className="w-full md:w-1/2 h-full flex justify-start items-center">
        <Link
          to="/"
          className="outline-none focus:outline-none font-extrabold text-transparent text-xl md:text-2xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
        >
          WalletHelper
        </Link>
      </div>
      <Link
        to="/profile"
        className={`w-32 md:w-1/2 h-full flex justify-end items-center overflow-hidden ${
          showProfile ? 'block' : 'hidden'
        }`}
      >
        {/* <div className="h-1/2 w-5 bg-black rounded-full mr-4">i</div> */}
        <div className="w-7 h-7 md:w-8 md:h-8 border-none rounded-full bg-[#91BAD6] mr-2 flex justify-center items-center">
          <i className="fa-solid fa-user text-lg text-[#C9DCEA]"></i>
        </div>
        <div className="hidden md:block">importjaewone@gmail.com</div>
        <div className="md:hidden block">곽재원</div>
      </Link>
    </div>
  );
};
