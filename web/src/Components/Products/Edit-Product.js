import React, { useState, useEffect } from "react";
import axios from "axios";

import { Jumbotron, Button, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const EditProduct = props => {
  const [data, setData] = useState({
    name: "",
    description: "",
    img: "",
    price: ""
  });

  const changeHandler = ev => {
    ev.persist();
    setData(product => ({
      ...product,
      [ev.target.name]: ev.target.value
    }));
  };

  useEffect(() => {
    const id = props.match.params.id;
    axios
      .get(`http://localhost:5000/api/product/${id}`, {
        headers: { token: localStorage.token }
      })
      .then(res => {
        res.data.map(item =>
          setData({
            name: item.name,
            description: item.description,
            img: item.img,
            price: item.price
          })
        );
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Jumbotron className="detiled">
        <div className="description">
          <div className="detText">
            <Form.Control
              type="text"
              placeholder="Name"
              value={data.name}
              onChange={changeHandler}
            />
            <Form.Control
              size="sm"
              type="text"
              placeholder="Description"
              value={data.description}
              onChange={changeHandler}
            />
            <Form.Control
              type="text"
              placeholder="Price"
              value={data.price}
              onChange={changeHandler}
            />
          </div>
          <div className="detImg">
            <Form.Control
              size="lg"
              type="text"
              placeholder="Img src"
              value={data.img}
              onChange={changeHandler}
            />
          </div>
        </div>

        <Button variant="primary">Save</Button>
      </Jumbotron>
    </div>
  );
};

export default EditProduct;
