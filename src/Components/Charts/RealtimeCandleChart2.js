import React, { useState, useEffect } from 'react';
import { CanvasJS, CanvasJSChart } from 'canvasjs-react-charts';

var dps = [
  { x: 1088620200000, y: [56000.82, 56000.95, 54000.84, 56000.2] },
  { x: 1104517800000, y: [55000.85, 56000.3, 54000.66, 56000.07] },
  { x: 1112293800000, y: [56000.19, 57000.5, 55000.21, 56000.15] },
  { x: 1136053800000, y: [56000.11, 57000.17, 55000.02, 56000.11] },
  { x: 1157049000000, y: [56000.12, 56000.57, 53000.54, 53000.74] },
  { x: 1162319400000, y: [53000.51, 55000.86, 53000.23, 55000.47] },
  { x: 1180636200000, y: [55000.66, 56000.7, 54000.58, 55000.07] },
  { x: 1193855400000, y: [55000.24, 58000.15, 54000.93, 58000.08] },
  { x: 1209580200000, y: [58000.12, 65000.8, 58000.08, 65000.49] },
  { x: 1230748200000, y: [65000.97, 67000.73, 63000.77, 64000.84] },
  //   { x: new Date('2017-02-01'), y: [56000.82, 56000.95, 54000.84, 56000.2] },
  //   { x: new Date('2017-03-01'), y: [55000.85, 56000.3, 54000.66, 56000.07] },
  //   { x: new Date('2017-04-01'), y: [56000.19, 57000.5, 55000.21, 56000.15] },
  //   { x: new Date('2017-05-01'), y: [56000.11, 57000.17, 55000.02, 56000.11] },
  //   { x: new Date('2017-06-01'), y: [56000.12, 56000.57, 53000.54, 53000.74] },
  //   { x: new Date('2017-07-01'), y: [53000.51, 55000.86, 53000.23, 55000.47] },
  //   { x: new Date('2017-08-01'), y: [55000.66, 56000.7, 54000.58, 55000.07] },
  //   { x: new Date('2017-09-01'), y: [55000.24, 58000.15, 54000.93, 58000.08] },
  //   { x: new Date('2017-10-01'), y: [58000.12, 65000.8, 58000.08, 65000.49] },
  //   { x: new Date('2017-11-01'), y: [65000.97, 67000.73, 63000.77, 64000.84] },
  //   { x: new Date('2017-12-01'), y: [44.73, 47.64, 42.67, 46.16] },
];

var dpv = [];

// var dps = [
//   { x: 1, y: 10 },
//   { x: 2, y: 13 },
//   { x: 3, y: 18 },
//   { x: 4, y: 20 },
//   { x: 5, y: 17 },
//   { x: 6, y: 10 },
//   { x: 7, y: 13 },
//   { x: 8, y: 18 },
//   { x: 9, y: 20 },
//   { x: 10, y: 17 },
// ]; //dataPoints.
var xVal = new Date();
var yVal;
var vVal;
var hVal;
var lVal;

//var updateInterval = 1000;

const RealtimeCandleChart2 = (inData) => {
  const [isLoaded, setIsLoaded] = useState(true);
  const [options, setOptions] = useState();
  //   useEffect(() => {
  //     if (Object.keys(inData).length > 0) {
  //       console.log(inData);
  //       setDps(inData);
  //     }
  //   }, [inData]);

  useEffect(() => {
    //       //setInterval(updateChart, updateInterval);

    updateChart(inData);
  }, [inData]);

  const updateChart = (inData) => {
    //yVal = yVal + Math.round(5 + Math.random() * (-5 - 5));
    var CurrentDate = new Date();
    CurrentDate = xVal;

    if (Object.keys(inData).length > 0) {
      yVal = inData[Object.keys(inData).length - 1].y;
      xVal = inData[Object.keys(inData).length - 1].x;
      vVal = inData[Object.keys(inData).length - 1].v;

      dps.push({ x: CurrentDate, y: yVal });
      dpv.push({ x: CurrentDate, y: vVal });
      setIsLoaded(true);
    }

    if (dps.length > 10) {
      dps.shift();
      dpv.shift();
    }
    console.log(dps);
    console.log(dpv);

    const option = {
      title: {
        text: 'Realtime Bitcoin Price Chart',
      },
      // charts: [
      //   {
      axisX: {
        labelFormatter: function (e) {
          return CanvasJS.formatDate(e.value, 'H:mm');
        },
      },
      axisY: {
        prefix: '$',
        // minimum: 56000,
        // maximum: 58500,
        tickLength: 0,
      },

      data: [
        {
          type: 'candlestick',
          // xValueType: 'dateTime',
          xValueFormatString: 'H mm',
          yValueFormatString: '$#,###.##',
          dataPoints: dps,
        },
      ],
    };

    setOptions(option);
  };

  // {
  //   height: 100,

  //   axisY: {
  //     title: 'Volume',
  //     // prefix: '$',
  //     // tickLength: 0,
  //   },

  //   data: [
  //     {
  //       name: 'Volume',
  //       // yValueFormatString: '$#,###.##',
  //       type: 'column',
  //       dataPoints: dpv,
  //     },
  //   ],
  // },
  //    ],
  //  };
  const containerProps = {
    width: '100%',
    height: '450px',
    margin: 'auto',
  };

  return (
    <div>
      {!isLoaded ? (
        <h3>Please wait, loading...</h3>
      ) : (
        <CanvasJSChart containerProps={containerProps} options={options} />
      )}
    </div>
  );
};

export default RealtimeCandleChart2;
