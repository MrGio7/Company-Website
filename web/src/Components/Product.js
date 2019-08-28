import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";

import "../style/product.scss";

const Product = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("this is very good product");
  const [price, setPrice] = useState("80$");

  const customList = [
    {
      name: "myne",
      description: "this is very good product",
      img: 'https://picsum.photos/id/237/200/300',
      price: "80$"
    },
    {
      name: "nya",
      description: "this is not  product",
      img: 'https://picsum.photos/id/235/200/300',
      price: "0$"
    },
    {
      name: "jimi",
      description: "are u kiddin me",
      img: 'https://picsum.photos/id/232/200/300',
      price: "2000$"
    },
    {
      name: "gulie",
      description: "god damn it",
      img: 'https://picsum.photos/id/231/200/300',
      price: "2$"
    }
  ];

  return (
    <div className="productPage">
      {customList.map((item, index) => (
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
