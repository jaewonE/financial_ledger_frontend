import React from 'react';
import { colorsProps } from '../props/color';

export const Top3Box = ({ data, title }) => {
  return (
    <div className="w-full h-full flex flex-col justify-start items-start px-8 py-5 border shadow-lg">
      <span className="text-lg font-semibold mb-6">{title}</span>
      {data.map((row, index) => (
        <div
          key={index}
          className={`w-full flex justify-start items-center text-xs sm:text-base ${
            index === data.length - 1
              ? 'mb-0'
              : 'mb-3 pb-2 border-2 border-gray-300 border-t-0 border-x-0'
          }`}
        >
          <div
            style={{ backgroundColor: colorsProps[index], color: '#FDFDFE' }}
            className="w-4 h-4 sm:w-6 sm:h-6 rounded-lg mr-6 flex justify-center items-center font-semibold
            "
          >
            {row.rank}
          </div>
          <div className="flex justify-evenly h-full w-full">
            <div className="w-1/3 h-full flex justify-start items-center">
              {row.storeName}
            </div>
            <div className="w-1/3 h-full flex justify-center items-center">
              {row.times}
            </div>
            <div className="w-1/3 h-full flex justify-end items-center">
              {row.money}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
