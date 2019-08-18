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
      img: 'https://i1217.photobucket.com/albums/dd388/jnelson9r/J%20Nelson%20Real%20Estate/JNELSONREALESTATE5.jpg',
      price: "80$"
    },
    {
      name: "nya",
      description: "this is not  product",
      img: 'https://i718.photobucket.com/albums/ww187/talisson_01/House_of____by_dechobek.jpg',
      price: "0$"
    },
    {
      name: "jimi",
      description: "are u kiddin me",
      img: 'https://i865.photobucket.com/albums/ab218/zola_wagner/Backofhouse.jpg',
      price: "2000$"
    },
    {
      name: "gulie",
      description: "god damn it",
      img: 'https://i1217.photobucket.com/albums/dd388/jnelson9r/J%20Nelson%20Real%20Estate/JNELSONREALESTATE4.jpg',
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
