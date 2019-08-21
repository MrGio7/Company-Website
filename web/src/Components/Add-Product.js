import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    img: "",
    price: ""
  });

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
