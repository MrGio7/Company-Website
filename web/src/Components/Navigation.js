import React from "react";

import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";

const Navigation = () => {
  return (
    <div>
      <Nav justify variant="tabs" defaultActiveKey="link-1">
        <LinkContainer to="/">
          <Nav.Item>
            <Nav.Link eventKey="link-1">Home</Nav.Link>
          </Nav.Item>
        </LinkContainer>

        <LinkContainer to="/product">
          <Nav.Item>
            <Nav.Link eventKey="link-2">Product</Nav.Link>
          </Nav.Item>
        </LinkContainer>

        <LinkContainer to="/about">
          <Nav.Item>
            <Nav.Link eventKey="link-3">About</Nav.Link>
          </Nav.Item>
        </LinkContainer>
      </Nav>
    </div>
  );
};

export default Navigation;
