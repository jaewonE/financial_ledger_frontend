import React from 'react';
import { CircleChat } from '../components/circleChat';
import { CircleGraph } from '../components/circleGraph';
import { CostTable } from '../components/costTable';
import { DashCard } from '../components/dashCard';
import { SideDashBoard } from '../components/sideDashBorad';
import { TopBar } from '../components/topBar';

const Category = () => {
  return (
    <>
      <TopBar />
      <div className="flex w-full">
        <SideDashBoard />
        <div className="w-full h-full px-24 pt-10 flex flex-col">
          <div className="w-full flex">
            <div className="flex flex-col justify-start items-center pr-8 py-2">
              <DashCard
                location={{ x: 3 }}
                message="가장 많이 소비한 카테고리"
              />
              <DashCard
                location={{ x: 3 }}
                message="가장 자주 소비한 카테고리"
              />
              <DashCard
                location={{ x: 3 }}
                message="저번달의 가장 많이 소비한 카테고리"
              />
            </div>
            <div className="w-full flex flex-col justify-start items-center">
              <CircleGraph message="카테고리별 사용 그래프(원형)" />
            </div>
          </div>
          <CostTable message="카테고리별 사용 내역" />
        </div>
      </div>
    </>
  );
};

export default Category;
