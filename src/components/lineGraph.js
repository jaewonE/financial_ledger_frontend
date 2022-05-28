import React from 'react';
import {
  VictoryArea,
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryVoronoiContainer,
} from 'victory';
import { colorsProps } from '../props/color';

export const LineGraph = ({
  graphHeight = 200,
  data,
  dataInfo,
  fill = false,
  showLineLabel = true,
  singleLine = false,
}) => {
  const randNum = Math.floor(Math.random() * (colorsProps.length - 0));
  return (
    <div className="w-full h-auto flex flex-col border">
      <VictoryChart
        height={graphHeight}
        containerComponent={<VictoryVoronoiContainer />}
        padding={{ top: 30, bottom: 26, left: 50, right: 30 }}
      >
        {data.map((props, index) => (
          <VictoryLine
            key={index}
            style={{
              data: {
                stroke: singleLine ? colorsProps[randNum] : colorsProps[index],
              },
            }}
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 },
            }}
            data={props}
            y0={0}
          />
        ))}
        {fill &&
          data.map((props, index) => (
            <VictoryArea
              key={index}
              style={{
                data: {
                  fill: singleLine ? colorsProps[randNum] : colorsProps[index],
                  opacity: 0.1,
                  strokeWidth: 0,
                },
              }}
              animate={{
                duration: 2000,
                onLoad: { duration: 1000 },
              }}
              data={props}
            />
          ))}
        <VictoryAxis
          // tickValues={['a', 'b', 'c', 'd', 'e']}
          tickFormat={dataInfo.xFormat}
          style={{
            tickLabels: { fontSize: 10, padding: 5 },
          }}
        />
        <VictoryAxis
          dependentAxis
          tickValues={dataInfo.yTickValues}
          tickFormat={dataInfo.yFormat}
          style={{
            // ticks: { stroke: 'grey', size: -5 },
            grid: { stroke: ({ tick }) => '#c1bfbf' },
            tickLabels: {
              fontSize: 9,
              padding: 7,
              fontWeight: 600,
            },
          }}
        />
      </VictoryChart>
      <div className="flex justify-evenly items-start w-full pb-3">
        {showLineLabel &&
          dataInfo.lineLabels.map((name, index) => (
            <span
              key={index}
              className="text-base sm:text-lg xl:text-xl font-semibold"
              style={{
                color: singleLine ? colorsProps[randNum] : colorsProps[index],
              }}
            >
              — {name}
            </span>
          ))}
      </div>
    </div>
  );
};
