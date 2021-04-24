/* App.js */
import React, { Component, useState, useEffect } from 'react';
import CanvasJSReact from './canvasjs.stock.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

var dps = [
  // { x: 1618794914000, y: [56000.82, 56000.95, 54000.84, 56000.2] },
  // { x: 1618795915000, y: [55000.85, 56000.3, 54000.66, 56000.07] },
  // { x: 1618796916000, y: [56000.19, 57000.5, 55000.21, 56000.15] },
  // { x: 1618797917000, y: [56000.11, 57000.17, 55000.02, 56000.11] },
  // { x: 1618798018000, y: [56000.12, 56000.57, 53000.54, 53000.74] },
  // { x: 1618798119000, y: [53000.51, 55000.86, 53000.23, 55000.47] },
  // { x: 1618798220000, y: [55000.66, 56000.7, 54000.58, 55000.07] },
  // { x: 1618798321000, y: [55000.24, 58000.15, 54000.93, 58000.08] },
  // { x: 1618798422000, y: [58000.12, 65000.8, 58000.08, 65000.49] },
  { x: 1618808063000, y: [65000.97, 67000.73, 63000.77, 64000.84] },
];
var dpv = [
  // { x: 1618794914000, y: 100 },
  // { x: 1618795915000, y: 111 },
  // { x: 1618796916000, y: 50 },
  // { x: 1618797917000, y: 23 },
  // { x: 1618798018000, y: 145 },
  // { x: 1618798119000, y: 45 },
  // { x: 1618798220000, y: 78 },
  // { x: 1618798321000, y: 98 },
  // { x: 1618798422000, y: 32 },
  { x: 1618808063000, y: 89 },
];
var xVal = new Date();
var yVal;
var vVal;
var hVal;
var lVal;

const RealtimeCandleChart4 = (inData) => {
  const [isLoaded, setIsLoaded] = useState(false);
  // const [options, setOptions] = useState();
  const [datapoint1, setDatapoint1] = useState([]);
  const [datapoint2, setDatapoint2] = useState([]);

  useEffect(() => {
    updateChart(inData);
  }, [datapoint1, datapoint2, inData]);

  const updateChart = (inData) => {
    var CurrentDate = new Date();

    if (Object.keys(inData).length > 0) {
      xVal = inData[Object.keys(inData).length - 1].x;
      // yVal = inData[Object.keys(inData).length - 1].y;
      // vVal = inData[Object.keys(inData).length - 1].v;
      yVal = [65000.97, 67000.73, 63000.77, 64000.84];
      vVal = 90;
      CurrentDate = xVal;
      dps.push({ x: CurrentDate, y: yVal });
      dpv.push({ x: CurrentDate, y: vVal });
      setIsLoaded(true);
    }
    if (dps.length > 4) {
      dps.shift();
      dpv.shift();
    }
    console.log(dps);
    console.log(dpv);
    setDatapoint1(dps);
    setDatapoint2(dpv);

    // setOptions(option);
  };

  const containerProps = {
    width: '100%',
    height: '450px',
    margin: 'auto',
  };

  const options = {
    theme: 'light2',
    title: {
      text: 'React StockChart with Date-Time Axis',
    },

    rangeSelector: {
      enabled: false,
      inputFields: {
        enabled: false,
      },
    },
    charts: [
      {
        axisY: {
          title: 'Bitcoin Price',
          prefix: '$',
        },

        data: [
          {
            name: 'Price (in USD)',
            xValueType: 'dateTime',
            xValueFormatString: 'H mm',
            yValueFormatString: '$#,###.##',
            type: 'candlestick',
            dataPoints: datapoint1,
          },
        ],
      },
      {
        height: 100,
        axisY: {
          title: 'Volume',
          tickLength: 0,
        },

        data: [
          {
            name: 'Volume',
            xValueType: 'dateTime',
            xValueFormatString: 'H mm',
            yValueFormatString: '$#,###.##',
            type: 'column',
            dataPoints: datapoint2,
          },
        ],
      },
    ],
    navigator: {
      enabled: false,
    },
  };

  return (
    <div>
      {!isLoaded ? (
        <h3>Please wait, loading...</h3>
      ) : (
        <CanvasJSStockChart containerProps={containerProps} options={options} />
      )}
    </div>
  );
};

export default RealtimeCandleChart4;
