import React from 'react';
import { CostTable } from '../components/costTable';
import { SideDashBoard } from '../components/sideDashBorad';
import { TopBar } from '../components/topBar';

const Spend = () => {
  return (
    <>
      <TopBar />
      <div className="flex w-full">
        <SideDashBoard />
        <div className="w-full h-full px-24 pt-10 flex flex-col">
          <div className="w-full flex mb-5">
            <div className="w-full flex flex-col justify-start items-center">
              <div className="w-full h-full mb-2 bg-slate-300 rounded-md mt-2 bluePrint text-2xl">
                지출과 수입에 대한 최근 1주일 그래프
              </div>
            </div>
            <div className=" w-64 h-64 bg-slate-300 ml-5 my-2 rounded-md bluePrint ">
              일 평균 지출
            </div>
            <div className=" w-64 h-64 bg-slate-300 ml-5 my-2 rounded-md bluePrint">
              저번달의 일 평균 지출
            </div>
          </div>
          <CostTable status="spend-page" message="지출 내역" />
        </div>
      </div>
    </>
  );
};

export default Spend;
