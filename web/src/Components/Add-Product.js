import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";
import "../style/Add-Product.scss";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    img: "",
    price: ""
  });

  const changeHandler = ev => {
    ev.persist();
    setProduct(product => ({
      ...product,
      [ev.target.name]: ev.target.value
    }));
  };

  const newProdHandler = ev => {
    ev.preventDefault();
    axios
      .post(`http://localhost:5000/api/product/add`, product)
      .then(res => {
        console.log(res);
        console.log(res.data);
        <Alert variant="success">
          <Alert.Heading>Hey, nice to see you</Alert.Heading>
          <p>
            Aww yeah, you successfully read this important alert message. This
            example text is going to run a bit longer so that you can see how
            spacing within an alert works with this kind of content.
          </p>
          <hr />
          <p className="mb-0">
            Whenever you need to, be sure to use margin utilities to keep things
            nice and tidy.
          </p>
        </Alert>;
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="add-product">
      <Form>
        <Form.Group controlId="formBasicText">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Name" />
          <Form.Text className="text-muted">
            We'll never share your password with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicText">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" placeholder="Description" />
        </Form.Group>

        <Form.Group controlId="formBasicText">
          <Form.Label>Image</Form.Label>
          <Form.Control type="text" placeholder="Image URL" />
        </Form.Group>

        <Form.Group controlId="formBasicText">
          <Form.Label>Price: $</Form.Label>
          <Form.Control type="text" placeholder="Product Price in USD" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add
        </Button>
      </Form>
    </div>
  );
};

export default AddProduct;
