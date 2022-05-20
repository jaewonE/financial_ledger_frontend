import React from 'react';

export const TopBar = () => {
  return (
    <div className="relative top-0 h-14 flex px-12 border border-x-0 border-t-0">
      <div className="w-1/2 h-full flex justify-start items-center">Logo</div>
      <div className="w-1/2 h-full flex justify-end items-center overflow-hidden">
        {/* <div className="h-1/2 w-5 bg-black rounded-full mr-4">i</div> */}
        <div className="w-8 h-8 border-none rounded-full bg-[#91BAD6] mr-2 flex justify-center items-center">
          <i className="fa-solid fa-user text-lg text-[#C9DCEA]"></i>
        </div>
        <div>importjaewone@gmail.com</div>
      </div>
    </div>
  );
};
