import React, { useEffect, useMemo, useState } from 'react';
import BaseWrapper from '../components/baseWrapper';
import { RoundChart } from '../components/roundChart';
import { LineGraph } from '../components/lineGraph';
import { SpendTable } from '../components/spendTable';
import { sendQuery } from '../mysql';

const data_tableColumn = [
  { accessor: 'categoryName', Header: '카테고리' },
  { accessor: 'nDate', Header: '날짜' },
  { accessor: 'store', Header: '가계' },
  { accessor: 'price', Header: '가격' },
];

const Category = ({ userObj, jwt }) => {
  const [categoryGraphData, setCategoryGraphData] = useState(null);
  const [totalReportArray, setTotalReportArray] = useState(null);
  const [categoryList, setCategoryList] = useState([
    { slug: 'coffee', name: '카페/간식', id: 2 },
  ]);
  const [focusCategory, setFocusCategory] = useState(2);
  const [reportSide, setReportSide] = useState(null);
  const [lineGraphData, setLineGraphData] = useState(null);
  const [lineInfo, setLineInfo] = useState(null);
  const [categoryTable, setCategoryTable] = useState(null);
  const columns = useMemo(() => data_tableColumn, []);
  const data = useMemo(() => categoryTable, [categoryTable]);

  const getCategoryReport = (e) => {
    const value = e.target.value;
    if (value) {
      setFocusCategory(Number(value));
    }
  };

  useEffect(() => {
    const requestOverview = async (jwt) => {
      const totalReport = [];
      const categorys = await sendQuery(`http://localhost:4000/category`);
      const overview = await sendQuery(
        `http://localhost:4000/category/overview/${jwt}`
      );
      const lastMonthSpend = await sendQuery(
        `http://localhost:4000/category/overview/lastMonth/${jwt}`
      );
      let maxCountedCategory = { name: '정보 없음', count: 0 };
      if (overview.status === 200 && overview.data) {
        const categoryGh = overview.data.map((category) => {
          if (category.count > maxCountedCategory.count)
            maxCountedCategory = {
              name: category.categoryName,
              count: category.count,
            };
          return { x: category.categoryName, y: category.price };
        });
        setCategoryGraphData(categoryGh);
        totalReport.push(
          overview.data ? overview.data[0].categoryName : '정보 없음',
          maxCountedCategory.count === 0
            ? '정보없음'
            : `${maxCountedCategory.name}: ${maxCountedCategory.count}회`
        );
      }
      if (lastMonthSpend.status === 200 && lastMonthSpend.data) {
        totalReport.push(
          lastMonthSpend.data
            ? `${lastMonthSpend.data[0].categoryName}: ${lastMonthSpend.data[0].price}원`
            : '정보없음'
        );
      }
      setCategoryList(categorys.data);
      setTotalReportArray(totalReport);
    };
    requestOverview(jwt);
  }, [jwt]);

  useEffect(() => {
    const requestCategoryReport = async (focusCategory) => {
      const overview = await sendQuery(
        `http://localhost:4000/category/report/overview/${focusCategory}/${jwt}`
      );
      const tables = await sendQuery(
        `http://localhost:4000/category/report/table/${focusCategory}/${jwt}`
      );
      let maxPrice = 0;
      if (overview.status === 200 && overview.data.length > 1) {
        const overviewData = overview.data.slice(1);
        const lineData = overviewData.map((data) => {
          if (maxPrice < Number(data.price)) maxPrice = Number(data.price);
          return { x: data.nDate, y: Number(data.price) };
        });
        const totalReport = [
          `${overview.data[0].count}건`,
          `${overview.data[0].price}원`,
          `${Math.round(overview.data[0].price / overview.data[0].count)}원`,
        ];
        setReportSide(totalReport);
        setLineGraphData([lineData]);
      }
      if (tables.status === 200 && tables.data) {
        setCategoryTable(tables.data);
      }
      const lineValues = {
        yTickValues: [
          Math.round(maxPrice / 4),
          Math.round((maxPrice / 4) * 2),
          Math.round((maxPrice / 4) * 3),
          Math.round(maxPrice),
        ],
        yFormat: (t) => `${(t / 10000).toFixed(1)}만원`,
        xFormat: (t) => `${t}`,
      };
      setLineInfo(lineValues);
    };
    requestCategoryReport(focusCategory);
  }, [jwt, focusCategory]);

  return (
    <BaseWrapper userObj={userObj}>
      <div className="w-full h-10 text-xl font-semibold my-1 pl-1">
        분류별 지출
      </div>
      {categoryGraphData && totalReportArray && (
        <div className="w-full auto flex flex-col lg:flex-row">
          <div className="bg-white w-full h-auto flex justify-center items-center flex-col lg:flex-row">
            <RoundChart
              data={categoryGraphData}
              label={{
                main: categoryGraphData[0].x,
                subNum: categoryGraphData[0].y,
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
            <div className="font-semibold text-xl mb-8">
              {totalReportArray[0]}
            </div>
            <div className=" text-gray-400 text-sm mb-1">
              가장 자주 소비한 카테고리
            </div>
            <div className="font-semibold text-xl mb-8">
              {totalReportArray[1]}
            </div>
            <div className=" text-gray-400 text-sm mb-1">
              저번달의 가장 많이 소비한 카테고리
            </div>
            <div className="font-semibold text-xl mb-8">
              {totalReportArray[2]}
            </div>
          </div>
        </div>
      )}
      {reportSide && lineGraphData && categoryTable && (
        <>
          <div className="w-full h-12 text-xl font-semibold pl-1 mt-10 mb-3 flex justify-start items-center">
            <div className="flex h-full items-center">
              <select
                className="m-0 px-2 py-0 min-w-0 w-full h-3/4 border rounded-lg shadow-inner bg-transparent hover:border-orange-400 hover:border-2 mr-3 focus:outline-none"
                name="select"
                key={'select'}
                defaultValue={categoryList[0].id}
                onChange={getCategoryReport}
              >
                {categoryList.map((category) => (
                  <option key={category.id} value={category.id}>
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
              <div className="font-semibold text-xl mb-8">{reportSide[0]}</div>
              <div className=" text-gray-400 text-sm mb-1">월 총지출액</div>
              <div className="font-semibold text-xl mb-8">{reportSide[1]}</div>
              <div className=" text-gray-400 text-sm mb-1">
                건별 평균 결제액
              </div>
              <div className="font-semibold text-xl mb-4">{reportSide[2]}</div>
            </div>
            <div className="bg-white w-full h-auto flex justify-center items-center flex-col lg:flex-row">
              <LineGraph
                data={lineGraphData}
                fill
                showLineLabel={false}
                singleLine
                dataInfo={lineInfo}
              />
            </div>
          </div>
          <div className="h-8"></div>
          <SpendTable
            columns={columns}
            column_length={columns.length}
            data={data}
          />
          <div className="h-12"></div>
        </>
      )}
    </BaseWrapper>
  );
};

export default Category;
