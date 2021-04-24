import React, { Component, useState, useEffect } from 'react';
import CanvasJSReact from './canvasjs.stock.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;

var dpv = [];

const RealtimeCandleChart5 = () => {
  const [isLoaded, setIsLoaded] = useState(true);
  const [rangeChangedTriggered, setRangeChangedTriggered] = useState(false);

  const [dataPoints, setDataPoints] = useState([]);
  var currentDate = new Date();
  var dps = [];
  var dataCount = 700;
  var ystart = 50;
  var interval = 1000;
  var xstart = currentDate.getTime() - 700 * 1000;

  useEffect(() => {
    updateChart(xstart, ystart, dataCount, interval);
  }, []);

  function updateChart(xstart, ystart, length, interval) {
    var xVal = xstart,
      yVal = ystart;
    for (var i = 0; i < length; i++) {
      yVal = yVal + Math.round(5 + Math.random() * (-5 - 5));
      yVal = Math.min(Math.max(yVal, 5), 90);
      dps.push({ x: xVal, y: yVal });
      xVal += interval;
    }

    setDataPoints(dps);

    if (!rangeChangedTriggered) {
      options.navigator.slider.minimum = new Date(xVal - 90 * 1000);
    }

    xstart = xVal;
    dataCount = 1;
    ystart = yVal;

    // setTimeout(function () {
    //   updateChart(xstart, ystart, dataCount, interval);
    // }, 1000);
  }

  const options = {
    theme: 'light1', //"light2", "dark1", "dark2"
    title: {
      text: 'Dynamic StockChart',
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
          title: 'Pageviews Per Second',
        },
        toolTip: {
          shared: true,
        },
        data: [
          {
            type: 'line',
            name: 'Pageviews',
            xValueFormatString: 'MMM DD, YYYY HH:mm:ss',
            xValueType: 'dateTime',
            dataPoints: dataPoints,
          },
        ],
      },
    ],
    navigator: {
      slider: {
        minimum: new Date(currentDate.getTime() - 90 * 1000),
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

export default RealtimeCandleChart5;
