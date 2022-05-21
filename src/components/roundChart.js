import { useEffect, useState } from 'react';
import { VictoryContainer, VictoryPie, VictoryTooltip } from 'victory';
import { colorsProps } from '../props/color';
import CountUp from 'react-countup';

export const RoundChart = ({
  data: inputData,
  label: labelText = { main: '출금', sub: '30000원', subNum: 30000 },
  half = false,
  sideLabel = true,
}) => {
  const [data, setData] = useState([{ x: 1, y: 0 }]);
  const [chartAngle, setChartAngle] = useState(-90);
  useEffect(() => {
    setData(inputData);
    setChartAngle(half ? 90 : 270);
  }, [inputData, half]);
  return (
    <div className="w-full h-full flex flex-col md:flex-row border">
      <div className="relative">
        <VictoryPie
          className={`z-10 ${sideLabel ? 'w-full md:w-[60%]' : 'w-full'}`}
          data={data}
          animate={{
            duration: 1000,
          }}
          colorScale={colorsProps.slice(0, data.length)}
          containerComponent={<VictoryContainer responsive={true} />}
          labelComponent={
            <VictoryTooltip
              pointerLength={({ datum }) => (datum.y > 0 ? 5 : 20)}
              // flyoutStyle={{
              //   stroke: ({ datum }) => (datum.x === 10 ? 'tomato' : 'black'),
              // }}
            />
          }
          innerRadius={135}
          startAngle={-90}
          endAngle={chartAngle}
        />
        <div
          className={`absolute w-full h-full flex flex-col justify-center items-center top-0`}
        >
          <span className="pointer-events-none font-semibold text-xl md:text-2xl lg:text-3xl">
            {labelText.main}
          </span>
          {labelText.sub ? (
            <span className="pointer-events-none font-semibold tracking-wide text-md md:text-lg lg:text-xl my-1 text-gray-500">
              {labelText.sub}
            </span>
          ) : (
            <div className="pointer-events-none font-semibold tracking-wide text-md md:text-lg lg:text-xl my-1 text-gray-500">
              <CountUp
                end={labelText.subNum ? labelText.subNum : 1000}
                duration={1}
              />
              <span>원</span>
            </div>
          )}
        </div>
      </div>
      {sideLabel && (
        <div className="w-full md:w-[40%] flex flex-col justify-center items-start p-4 pl-6">
          {inputData.map((row, index) => (
            <div key={index} className="w-full flex mb-2">
              <span className="w-1/2 flex justify-start items-center overflow-hidden text-gray-700">
                <div
                  style={{ backgroundColor: colorsProps[index] }}
                  className="w-3 h-3 rounded-full mr-2"
                ></div>
                {row.x}
              </span>
              <span className="w-1/2 flex justify-end text-gray-600">
                {`${row.y}원`}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// return (
//   <VictoryContainer ref={componentRef}>
//     <VictoryPie
//       // radius={100}
//       // style={{ parent: { border: '1px solid black' } }}
//       // labelComponent={
//       //   <VictoryTooltip
//       //     pointerLength={({ datum }) => (datum.y > 0 ? 5 : 20)}
//       //     // flyoutStyle={{
//       //     //   stroke: ({ datum }) => (datum.x === 10 ? 'tomato' : 'black'),
//       //     // }}
//       //   />
//       // }
//       // animate={{
//       //   duration: 1000,
//       // }}
//       // height={height}
//       // width={width}
//       colorScale={colors.slice(0, data.length)}
//       data={data}
//       // innerRadius={80}
//       // standalone={false}
//       // containerComponent={<VictoryContainer preserveAspectRatio="none" />}
//       // origin={{ y: 1 }}
//       // padAngle={({ datum }) => datum.y}
//       // width={baseWidth - 10}
//       // height={baseWidth - 10}
//       // padding={padding}
//     />
//     {/* <VictoryLabel
//       textAnchor="middle"
//       style={{ fontSize: labelFontSize }}
//       origin={{ x: 100, y: 200 }}
//       // x={(baseWidth - 10 - padding.left - padding.right) / 2 + padding.left}
//       // y={baseWidth / 2 - 5}
//       text={'Hello'}
//     /> */}
//   </VictoryContainer>
// );
