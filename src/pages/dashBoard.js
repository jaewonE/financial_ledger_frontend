// import React, { useEffect, useState } from 'react';
// import { SideDashBoard } from '../components/sideDashBorad';
// import { TopBar } from '../components/topBar';
// import { SingleRoundChat } from '../components/singleRoundChart';
// import { RoundChart } from '../components/roundChart';

// const sampleData = [
//   { x: 'asdasd1', y: 1200 },
//   { x: 'asdasd2', y: 2510 },
//   { x: 'asdasd3', y: 12000 },
//   { x: 'asdasd4', y: 4200 },
//   { x: 'asdasd5', y: 2100 },
//   { x: 'asdasd6', y: 651 },
// ];

// const DashBoard = () => {
//   const [percent, setPercent] = useState(0);
//   const [data, setData] = useState([
//     { x: 1, y: 0 },
//     { x: 2, y: 100 },
//   ]);
//   useEffect(() => {
//     const getData = (percent) => {
//       setData([
//         { x: 1, y: percent },
//         { x: 2, y: 100 - percent },
//       ]);
//     };
//     setPercent(75);
//     getData(percent);
//   }, [percent]);
//   return (
//     <>
//       <TopBar />
//       <div className="flex w-full h-auto text-lg">
//         <SideDashBoard />
//         <div className="w-full flex flex-col h-auto">
//           <div className="w-full h-12 pl-5 flex items-center text-gray-600 text-base font-semibold mb-2 border border-t-0">
//             대시보드
//           </div>
//           <div className="w-full pt-10 px-10 flex flex-col items-center justify-start h-auto bg-[#FDFDFE]">
//             <div className="w-full max-w-6xl h-auto flex flex-col items-center justify-between">
//               <div className="w-full auto flex flex-col lg:flex-row">
//                 <div className="bg-white w-full h-auto flex justify-center items-center flex-col lg:flex-row">
//                   <RoundChart
//                     data={sampleData}
//                     label={{ main: '출금', subNum: 30000 }}
//                   />
//                 </div>
//                 <div className="bg-white h-auto min-w-max lg:min-w-[300px] mt-5 lg:mt-0 border lg:ml-5 p-10 flex flex-col justify-start items-start">
//                   <div className="w-full border border-x-0 border-t-0 border-b-2 mb-8 pb-1 text-lg font-medium">
//                     이번달에는...
//                   </div>
//                   <div className=" text-gray-400 text-sm mb-1">총 수익</div>
//                   <div className="font-semibold text-xl mb-8">182000원</div>
//                   <div className=" text-gray-400 text-sm mb-1">총 지출</div>
//                   <div className="font-semibold text-xl mb-8">223540원</div>
//                   <div className=" text-gray-400 text-sm mb-1">합계 </div>
//                   <div className="font-semibold text-xl mb-8">-451200원</div>
//                 </div>
//               </div>
//               <div className="w-full h-auto flex items-center justify-between mt-4 flex-col lg:flex-row">
//                 <div className="lg:w-[45%] w-full lg:mr-2 mt-2 gap-1 h-40">
//                   <SingleRoundChat
//                     inputPercent={75}
//                     inputData={[
//                       { x: 1, y: 75 },
//                       { x: 2, y: 25 },
//                     ]}
//                     state={{
//                       category: '카페',
//                       balance: '4500₩',
//                       createAt: '2 March 2022',
//                     }}
//                     styleNum={'bg-red-400'}
//                   />
//                 </div>
//                 <div className="lg:w-[45%] w-full lg:ml-2 mt-2 gap-1 h-40 flex-col lg:flex-row">
//                   <SingleRoundChat
//                     inputPercent={75}
//                     inputData={[
//                       { x: 1, y: 75 },
//                       { x: 2, y: 25 },
//                     ]}
//                     state={{
//                       category: '카페',
//                       balance: '4500₩',
//                       createAt: '2 March 2022',
//                     }}
//                     styleNum={'bg-blue-400'}
//                   />
//                 </div>
//                 <div className="lg:w-[45%] w-full lg:ml-2 mt-2 gap-1 h-40">
//                   <SingleRoundChat
//                     inputPercent={75}
//                     inputData={[
//                       { x: 1, y: 75 },
//                       { x: 2, y: 25 },
//                     ]}
//                     state={{
//                       category: '카페',
//                       balance: '4500₩',
//                       createAt: '2 March 2022',
//                     }}
//                     styleNum={'bg-orange-400'}
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default DashBoard;
import React, { useEffect, useState } from 'react';
import { SingleRoundChat } from '../components/singleRoundChart';
import { RoundChart } from '../components/roundChart';
import BaseWrapper from '../components/baseWrapper';

const sampleData = [
  { x: 'asdasd1', y: 1200 },
  { x: 'asdasd2', y: 2510 },
  { x: 'asdasd3', y: 12000 },
  { x: 'asdasd4', y: 4200 },
  { x: 'asdasd5', y: 2100 },
  { x: 'asdasd6', y: 651 },
];

const DashBoard = () => {
  const [percent, setPercent] = useState(0);
  const [data, setData] = useState([
    { x: 1, y: 0 },
    { x: 2, y: 100 },
  ]);
  useEffect(() => {
    const getData = (percent) => {
      setData([
        { x: 1, y: percent },
        { x: 2, y: 100 - percent },
      ]);
    };
    setPercent(75);
    getData(percent);
  }, [percent]);
  return (
    <BaseWrapper>
      <div className="w-full auto flex flex-col lg:flex-row">
        <div className="bg-white w-full h-auto flex justify-center items-center flex-col lg:flex-row">
          <RoundChart
            data={sampleData}
            label={{ main: '출금', subNum: 30000 }}
          />
        </div>
        <div className="bg-white h-auto min-w-max lg:min-w-[300px] mt-5 lg:mt-0 border lg:ml-5 p-10 flex flex-col justify-start items-start">
          <div className="w-full border border-x-0 border-t-0 border-b-2 mb-8 pb-1 text-lg font-medium">
            이번달에는...
          </div>
          <div className=" text-gray-400 text-sm mb-1">총 수익</div>
          <div className="font-semibold text-xl mb-8">182000원</div>
          <div className=" text-gray-400 text-sm mb-1">총 지출</div>
          <div className="font-semibold text-xl mb-8">223540원</div>
          <div className=" text-gray-400 text-sm mb-1">합계 </div>
          <div className="font-semibold text-xl mb-8">-451200원</div>
        </div>
      </div>
      <div className="w-full h-auto flex items-center justify-between mt-4 flex-col lg:flex-row">
        <div className="lg:w-[45%] w-full lg:mr-2 mt-2 gap-1 h-40">
          <SingleRoundChat
            inputPercent={75}
            inputData={data}
            state={{
              category: '카페',
              balance: '4500₩',
              createAt: '2 March 2022',
            }}
            styleNum={'bg-red-400'}
          />
        </div>
        <div className="lg:w-[45%] w-full lg:ml-2 mt-2 gap-1 h-40 flex-col lg:flex-row">
          <SingleRoundChat
            inputPercent={75}
            inputData={data}
            state={{
              category: '카페',
              balance: '4500₩',
              createAt: '2 March 2022',
            }}
            styleNum={'bg-blue-400'}
          />
        </div>
        <div className="lg:w-[45%] w-full lg:ml-2 mt-2 gap-1 h-40">
          <SingleRoundChat
            inputPercent={75}
            inputData={data}
            state={{
              category: '카페',
              balance: '4500₩',
              createAt: '2 March 2022',
            }}
            styleNum={'bg-orange-400'}
          />
        </div>
      </div>
    </BaseWrapper>
  );
};

export default DashBoard;
