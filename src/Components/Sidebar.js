import React from 'react';
import './Sidebar.css';
import { Nav } from 'react-bootstrap';

const Sidebar = () => {
  return (
    <div>
      <Nav
        defaultActiveKey="/home"
        className="flex-column nav-sidebar-style"
        variant="light"
      >
        <Nav.Link href="/home">Deposit Fund</Nav.Link>
        <Nav.Link eventKey="link-1">Log Out</Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;
