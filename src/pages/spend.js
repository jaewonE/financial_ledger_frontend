import React, { useMemo } from 'react';
import BaseWrapper from '../components/baseWrapper';
import { SpendTable } from '../components/spendTable';

export const data_tableColumn = [
  { accessor: 'createAt', Header: 'createAt' },
  { accessor: 'categoryName', Header: 'categoryName' },
  { accessor: 'store', Header: 'store' },
  { accessor: 'price', Header: 'price' },
];

export const data_tableSample = [
  {
    id: 1,
    createAt: '2022-2-6 7:48:49',
    updateAt: '2022-2-6 7:48:49',
    store: 'store1',
    price: 1300,
    categoryName: '여행/숙박',
  },
  {
    id: 2,
    createAt: '2022-4-7 21:16:59',
    updateAt: '2022-4-7 21:16:59',
    store: 'store2',
    price: 26400,
    categoryName: '여행/숙박',
  },
  {
    id: 3,
    createAt: '2022-4-7 21:16:59',
    updateAt: '2022-4-7 21:16:59',
    store: null,
    price: 29300,
    categoryName: '여행/숙박',
  },
  {
    id: 4,
    createAt: '2022-1-9 19:22:43',
    updateAt: '2022-1-9 19:22:43',
    store: 'store3',
    price: 6200,
    categoryName: '여행/숙박',
  },
  {
    id: 5,
    createAt: '2022-4-8 15:19:46',
    updateAt: '2022-4-8 15:19:46',
    store: 'store1',
    price: 13200,
    categoryName: '여행/숙박',
  },
  {
    id: 6,
    createAt: '2022-4-3 23:13:55',
    updateAt: '2022-4-3 23:13:55',
    store: 'store5',
    price: 4300,
    categoryName: '여행/숙박',
  },
];

const Spend = () => {
  const columns = useMemo(() => data_tableColumn, []);
  const data = useMemo(() => data_tableSample, []);
  // const [info, setInfo] = useState();
  // const data = useMemo(() => info, [info]);
  // const whenDataFromBackend = () => {
  //   data.whenDataFromBackend().then((item) => setInfo(item));
  // };

  return (
    <BaseWrapper>
      <div className="w-full text-left text-2xl font-semibold mb-2">
        최근 지출
      </div>
      <SpendTable columns={columns} data={data} searchAble={true} />
    </BaseWrapper>
  );
};

export default Spend;
// <>
//   <TopBar />
//   <div className="flex w-full">
//     <SideDashBoard />
//     <div className="w-full h-full px-24 pt-10 flex flex-col">
//       <div className="w-full flex mb-5">
//         <div className="w-full flex flex-col justify-start items-center">
//           <div className="w-full h-full mb-2 bg-slate-300 rounded-md mt-2 bluePrint text-2xl">
//             지출과 수입에 대한 최근 1주일 그래프
//           </div>
//         </div>
//         <div className=" w-64 h-64 bg-slate-300 ml-5 my-2 rounded-md bluePrint ">
//           일 평균 지출
//         </div>
//         <div className=" w-64 h-64 bg-slate-300 ml-5 my-2 rounded-md bluePrint">
//           저번달의 일 평균 지출
//         </div>
//       </div>
//       <CostTable status="spend-page" message="지출 내역" />
//     </div>
//   </div>
// </>
