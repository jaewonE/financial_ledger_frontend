import React, { useEffect, useState } from 'react';
import { VictoryAnimation, VictoryLabel, VictoryPie } from 'victory';

export const SingleRoundChat = ({ data }) => {
  const [percent, setPercent] = useState(0);
  const [percentData, setPercentData] = useState([
    { x: 1, y: 0 },
    { x: 2, y: 100 },
  ]);
  useEffect(() => {
    setPercent(data.percent);
    setPercentData([
      { x: 1, y: percent },
      { x: 2, y: 100 - percent },
    ]);
  }, [data, percent]);
  return (
    <div
      className={`w-full h-full flex p-4 rounded-lg shadow-xl min-w-[225px]`}
      style={{ backgroundColor: data.bgColor }}
    >
      <div className="w-1/2 h-full flex justify-center items-center text-white">
        <svg
          className="w-full "
          viewBox="0 0 400 400"
          width="100%"
          height="100%"
        >
          <VictoryPie
            animate={{ duration: 1000 }}
            standalone={false}
            width={400}
            height={400}
            data={percentData}
            // colorScale={["#19B3A6", "#EEEEEE" ]}
            innerRadius={120}
            cornerRadius={25}
            labels={() => null}
            style={{
              data: {
                fill: ({ datum }) => {
                  const color = percent > 100 ? '#ff5e5e' : '#fff';
                  return datum.x === 1 ? color : 'transparent';
                },
              },
            }}
          />
          <VictoryAnimation
            duration={1000}
            data={{ percent, data }}
            easing="circle"
          >
            {(props) => {
              return (
                <VictoryLabel
                  textAnchor="middle"
                  verticalAnchor="middle"
                  x={200}
                  y={200}
                  text={`${Math.round(props.percent)}%`}
                  style={{
                    fill: '#fff',
                    fontSize: 55,
                    color: '#fff',
                  }}
                />
              );
            }}
          </VictoryAnimation>
        </svg>
      </div>
      <div className=" w-1/2 h-full flex flex-col justify-between items-end py-2">
        <span className="text-white font-bold">{data.category}</span>
        <span className="text-white font-bold">{data.balance}</span>
        <span className="text-white font-bold text-sm">{data.createAt}</span>
      </div>
    </div>
  );
};
