import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { routeList } from '../route-info';
import { SideDashBoard } from './sideDashBorad';
import { TopBar } from './topBar';

const BaseWrapper = ({ children }) => {
  const [location, setLocation] = useState('대시보드');
  const { pathname } = useLocation();
  useEffect(() => {
    routeList.forEach((route) => {
      if (route.herf === pathname) {
        setLocation(route.name);
      }
    });
  }, [pathname]);
  return (
    <>
      <TopBar />
      <div className="flex w-full h-auto text-lg">
        <SideDashBoard />
        <div className="w-full flex flex-col h-auto">
          <div className="w-full h-12 pl-5 flex items-center text-gray-600 text-base font-semibold mb-2 border border-t-0">
            {location}
          </div>
          <div className="w-full pt-10 px-10 flex flex-col items-center justify-start h-auto bg-[#FDFDFE]">
            <div className="w-full max-w-6xl h-auto flex flex-col items-center justify-between relative">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BaseWrapper;
