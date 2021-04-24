import React, { useState, useEffect } from 'react';
import MarketInfo from '../Components/MarketInfo';
import axios from 'axios';

const Main = () => {
  const [marketStatus, setMarketStatus] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://api.polygon.io/v1/marketstatus/now?&apiKey=zDp2Ay5YFhaFA0lezBC61Fb6Mh2Y2UfE'
        );
        setMarketStatus(response.data.exchanges);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <MarketInfo {...marketStatus} />
    </div>
  );
};

export default Main;
