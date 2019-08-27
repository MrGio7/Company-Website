import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Alert } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import likeImg from "../../style/img/like.png";
import dislikeImg from "../../style/img/dislike.png";

import "../../style/product.scss";

const Product = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/product`, {
        headers: { token: localStorage.token }
      })
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      {!localStorage.token ? (
        <div className="alert">
          <Alert variant="danger">
            <Alert.Heading>Hey, nice to see you</Alert.Heading>
            <p>Sorry But you neet to login first.</p>
            <hr />
            <p className="mb-0">
              If you don`t have account, please register first.
            </p>
          </Alert>
        </div>
      ) : (
        <div className="productPage">
          {data.map((item, index) => (
            <Card style={{ width: "18rem" }} key={index}>
              <Card.Img variant="top" src={item.img} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>Price: {item.price}$</Card.Text>
                <div className="cardBottom">
                  <LinkContainer to={`/product/${item.id}`}>
                    <Button variant="primary">View Detiled</Button>
                  </LinkContainer>
                  <div className="likeSection">
                    <h5>85</h5>
                    <img
                      className="likeBtn"
                      src={dislikeImg}
                      alt="like button"
                    />
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Product;
