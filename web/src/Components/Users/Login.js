import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

import "../../style/Users/Login.scss";

const Login = () => {
  const [user, setUser] = useState({ username: "", password: "" });

  const changeHandler = ev => {
    ev.persist();
    setUser(user => ({
      ...user,
      [ev.target.name]: ev.target.value
    }));
  };

  const loginHandler = ev => {
    ev.preventDefault();
    axios
      .post(`http://localhost:5000/api/auth/login`, user)
      .then(res => {
        console.log(res);
        console.log(res.data);
        localStorage.setItem("token", res.data.token);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="loginPage">
      <Form onSubmit={loginHandler}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>UserName</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter UserName"
            onChange={changeHandler}
            name="username"
            value={user.username}
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
            value={user.password}
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
