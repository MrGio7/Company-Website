import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";

import "../style/product.scss";

const Product = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    img: "",
    price: ""
  });

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
    <div className="productPage">
      {data.productList.map((item, index) => (
        <Card style={{ width: "18rem" }} key={index}>
          <Card.Img variant="top" src={item.img} />
          <Card.Body>
            <Card.Title>{item.name}</Card.Title>
            <Card.Text>{item.description}</Card.Text>
            <Card.Text>Price: {item.price}</Card.Text>
            <Button variant="primary">View Detiled</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Product;
