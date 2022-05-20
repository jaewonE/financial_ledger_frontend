import React from 'react';

export const CircleGraph = ({ message }) => {
  return (
    <div className="w-full h-full mb-6 bg-slate-300 rounded-md mt-2 bluePrint text-2xl">
      {message ? message : 'Circle Graph'}
    </div>
  );
};
