import React, { Component, useState, useEffect } from 'react';
import CanvasJSReact from './canvasjs.stock.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

const RealtimeCandleChart6 = ({ baseData, inData }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [rangeChangedTriggered, setRangeChangedTriggered] = useState(false);
  const [datapoint1, setDatapoint1] = useState([]);
  const [datapoint2, setDatapoint2] = useState([]);

  var currentDate = new Date();
  var xVal = new Date();
  var yVal;
  var vVal;

  //console.log(isLoaded);

  const setInitData = (inBaseData) => {
    inBaseData.forEach((i) => {
      xVal = i.x;
      let dps = { x: xVal, y: i.y };
      let dpv = { x: xVal, y: i.v };
      setDatapoint1((currentData) => [...currentData, dps]);
      setDatapoint2((currentData) => [...currentData, dpv]);

      setIsLoaded(true);
    });
    console.log(datapoint1);
    console.log(datapoint2);
  };

  //   useEffect(() => {
  //     setInitData(baseData);
  //   }, [baseData]);

  useEffect(() => {
    if (!isLoaded) {
      setInitData(baseData);
    }

    updateChart(inData);
  }, [baseData, inData]);

  const updateChart = (inData) => {
    // var currentDate = new Date();
    // currentDate = xstart;
    if (Object.keys(inData).length > 0) {
      xVal = inData[Object.keys(inData).length - 1].x;
      yVal = inData[Object.keys(inData).length - 1].y;
      vVal = inData[Object.keys(inData).length - 1].v;
      //yVal = [65000.97, 67000.73, 63000.77, 64000.84];
      //   vVal = 3600;

      let dps = { x: xVal, y: yVal };
      let dpv = { x: xVal, y: vVal };
      setDatapoint1((currentData) => [...currentData, dps]);
      setDatapoint2((currentData) => [...currentData, dpv]);
      // setDatapoint1(dps);
      //   dpv.push({ x: CurrentDate, y: vVal });
      setIsLoaded(true);
    }
    // if (dps.length > 4) {
    //   dps.shift();
    //   //   dpv.shift();
    // }

    // console.log(dpv);

    // setDatapoint2(dpv);

    if (!rangeChangedTriggered) {
      options.navigator.slider.minimum = new Date(xVal - 600 * 1000);
    }

    // xstart = xVal;
    // dataCount = 1;
    // ystart = yVal;

    // setTimeout(function () {
    //   updateChart(xstart, ystart, dataCount, interval);
    // }, 1000);
  };

  const options = {
    theme: 'light2', //"light2", "dark1", "dark2"
    title: {
      text: 'Realtime Update / Minute',
      fontSize: 25,
    },
    rangeChanged: function (e) {
      setRangeChangedTriggered(true);
    },
    charts: [
      {
        axisX: {
          crosshair: {
            enabled: true,
            valueFormatString: 'MMM DD, YYYY HH:mm:ss',
          },
        },
        axisY: {
          title: 'Price in USD',
        },
        toolTip: {
          shared: true,
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
        // data: [
        //   {
        //     type: 'line',
        //     name: 'Pageviews',
        //     xValueFormatString: 'MMM DD, YYYY HH:mm:ss',
        //     xValueType: 'dateTime',
        //     dataPoints: datapoint1,
        //   },
        // ],
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
      slider: {
        minimum: new Date(currentDate.getTime() - 600 * 1000),
      },
      axisX: {
        labelFontColor: 'white',
      },
    },
    rangeSelector: {
      enabled: false,
    },
  };

  return (
    <div>
      {!isLoaded ? (
        <h3>Please wait, loading...</h3>
      ) : (
        <CanvasJSStockChart options={options} />
      )}
    </div>
  );
};

export default RealtimeCandleChart6;
