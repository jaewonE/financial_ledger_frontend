import React, { useState } from 'react';
import BaseWrapper from '../components/baseWrapper';

const ableMonthList = [
  { value: '202201', name: '2022년 1월' },
  { value: '202202', name: '2022년 2월' },
  { value: '202203', name: '2022년 3월' },
  { value: '202204', name: '2022년 4월' },
  { value: '202205', name: '2022년 5월' },
];

const TimeReport = () => {
  const [focusMonth, setFocusMonth] = useState(
    new Date().getFullYear().toString() +
      (new Date().getMonth().toString().length === 1
        ? '0' + new Date().getMonth().toString()
        : new Date().getMonth().toString())
  );
  return (
    <BaseWrapper>
      <div className="w-full h-12 text-xl font-semibold pl-1 mt-10 mb-3 flex justify-start items-center">
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
    </BaseWrapper>
  );
};

export default TimeReport;
// <>
//   <TopBar />
//   <div className="flex w-full">
//     <SideDashBoard />
//     <div className="w-full h-full px-24 pt-10 flex flex-col">
//       <div className="w-full flex justify-center">
//         <LineGraph status="auto" message="날짜에 따른 지출 그래프" />
//         <div className="w-[19rem] h-96 bg-slate-300 mt-2 ml-4 rounded-lg bluePrint">
//           지출 그래프 설명
//         </div>
//       </div>
//       <div className="w-full flex justify-between items-center mb-6">
//         <div className="bluePrint w-[49%] h-48 bg-slate-300 rounded-md">
//           저번달의 N일까지의 지출 보고서
//         </div>
//         <div className="bluePrint w-[49%] h-48 bg-slate-300 rounded-md">
//           이번달의 N일까지의 지출 보고서
//         </div>
//       </div>
//       <div className="w-full flex justify-between items-center mb-6">
//         <div className="bluePrint w-[29%] h-64 bg-slate-300 rounded-md">
//           일별 지출 그래프 요약
//         </div>
//         <div className="bluePrint w-[69%] h-64 bg-slate-300 rounded-md">
//           일별 지출 막대 그래프
//         </div>
//       </div>
//       <div className="w-full flex justify-between items-center mb-6">
//         <div className="bluePrint w-[29%] h-64 bg-slate-300 rounded-md">
//           지난 일주일간 요일별 지출 그래프 요약
//         </div>
//         <div className="bluePrint w-[69%] h-64 bg-slate-300 rounded-md">
//           지난 일주일간 요일별 요일별 지출 막대 그래프
//         </div>
//       </div>
//     </div>
//   </div>
// </>
