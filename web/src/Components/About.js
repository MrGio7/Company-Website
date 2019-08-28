import React from "react";

import { Carousel } from "react-bootstrap";
import "../style/About.scss";

const About = () => {
  return (
    <div>
      <div className="aboutPage">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://picsum.photos/id/240/300/200"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>First slide label</h3>
              <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://picsum.photos/id/241/300/200"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://picsum.photos/id/242/300/200"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Third slide label</h3>
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      <div className="bottom">
        <div>
          <h2>About US</h2>
          <h5>Blog</h5>
          <h5>About</h5>
          <h5>Product</h5>
          <h5>Contact </h5>
          <h5>Pricing</h5>
        </div>

        <div>
          <h2>Find US</h2>
          <h5>Social Media</h5>
          <h5>Marketing</h5>
          <h5>Product Updates</h5>
          <h5>RSS Feed</h5>
        </div>

        <div>
          <h2>License</h2>
          <h5>Terms</h5>
          <h5>Privacy</h5>
          <h5>Help</h5>
        </div>
      </div>
    </div>
  );
};

export default About;
