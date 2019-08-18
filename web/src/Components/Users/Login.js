import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

import "../../style/Users/Login.scss";

const Login = () => {
  const [values, setValues] = useState({ userName: "", password: "" });

  const changeHandler = ev => {
    ev.persist();
    setValues(values => ({
      ...values,
      [ev.target.name]: ev.target.value
    }));
  };

  console.log(values);

  return (
    <div className="loginPage">
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>UserName</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter UserName"
            onChange={changeHandler}
            name="userName"
            value={values.userName}
          />
          <Form.Text className="text-muted">
            We'll never share your password with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={changeHandler}
            name="password"
            value={values.password}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Login;
