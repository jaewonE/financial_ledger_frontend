import React from 'react';
import { DashCard } from '../components/dashCard';
import { CostTable } from '../components/costTable';
import { LineGraph } from '../components/lineGraph';
import { SideDashBoard } from '../components/sideDashBorad';
import { TopBar } from '../components/topBar';
import { CircleChat } from '../components/circleChat';

const DashBoard = () => {
  return (
    <>
      <TopBar />
      <div className="flex w-full">
        <SideDashBoard />
        <div className="w-full h-full px-24 pt-10 flex flex-col">
          <div className="w-full flex">
            <div className="w-full flex flex-col justify-start items-center">
              <LineGraph message="최근 2주일간의 지출 추이" />
            </div>
            <div className="flex flex-col justify-start items-center pl-2 py-2">
              <DashCard message="이번달의 총 수입" />
              <DashCard message="이번달의 총 지출" />
              <DashCard message="예산에 따른 권장 지출" />
            </div>
          </div>
          <div className="w-full flex justify-between items-center mb-6">
            <CircleChat message="예산 소진율" />
            <CircleChat message="현재 하루 지출" />
            <CircleChat message="저번달 예산과 총 지출" />
          </div>
          <CostTable message="최근 수입 또는 지출 10개" />
        </div>
      </div>
    </>
  );
};

export default DashBoard;
