import React from "react";
import { Form, Button, Alert } from "react-bootstrap";

const Register = () => {
  return (
    <div className="registerPage">
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>UserName</Form.Label>
          <Form.Control type="text" placeholder="Enter UserName" />
          <Form.Text className="text-muted">
            We'll never share your password with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
};

export default Register;
