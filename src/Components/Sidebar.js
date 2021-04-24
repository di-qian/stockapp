import React from 'react';
import './Sidebar.css';
import { Nav } from 'react-bootstrap';

const Sidebar = () => {
  return (
    <div className="sidebar-div" id="sidebar">
      <Nav
        defaultActiveKey="/home"
        className="flex-column nav-sidebar-style"
        variant="light"
      >
        <Nav.Link href="/home">Deposit Fund</Nav.Link>
        <Nav.Link href="/logout">Log Out</Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
