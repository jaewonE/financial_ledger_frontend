import React from 'react';

export const TopBar = () => {
  return (
    <div className="w-full relative top-0 h-14 flex px-8 md:px-12 border border-x-0 border-t-0">
      <div className="w-full md:w-1/2 h-full flex justify-start items-center">
        Logo
      </div>
      <div className="w-32 md:w-1/2 h-full flex justify-end items-center overflow-hidden">
        {/* <div className="h-1/2 w-5 bg-black rounded-full mr-4">i</div> */}
        <div className="w-7 h-7 md:w-8 md:h-8 border-none rounded-full bg-[#91BAD6] mr-2 flex justify-center items-center">
          <i className="fa-solid fa-user text-lg text-[#C9DCEA]"></i>
        </div>
        <div className="hidden md:block">importjaewone@gmail.com</div>
        <div className="md:hidden block">곽재원</div>
      </div>
    </div>
  );
};
