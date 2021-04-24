import React from 'react';

const MarketInfo = ({ nyse, nasdaq }) => {
  return (
    <div>
      MarketInfo: NYSE is {nyse}, NASDAQ is {nasdaq}
    </div>
  );
};

export default MarketInfo;
