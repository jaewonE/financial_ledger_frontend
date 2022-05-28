import React, { useEffect, useState } from 'react';
import BaseWrapper from '../components/baseWrapper';
import { LineGraph } from '../components/lineGraph';
import { Top3Box } from '../components/top3Box';
import { RoundChart } from '../components/roundChart';
import { sendQuery } from '../mysql';

const ableMonthList = [
  { value: '202204', name: '2022년 4월' },
  { value: '202205', name: '2022년 5월' },
  { value: '202206', name: '2022년 6월' },
];

const getCardInfo = (topSpend, topFreq) => {
  const spendList = topSpend.map((row, index) => {
    return {
      rank: index + 1,
      storeName: row.store,
      times: row.categoryName,
      money: `${row.price}원`,
    };
  });
  const freq = topFreq.map((row, index) => {
    return {
      rank: index + 1,
      storeName: row.store,
      times: `${row.count}회`,
      money: `${row.price}원`,
    };
  });
  return [spendList, freq];
};

const TimeReport = ({ userObj, jwt }) => {
  const [categoryGraphData, setCategoryGraphData] = useState(null);
  const [totalReportArray, setTotalReportArray] = useState(null);
  const [reportSide, setReportSide] = useState(null);
  const [lineGraphData, setLineGraphData] = useState(null);
  const [lineInfo, setLineInfo] = useState(null);
  const [reportCard, setReportCard] = useState(null);
  const [focusMonth, setFocusMonth] = useState(
    new Date().getFullYear().toString() +
      (new Date().getMonth().toString().length === 1
        ? '0' + new Date().getMonth().toString()
        : new Date().getMonth().toString())
  );
  const [dayState, setDayState] = useState('이번달');
  useEffect(() => {
    const requestReport = async (monthInfo) => {
      const overview = await sendQuery(
        `http://localhost:4000/timeReport/lineGraph/${monthInfo}/${jwt}`
      );
      const topSpend = await sendQuery(
        `http://localhost:4000/timeReport/topSpend/${monthInfo}/${jwt}`
      );
      const topFreq = await sendQuery(
        `http://localhost:4000/timeReport/topFreq/${monthInfo}/${jwt}`
      );
      const categoryData = await sendQuery(
        `http://localhost:4000/timeReport/category/${monthInfo}/${jwt}`
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
      }
      if (
        topSpend.status === 200 &&
        topSpend.data.length > 1 &&
        topFreq.status === 200 &&
        topFreq.data.length > 1
      ) {
        setReportCard(getCardInfo(topSpend.data, topFreq.data));
      }
      let maxCountedCategory = { name: '정보 없음', count: 0 };
      if (categoryData.status === 200 && categoryData.data.length > 1) {
        const categoryGh = categoryData.data.map((category) => {
          if (category.count > maxCountedCategory.count)
            maxCountedCategory = {
              name: category.categoryName,
              count: category.count,
            };
          return { x: category.categoryName, y: category.price };
        });
        setCategoryGraphData(categoryGh);
      }
      const totalReport = [];
      totalReport.push(
        categoryData.data ? categoryData.data[0].categoryName : '정보 없음',
        categoryData.data
          ? categoryData.data[categoryData.data.length - 1].categoryName
          : '정보 없음',
        maxCountedCategory.count === 0
          ? '정보없음'
          : `${maxCountedCategory.name}: ${maxCountedCategory.count}회`
      );
      setTotalReportArray(totalReport);
    };
    setDayState(`${focusMonth.slice(focusMonth.at(-2) === '0' ? -1 : -2)}월`);
    requestReport(focusMonth);
  }, [focusMonth, jwt]);
  return (
    <BaseWrapper userObj={userObj}>
      {lineGraphData && lineInfo && categoryGraphData && (
        <>
          <div className="w-full h-12 text-xl font-semibold pl-1 mb-3 flex justify-start items-center">
            <div className="flex h-full items-center">
              <select
                className="m-0 px-2 py-0 min-w-0 w-full h-4/5 border rounded-lg shadow-inner bg-transparent hover:border-orange-400 hover:border-2 mr-3 focus:outline-none"
                name="select"
                key={'select'}
                defaultValue={focusMonth}
                onChange={(e) => setFocusMonth(e.target.value)}
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
                data={lineGraphData}
                fill
                showLineLabel={false}
                singleLine
                dataInfo={lineInfo}
                graphHeight={250}
              />
            </div>
            <div className="bg-white h-auto min-w-max lg:min-w-[300px] mt-5 lg:mt-0 border lg:ml-5 p-10 flex flex-col justify-start items-start">
              <div className="w-full border border-x-0 border-t-0 border-b-2 mb-8 pb-1 text-lg font-medium">
                {dayState} 누적 분석
              </div>
              <div className=" text-gray-400 text-sm mb-1">결제 건수</div>
              <div className="font-semibold text-xl mb-8">{reportSide[0]}</div>
              <div className=" text-gray-400 text-sm mb-1">
                {dayState}의 총지출액
              </div>
              <div className="font-semibold text-xl mb-8">{reportSide[1]}</div>
              <div className=" text-gray-400 text-sm mb-1">
                건별 평균 결제액
              </div>
              <div className="font-semibold text-xl mb-4">{reportSide[2]}</div>
            </div>
          </div>
          <div className="w-full h-auto flex flex-col lg:flex-row mb-8">
            <div className="w-full lg:w-1/2 h-56 bg-white mr-4 mb-6 lg:mb-0">
              <Top3Box data={reportCard[0]} title="지출 금액 Top3" />
            </div>
            <div className="w-full lg:w-1/2 h-56 bg-white">
              <Top3Box data={reportCard[1]} title="지출 빈도 Top3" />
            </div>
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
              <div className="font-semibold text-xl mb-8">
                {totalReportArray[0]}
              </div>
              <div className=" text-gray-400 text-sm mb-1">
                가장 적게 소비한 카테고리
              </div>
              <div className="font-semibold text-xl mb-8">
                {totalReportArray[1]}
              </div>
              <div className=" text-gray-400 text-sm mb-1">
                가장 자주 소비한 카테고리
              </div>
              <div className="font-semibold text-xl mb-8">
                {totalReportArray[2]}
              </div>
            </div>
            <div className="bg-white w-full h-auto flex justify-center items-center flex-col lg:flex-row">
              <RoundChart
                data={categoryGraphData}
                label={{
                  main: categoryGraphData[0].x,
                  subNum: categoryGraphData[0].y,
                }}
              />
            </div>
          </div>
        </>
      )}
    </BaseWrapper>
  );
};

export default TimeReport;
