import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../Components/Sidebar';
import WatchList from '../Components/WatchList';
import Position from '../Components/Position';
import AssetPieChart from '../Components/Charts/AssetPieChart';
import AssetBalanceChart from '../Components/Charts/AssetBalanceChart';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="container-fluid">
      <Row>
        <h3>Market is Open</h3>
      </Row>
      <Row>
        <Col>
          <Row>
            <Col className="col-md-6">
              <AssetBalanceChart />
            </Col>
            <Col className="col-md-6">
              <AssetPieChart />
            </Col>
          </Row>
          <Row>
            <Position />
          </Row>
        </Col>
        <Col className="col-md-4">
          <WatchList />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
