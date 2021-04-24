import React, { useState, useEffect } from 'react';
import RealtimeCandleChart from '../Components/Charts/RealtimeCandleChart';
import RealtimeCandleChart2 from '../Components/Charts/RealtimeCandleChart2';
import RealtimeCandleChart3 from '../Components/Charts/RealtimeCandleChart3';
import RealtimeCandleChart4 from '../Components/Charts/RealtimeCandleChart4';
import RealtimeCandleChart5 from '../Components/Charts/RealtimeCandleChart5';
import RealtimeCandleChart6 from '../Components/Charts/RealtimeCandleChart6';

const RealtimeChart = () => {
  let [dataOut, setDataOut] = useState([]);
  let [initData, setInitData] = useState([]);
  let [initPrice, setInitPrice] = useState(0);
  const [btcPrice, setBtcPrice] = useState(0);
  const [priceDiff, setPriceDiff] = useState(0);
  const [percentDiff, setPercentDiff] = useState(0);

  let ws = new WebSocket('wss://socket.polygon.io/crypto');

  useEffect(() => {
    var now = new Date();
    var startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    // take next day date and reduce for one millisecond
    var endOfDay = new Date(
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1) - 1
    );

    var startOfDayTimestamp = startOfDay.valueOf();
    var endOfDayTimestamp = endOfDay.valueOf();

    const jsonify = (res) => res.json();
    const dataFetch = fetch(
      `https://api.polygon.io/v2/aggs/ticker/X:BTCUSD/range/1/minute/${startOfDayTimestamp}/${endOfDayTimestamp}?unadjusted=true&sort=asc&limit=1440&` +
        new URLSearchParams({
          apiKey: process.env.REACT_APP_APIKEY,
        })
    )
      .then(jsonify)
      .then((data) => {
        console.log(data.results);
        let CurrData = [];

        setInitPrice(Number(data.results[0].o));

        data.results.forEach((i) => {
          var dt = new Date(i.t);
          dt.setMinutes(dt.getMinutes() + 1);

          CurrData.push({
            x: dt,
            y: [Number(i.o), Number(i.h), Number(i.l), Number(i.c)],
            v: Number(i.v),
          });
        });

        setInitData(CurrData);
      });

    ws.onopen = function (event) {
      const auth_data = `{"action":"auth","params":"${process.env.REACT_APP_APIKEY}"}`;
      ws.send(auth_data);

      const request_data = '{"action":"subscribe", "params":"XA.BTC-USD"}';
      ws.send(request_data);
    };
    ws.onmessage = (data) => {
      let obj = JSON.parse(data.data);

      switch (obj[0].ev) {
        case 'XA':
          var dt = new Date(obj[0].s);
          dt.setMinutes(dt.getMinutes() + 1);

          let dataFr = {
            x: dt,
            y: [
              Number(obj[0].o),
              Number(obj[0].h),
              Number(obj[0].l),
              Number(obj[0].c),
            ],
            v: Number(obj[0].v),
          };

          setDataOut((curData) => [...curData, dataFr]);
          break;

        case 'XT':
          var dp = Number(obj[0].p);
          var dprounded = dp.toFixed(2);
          setBtcPrice(dprounded);

          break;

        default:
      }
      //  console.log(obj[0].ev === 'XA' ? dataOut : obj[0].message);
    };
    return () => {
      ws.close();
    };
  }, []);

  const getPriceDiff = () => {
    let priceDiff = btcPrice - initPrice;
    let priceDiffr = priceDiff.toFixed(2);

    return priceDiffr;
  };

  const getPercentDiff = () => {
    let percentDiff = ((btcPrice - initPrice) / initPrice) * 100;
    let percentDiffr = percentDiff.toFixed(2);

    return percentDiffr;
  };

  return (
    <div>
      <h2>Bitcoin</h2>
      {/* <h4>${btcPrice}</h4>
      <h6>
        ${getPriceDiff()} {getPercentDiff()}% Today
      </h6> */}
      <RealtimeCandleChart6 baseData={initData} inData={dataOut} />
      {/* <RealtimeCandleChart5 /> */}
      {/* <RealtimeCandleChart4 {...dataOut} /> */}
      {/* <RealtimeCandleChart3 /> */}
      {/* <RealtimeCandleChart2 {...dataOut} /> */}
      {/* <RealtimeCandleChart {...dataOut} /> */}
      {/* {dataT} {dataO} {dataC} {dataH} {dataL} */}
      {/* {dataOut.map((data) => {
        console.log(data.x + ' ' + data.y + ' ' + data.v);
      })} */}
    </div>
  );
};

export default RealtimeChart;
