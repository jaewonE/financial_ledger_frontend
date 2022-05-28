import React, { useEffect, useState } from 'react';
import { SingleRoundChat } from '../components/singleRoundChart';
import BaseWrapper from '../components/baseWrapper';
import { LineGraph } from '../components/lineGraph';
import { colorsProps } from '../props/color';
import { sendQuery } from '../mysql';

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
const getRoundChartData = (data) => {
  return [
    {
      category: '예산 소진율',
      balance: data[0][0] > 100 ? '초과됨' : '초과되지 않음',
      createAt: `${data[0][1]}원`,
      bgColor: colorsProps[0],
      percent: data[0][0],
    },
    {
      category: '저번달 예산 소진율',
      balance: data[1][0] > 100 ? '초과됨' : '초과되지 않음',
      createAt: `${data[1][1]}원`,
      bgColor: colorsProps[11],
      percent: data[1][0],
    },
    {
      category: '일일 평균 지출',
      balance: `${data[2][0]}원`,
      createAt: data[2][1] > 100 ? '초과됨' : '초과되지 않음',
      bgColor: colorsProps[1],
      percent: data[2][1],
    },
  ];
};
const formatLineGraphData = (data) => {
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  const todayIndex = new Date().getDay();
  const newData = [];
  let maxPrice = 0;
  const priceArray = [0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < data.length; i++) {
    const price = Number(data[i].price);
    if (maxPrice < price) maxPrice = price;
    priceArray[data[i].nDate - 1] += price;
  }
  for (let i = 1; i <= 7; i++) {
    const countIndex = (todayIndex + i) % 7;
    newData.push({ x: week[countIndex], y: priceArray[countIndex] });
  }
  return [newData, maxPrice];
};

const getTotalReportArray = (thisPrice, lastPrice) => {
  const totalReportArray = [];
  totalReportArray.push(
    thisPrice ? `${thisPrice}원` : '정보 없음',
    lastPrice ? `${lastPrice}원` : '정보 없음',
    thisPrice && lastPrice ? `${lastPrice - thisPrice}원` : '정보 없음'
  );
  return totalReportArray;
};

const DashBoard = ({ userObj, jwt }) => {
  const [totalReport, setTotalReport] = useState(null);
  const [lineGraphData, setLineGraphData] = useState(null);
  const [lineInfo, setLineInfo] = useState(null);
  const [roundChartData, setRoundChartData] = useState(null);
  useEffect(() => {
    const requestOverview = async (jwt) => {
      const thisWeekData = await sendQuery(
        `http://localhost:4000/dashBoard/weekOverview/${jwt}`
      );
      const lastWeekData = await sendQuery(
        `http://localhost:4000/dashBoard/lastWeekOverview/${jwt}`
      );
      if (
        thisWeekData.status === 200 &&
        thisWeekData.data.length > 1 &&
        lastWeekData.status === 200 &&
        lastWeekData.data.length > 1
      ) {
        const [thisNewData, thisMaxPrice] = formatLineGraphData(
          thisWeekData.data.slice(1)
        );
        const [lastNewData, lastMaxPrice] = formatLineGraphData(
          lastWeekData.data.slice(1)
        );
        setLineGraphData([thisNewData, lastNewData]);
        setTotalReport(
          getTotalReportArray(
            thisWeekData.data[0].price,
            lastWeekData.data[0].price
          )
        );
        const maxPrice =
          thisMaxPrice > lastMaxPrice ? thisMaxPrice : lastMaxPrice;
        const lineValues = {
          yTickValues: [
            Math.round(maxPrice / 4),
            Math.round((maxPrice / 4) * 2),
            Math.round((maxPrice / 4) * 3),
            Math.round(maxPrice),
          ],
          yFormat: (t) => `${(t / 10000).toFixed(1)}만원`,
          xFormat: (t) => `${t}`,
          lineLabels: ['이번주', '지난주'],
        };
        setLineInfo(lineValues);
        const roundChart = getRoundChartData([
          [
            Math.round(
              (thisWeekData.data[0].price / Number(userObj.budget)) * 100
            ),
            `${thisWeekData.data[0].price}/${userObj.budget}`,
          ],
          [
            Math.round(
              (lastWeekData.data[0].price / Number(userObj.budget)) * 100
            ),
            `${lastWeekData.data[0].price}/${userObj.budget}`,
          ],
          [
            Math.round(thisWeekData.data[0].price / 7),
            Math.round(
              (thisWeekData.data[0].price / Number(userObj.budget)) * 100
            ),
          ],
        ]);
        setRoundChartData(roundChart);
      }
    };
    requestOverview(jwt);
  }, [jwt, userObj.budget]);
  return (
    <BaseWrapper userObj={userObj}>
      {totalReport && lineGraphData && lineInfo && roundChartData && (
        <>
          <div className="w-full h-10 text-xl font-semibold my-1 pl-1">
            최근 주간 지출
          </div>
          <div className="w-full auto flex flex-col lg:flex-row">
            <div className="bg-white w-full h-auto flex justify-center items-center flex-col lg:flex-row">
              <LineGraph data={lineGraphData} dataInfo={lineInfo} />
            </div>
            <div className="bg-white h-auto min-w-max lg:min-w-[300px] mt-5 lg:mt-0 border lg:ml-5 p-10 flex flex-col justify-start items-start">
              <div className="w-full border border-x-0 border-t-0 border-b-2 mb-8 pb-1 text-lg font-medium">
                금주 보고서
              </div>
              <div className=" text-gray-400 text-sm mb-1">금주 총 지출</div>
              <div className="font-semibold text-xl mb-8">{totalReport[0]}</div>
              <div className=" text-gray-400 text-sm mb-1">지난주 총 지출</div>
              <div className="font-semibold text-xl mb-8">{totalReport[1]}</div>
              <div className=" text-gray-400 text-sm mb-1">
                지난주 대비 증감
              </div>
              <div className="font-semibold text-xl">{totalReport[2]}</div>
            </div>
          </div>
          <div className="w-full h-10 text-xl font-semibold mt-12 pl-1">
            금달의 예산에 따른 분석
          </div>
          <div className="w-full h-auto flex items-center justify-between flex-col lg:flex-row mb-5">
            {roundChartData.map((card, index) => (
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
        </>
      )}
    </BaseWrapper>
  );
};

export default DashBoard;
