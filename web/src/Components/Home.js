import React from "react";

import { Jumbotron, Container } from "react-bootstrap";
import "../style/Home.scss";
import header1 from "../style/img/header1.png";
import header2 from "../style/img/header2.png";

const Home = () => {
  return (
    <div className="homePage">
      <div className="top">
        <img src={header2} id="no2" alt="header" />
        <img src={header1} id="no1" alt="header" />
      </div>
      <div className="content">
        <Jumbotron fluid>
          <Container>
            <h1>Welcome To G.B`s WebSite</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              faucibus euismod ullamcorper. Donec et fringilla diam, a fermentum
              elit. Fusce dignissim luctus turpis, et fringilla est aliquam
              vitae. Curabitur ornare mauris fringilla, volutpat nisl at,
              convallis erat. Vivamus quis justo molestie dui ultrices sagittis
              nec non orci. Mauris condimentum vehicula fringilla. Nullam eget
              mauris leo. Vestibulum sem dui, semper vel risus ultrices, dictum
              volutpat libero. Etiam vestibulum nunc sed finibus luctus.
              Phasellus euismod elit elementum nisl auctor, eu rhoncus ligula
              sagittis.
            </p>
          </Container>
        </Jumbotron>
      </div>
    </div>
  );
};

export default Home;
