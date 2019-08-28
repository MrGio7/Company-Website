import React, { useState } from "react";
import axios from "axios";
import "../../style/Users/Register.scss";
import { Form, Button } from "react-bootstrap";

const Register = () => {
  const [user, setUser] = useState({ username: "", password: "" });

  const changeHandler = ev => {
    ev.persist();
    setUser(user => ({
      ...user,
      [ev.target.name]: ev.target.value
    }));
  };

  const registerHandler = ev => {
    ev.preventDefault();
    axios
      .post(`http://localhost:5000/api/auth/register`, user)
      .then(res => {
        console.log(res);
        console.log(res.data);
        alert("Congrats U registered Successfully");
        window.location.pathname = "/home";
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <div className="registerPage">
      <Form onSubmit={registerHandler}>
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
          Register
        </Button>
      </Form>
    </div>
  );
};

export default Register;
