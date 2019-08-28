import React, { useState, useEffect } from "react";
import axios from "axios";

import { Jumbotron, Button, Form } from "react-bootstrap";

const EditProduct = props => {
  const [data, setData] = useState({
    name: "",
    description: "",
    img: "",
    price: ""
  });

  const changeHandler = ev => {
    ev.persist();
    setData(data => ({
      ...data,
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
        setData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [props.match.params.id]);

  const editProdHandler = ev => {
    ev.preventDefault();
    const id = props.match.params.id;
    axios
      .put(`http://localhost:5000/api/product/${id}`, data, {
        headers: { token: localStorage.token }
      })
      .then(res => {
        props.history.push(`/product/${id}`);
      })
      .catch(err => {
        console.log(err);
      });
  };

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
              name="name"
            />
            <Form.Control
              size="sm"
              type="text"
              placeholder="Description"
              value={data.description}
              onChange={changeHandler}
              name="description"
            />
            <Form.Control
              type="text"
              placeholder="Price"
              value={data.price}
              onChange={changeHandler}
              name="price"
            />
          </div>
          <div className="detImg">
            <Form.Control
              size="lg"
              type="text"
              placeholder="Img src"
              value={data.img}
              onChange={changeHandler}
              name="img"
            />
          </div>
        </div>

        <Button variant="primary" onClick={editProdHandler}>
          Save
        </Button>
      </Jumbotron>
    </div>
  );
};

export default EditProduct;
