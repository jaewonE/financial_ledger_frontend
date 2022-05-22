import React, { useEffect, useState } from 'react';
import BaseWrapper from '../components/baseWrapper';
import { LineGraph } from '../components/lineGraph';
import { Top3Box } from '../components/top3Box';
import { RoundChart } from '../components/roundChart';
import { SingleRoundChat } from '../components/singleRoundChart';
import { colorsProps } from '../props/color';

const ableMonthList = [
  { value: '202201', name: '2022년 1월' },
  { value: '202202', name: '2022년 2월' },
  { value: '202203', name: '2022년 3월' },
  { value: '202204', name: '2022년 4월' },
  { value: '202205', name: '2022년 5월' },
];

const daySpendSampleData = [
  [
    { x: '4/1', y: 3120 },
    { x: '4/2', y: 5300 },
    { x: '4/3', y: 6110 },
    { x: '4/4', y: 14000 },
    { x: '4/5', y: 5200 },
  ],
];

const spendTopSampleData = [
  { rank: 1, storeName: 'store1', times: 12, money: 124000 },
  { rank: 2, storeName: 'store2', times: 22, money: 24200 },
  { rank: 3, storeName: 'store3', times: 4, money: 2400 },
];

const categorySampleData = [
  { x: 'Category1', y: 1200 },
  { x: 'Category2', y: 2510 },
  { x: 'Category3', y: 5000 },
  { x: 'Category4', y: 3200 },
  { x: 'Category5', y: 1200 },
];

const singleRoundChartSampleData = [
  {
    category: '예산 소진율',
    balance: '76%',
    createAt: '예산: 400000원',
    bgColor: colorsProps[0],
    percent: 76,
  },
  {
    category: '일일 평균 지출',
    balance: '4500₩',
    createAt: '예산 초과되지 않음',
    bgColor: colorsProps[1],
    percent: 123,
  },
  {
    category: '카페',
    balance: '4500₩',
    createAt: '2 March 2022',
    bgColor: colorsProps[2],
    percent: 75,
  },
];

const TimeReport = () => {
  const [focusMonth, setFocusMonth] = useState(
    new Date().getFullYear().toString() +
      (new Date().getMonth().toString().length === 1
        ? '0' + new Date().getMonth().toString()
        : new Date().getMonth().toString())
  );
  const [dayState, setDayState] = useState('이번달');
  useEffect(() => {
    setDayState(`${focusMonth.slice(focusMonth.at(-2) === '0' ? -1 : -2)}월`);
  }, [focusMonth]);
  return (
    <BaseWrapper>
      <div className="w-full h-12 text-xl font-semibold pl-1 mb-3 flex justify-start items-center">
        <div className="flex h-full items-center">
          <select
            className="m-0 px-2 py-0 min-w-0 w-full h-4/5 border rounded-lg shadow-inner bg-transparent hover:border-orange-400 hover:border-2 mr-3 focus:outline-none"
            name="select"
            key={'select'}
            defaultValue={focusMonth}
          >
            {ableMonthList.map((month, index) => (
              <option key={index} value={month.value}>
                {month.name}
              </option>
            ))}
          </select>
        </div>
        <span>의 월간 보고서</span>
      </div>
      <div className="w-full h-10 text-xl font-semibold my-1 mt-3 pl-1">
        {dayState}의 일별 누적 지출
      </div>
      <div className="w-full auto flex flex-col lg:flex-row mb-8">
        <div className="bg-white w-full h-auto flex justify-center items-center flex-col lg:flex-row">
          <LineGraph
            data={daySpendSampleData}
            fill
            showLineLabel={false}
            graphHeight={250}
          />
        </div>
        <div className="bg-white h-auto min-w-max lg:min-w-[300px] mt-5 lg:mt-0 border lg:ml-5 p-10 flex flex-col justify-start items-start">
          <div className="w-full border border-x-0 border-t-0 border-b-2 mb-8 pb-1 text-lg font-medium">
            {dayState} 누적 분석
          </div>
          <div className=" text-gray-400 text-sm mb-1">결제 건수</div>
          <div className="font-semibold text-xl mb-8">51회</div>
          <div className=" text-gray-400 text-sm mb-1">
            {dayState}의 총지출액
          </div>
          <div className="font-semibold text-xl mb-8">3230040원</div>
          <div className=" text-gray-400 text-sm mb-1">건별 평균 결제액</div>
          <div className="font-semibold text-xl mb-8">8200원</div>
        </div>
      </div>
      <div className="w-full h-auto flex flex-col lg:flex-row mb-8">
        <div className="w-full lg:w-1/2 h-56 bg-white mr-4 mb-6 lg:mb-0">
          <Top3Box data={spendTopSampleData} title="지출 금액 Top3" />
        </div>
        <div className="w-full lg:w-1/2 h-56 bg-white">
          <Top3Box data={spendTopSampleData} title="지출 빈도 Top3" />
        </div>
      </div>
      <div className="w-full h-10 text-xl font-semibold my-1 mt-3 pl-1">
        {dayState}의 예산에 따른 분석
      </div>
      <div className="w-full h-auto flex items-center justify-between mb-10 flex-col lg:flex-row">
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
      <div className="w-full h-10 text-xl font-semibold my-1 mt-3 pl-1">
        {dayState}의 카테고리별 지출 분석
      </div>
      <div className="w-full auto flex flex-col lg:flex-row mb-16">
        <div className="bg-white h-auto min-w-max lg:min-w-[300px] mt-5 lg:mt-0 border lg:mr-5 p-10 flex flex-col justify-start items-start">
          <div className="w-full border border-x-0 border-t-0 border-b-2 mb-8 pb-1 text-lg font-medium">
            지출 종합
          </div>
          <div className=" text-gray-400 text-sm mb-1">
            가장 많이 소비한 카테고리
          </div>
          <div className="font-semibold text-xl mb-8">category1</div>
          <div className=" text-gray-400 text-sm mb-1">
            가장 자주 소비한 카테고리
          </div>
          <div className="font-semibold text-xl mb-8">category2: 43000원</div>
          <div className=" text-gray-400 text-sm mb-1">
            저번달의 가장 많이 소비한 카테고리
          </div>
          <div className="font-semibold text-xl mb-8">category3: 14300원</div>
        </div>
        <div className="bg-white w-full h-auto flex justify-center items-center flex-col lg:flex-row">
          <RoundChart
            data={categorySampleData}
            label={{
              main: '카페/간식',
              subNum: 30000,
            }}
          />
        </div>
      </div>
    </BaseWrapper>
  );
};

export default TimeReport;
