import React from "react";

import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";

const Navigation = () => {
  return (
    <div>
      <Nav justify variant="tabs" defaultActiveKey="link-1">
        <Nav.Item>
          <LinkContainer to="/">
            <Nav.Link eventKey="link-1">Home</Nav.Link>
          </LinkContainer>
        </Nav.Item>

        <Nav.Item>
          <LinkContainer to="/product">
            <Nav.Link eventKey="link-2">Product</Nav.Link>
          </LinkContainer>
        </Nav.Item>

        <Nav.Item>
          <LinkContainer to="/about">
            <Nav.Link eventKey="link-3">About</Nav.Link>
          </LinkContainer>
        </Nav.Item>
      </Nav>
    </div>
  );
};

export default Navigation;
