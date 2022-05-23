import React from 'react';
import { SingleRoundChat } from '../components/singleRoundChart';
import BaseWrapper from '../components/baseWrapper';
import { LineGraph } from '../components/lineGraph';
import { colorsProps } from '../props/color';

const sampleData = [
  { x: 'a', y: 1200 },
  { x: 'b', y: 2510 },
  { x: 'c', y: 12000 },
  { x: 'd', y: 4200 },
  { x: 'e', y: 2100 },
];
const multiSampleData = [
  [
    { x: 'a', y: 3120 },
    { x: 'b', y: 5300 },
    { x: 'c', y: 6110 },
    { x: 'd', y: 14000 },
    { x: 'e', y: 5200 },
  ],
];
multiSampleData.push(sampleData);
const singleRoundChartSampleData = [
  {
    category: '카페',
    balance: '4500₩',
    createAt: '2 March 2022',
    bgColor: colorsProps[0],
    percent: 75,
  },
  {
    category: '카페',
    balance: '4500₩',
    createAt: '2 March 2022',
    bgColor: colorsProps[1],
    percent: 75,
  },
  {
    category: '카페',
    balance: '4500₩',
    createAt: '2 March 2022',
    bgColor: colorsProps[2],
    percent: 75,
  },
];

const DashBoard = () => {
  return (
    <BaseWrapper>
      <div className="w-full h-10 text-xl font-semibold my-1 pl-1">
        최근 일주일간 지출 내역
      </div>
      <div className="w-full auto flex flex-col lg:flex-row">
        <div className="bg-white w-full h-auto flex justify-center items-center flex-col lg:flex-row">
          <LineGraph data={multiSampleData} />
        </div>
        <div className="bg-white h-auto min-w-max lg:min-w-[300px] mt-5 lg:mt-0 border lg:ml-5 p-10 flex flex-col justify-start items-start">
          <div className="w-full border border-x-0 border-t-0 border-b-2 mb-8 pb-1 text-lg font-medium">
            금일 보고서
          </div>
          <div className=" text-gray-400 text-sm mb-1">총 수익</div>
          <div className="font-semibold text-xl mb-8">182000원</div>
          <div className=" text-gray-400 text-sm mb-1">총 지출</div>
          <div className="font-semibold text-xl mb-8">223540원</div>
          <div className=" text-gray-400 text-sm mb-1">합계 </div>
          <div className="font-semibold text-xl">-451200원</div>
        </div>
      </div>
      <div className="w-full h-auto flex items-center justify-between my-10 flex-col lg:flex-row">
        {singleRoundChartSampleData.map((card, index) => (
          <div
            key={index}
            className={`w-full lg:w-[45%] mt-2 h-40 ${
              index !== 0 && 'lg:ml-6'
            }`}
          >
            <SingleRoundChat data={card} />
          </div>
        ))}
      </div>
    </BaseWrapper>
  );
};

export default DashBoard;
