import React, { useState, useEffect } from "react";
import axios from "axios";

import { Jumbotron, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const DetiledProd = props => {
  const [data, setData] = useState({});

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
  }, []);

  const deleteProdHandler = ev => {
    ev.preventDefault();
    const id = props.match.params.id;
    axios
      .delete(`http://localhost:5000/api/product/${id}`, {
        headers: { token: localStorage.token }
      })
      .then(() => {
        props.history.push(`/product`);
      })
      .catch(err => {
        console.log(err);
        alert({ message: `there was error while deleting` });
      });
  };

  console.log(data);

  return (
    <div>
      <Jumbotron className="detiled">
        <div className="description">
          <div className="detText">
            <h1>{data.name}</h1>
            <p>{data.description}</p>
            <h2>{data.price}$</h2>
          </div>
          <div className="detImg">
            <img src={data.img} alt="avatar" />
          </div>
        </div>
        <div className="detiledBtns">
          <LinkContainer to="/product">
            <Button variant="primary">Go Back</Button>
          </LinkContainer>
          <div>
            <LinkContainer to={`/product/edit/${data.id}`}>
              <Button variant="dark">Edit</Button>
            </LinkContainer>
            <Button variant="danger" onClick={deleteProdHandler}>
              Delete
            </Button>
          </div>
        </div>
      </Jumbotron>
    </div>
  );
};

export default DetiledProd;
