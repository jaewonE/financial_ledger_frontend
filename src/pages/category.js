import React, { useMemo, useState } from 'react';
import BaseWrapper from '../components/baseWrapper';
import { RoundChart } from '../components/roundChart';
import { LineGraph } from '../components/lineGraph';
import { SpendTable } from '../components/spendTable';
import { data_tableColumn, data_tableSample } from './spend';

const sampleData = [
  { x: 'Category1', y: 1200 },
  { x: 'Category2', y: 2510 },
  { x: 'Category3', y: 5000 },
  { x: 'Category4', y: 3200 },
  { x: 'Category5', y: 1200 },
];
const categoryLineGraphSampleData = [
  [
    { x: '4/1', y: 3120 },
    { x: '4/2', y: 5300 },
    { x: '4/3', y: 6110 },
    { x: '4/4', y: 14000 },
    { x: '4/5', y: 5200 },
  ],
];
const categoryList = [
  { value: 'category1', name: 'category1' },
  { value: 'category2', name: 'category2' },
  { value: 'category3', name: 'category3' },
  { value: 'category4', name: 'category4' },
  { value: 'category5', name: 'category5' },
];
const Category = () => {
  const [focusCategory, setFocusCategory] = useState('category1');
  const tableSamplecolumns = useMemo(() => data_tableColumn, []);
  const tableSampleData = useMemo(() => data_tableSample, []);
  return (
    <BaseWrapper>
      <div className="w-full h-10 text-xl font-semibold my-1 pl-1">
        분류별 지출
      </div>
      <div className="w-full auto flex flex-col lg:flex-row">
        <div className="bg-white w-full h-auto flex justify-center items-center flex-col lg:flex-row">
          <RoundChart
            data={sampleData}
            label={{
              main: '카페/간식',
              subNum: 30000,
            }}
          />
        </div>
        <div className="bg-white h-auto min-w-max lg:min-w-[300px] mt-5 lg:mt-0 border lg:ml-5 p-10 flex flex-col justify-start items-start">
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
      </div>
      <div className="w-full h-12 text-xl font-semibold pl-1 mt-10 mb-3 flex justify-start items-center">
        <div className="flex h-full items-center">
          <select
            className="m-0 px-2 py-0 min-w-0 w-full h-3/4 border rounded-lg shadow-inner bg-transparent hover:border-orange-400 hover:border-2 mr-3 focus:outline-none"
            name="select"
            key={'select'}
            defaultValue={focusCategory}
          >
            {categoryList.map((category, index) => (
              <option key={index} value={category.value}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <span>의 지출 분석</span>
      </div>
      <div className="w-full auto flex flex-col lg:flex-row">
        <div className="bg-white h-auto min-w-max lg:min-w-[300px] mt-5 lg:mt-0 border lg:mr-5 p-10 flex flex-col justify-start items-start">
          <div className="w-full border border-x-0 border-t-0 border-b-2 mb-8 pb-1 text-lg font-medium">
            이번 달 누적 지출 분석
          </div>
          <div className=" text-gray-400 text-sm mb-1">결제 건수</div>
          <div className="font-semibold text-xl mb-8">12건</div>
          <div className=" text-gray-400 text-sm mb-1">월 총지출액</div>
          <div className="font-semibold text-xl mb-8">43000원</div>
          <div className=" text-gray-400 text-sm mb-1">건별 평균 결제액</div>
          <div className="font-semibold text-xl mb-4">3300원</div>
        </div>
        <div className="bg-white w-full h-auto flex justify-center items-center flex-col lg:flex-row">
          <LineGraph data={categoryLineGraphSampleData} fill />
        </div>
      </div>
      <div className="h-8"></div>
      <SpendTable columns={tableSamplecolumns} data={tableSampleData} />
      <div className="h-12"></div>
    </BaseWrapper>
  );
};

export default Category;
