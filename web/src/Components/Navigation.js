import React from "react";

import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";
import "../style/Navigation.scss";

const Navigation = () => {
  const LogOut = () => {
    localStorage.removeItem("token");
    window.location.pathname = "/home";
  };

  return (
    <div>
      <Nav justify variant="tabs" defaultActiveKey="link-1">
        <Nav.Item>
          <LinkContainer to="/home">
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

        {!localStorage.token ? null : (
          <Nav.Item>
            <LinkContainer to="/addproduct">
              <Nav.Link eventKey="link-4">Add Product</Nav.Link>
            </LinkContainer>
          </Nav.Item>
        )}

        {!localStorage.token ? (
          <Nav.Item>
            <LinkContainer to="/login">
              <Nav.Link eventKey="link-5">Login</Nav.Link>
            </LinkContainer>
          </Nav.Item>
        ) : (
          <Nav.Item onClick={LogOut}>
            <Nav.Link eventKey="link-6">LogOut</Nav.Link>
          </Nav.Item>
        )}
      </Nav>
    </div>
  );
};

export default Navigation;
