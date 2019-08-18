import React, { useState } from "react";

import "../style/product.scss";

const Product = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("this is very good product");
  const [price, setPrice] = useState("80$");

  const customList = [
    {
      name: "myne",
      description: "this is very good product",
      price: "80$"
    },
    {
      name: "nya",
      description: "this is not  product",
      price: "0$"
    },
    {
      name: "jimi",
      description: "are u kiddin me",
      price: "2000$"
    },
    {
      name: "gulie",
      description: "god damn it",
      price: "2$"
    }
  ];

  return (
    <div className="productPage">
      {customList.map((item, index) => (
        <div className="product" key={index}>
          <h1>Name: {item.name}</h1>
          <p>Description: {item.description}</p>
          <h2>Price: {item.price}</h2>
        </div>
      ))}
    </div>
  );
};

export default Product;
