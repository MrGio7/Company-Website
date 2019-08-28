import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import "../../style/Add-Product.scss";

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
        alert("congrats U have successfully added new product");
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="add-product">
      <Form onSubmit={newProdHandler}>
        <Form.Group controlId="formBasicText">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Name"
            onChange={changeHandler}
            name="name"
            value={product.name}
          />
          <Form.Text className="text-muted">
            We'll never share your password with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicText">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Description"
            onChange={changeHandler}
            name="description"
            value={product.description}
          />
        </Form.Group>

        <Form.Group controlId="formBasicText">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="text"
            placeholder="Image URL"
            onChange={changeHandler}
            name="img"
            value={product.img}
          />
        </Form.Group>

        <Form.Group controlId="formBasicText">
          <Form.Label>Price: $</Form.Label>
          <Form.Control
            type="text"
            placeholder="Product Price in USD"
            onChange={changeHandler}
            name="price"
            value={product.price}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add
        </Button>
      </Form>
    </div>
  );
};

export default AddProduct;
