import React from 'react';
import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryVoronoiContainer,
} from 'victory';
import { colorsProps } from '../props/color';

const dataInfoSample = {
  yTickValues: [2000, 6000, 10000, 14000],
  yFormat: (t) => `${Math.round(t / 1000)}천원`,
  lineNames: ['이번주', '지난주'],
};

export const LineGraph = ({ graphHeight = 200, data, dataInfo }) => {
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
              data: { stroke: colorsProps[index] },
            }}
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 },
            }}
            data={props}
            y0={0}
          />
        ))}
        <VictoryAxis
          // tickValues={['a', 'b', 'c', 'd', 'e']}
          tickFormat={(t) => `${t}일`}
          style={{
            tickLabels: { fontSize: 10, padding: 5 },
          }}
        />
        <VictoryAxis
          dependentAxis
          tickValues={dataInfoSample.yTickValues}
          tickFormat={dataInfoSample.yFormat}
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
        {dataInfoSample.lineNames.map((name, index) => (
          <span
            key={index}
            className="text-base sm:text-lg xl:text-xl font-semibold"
            style={{ color: `${colorsProps[index]}` }}
          >
            — {name}
          </span>
        ))}
      </div>
    </div>
  );
};
