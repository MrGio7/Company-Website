import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Alert } from "react-bootstrap";

import "../style/product.scss";

const Product = () => {
  const [data, setData] = useState({ productList: [] });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/product`, {
        headers: { token: localStorage.token }
      })
      .then(res => {
        setData(() => ({ productList: res.data }));
      })
      .catch(err => {
        console.log(err);
      });
  });

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
          {data.productList.map((item, index) => (
            <Card style={{ width: "18rem" }} key={index}>
              <Card.Img variant="top" src={item.img} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>Price: {item.price}</Card.Text>
                <Button variant="primary">View Detiled</Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Product;
