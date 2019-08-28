import React, { useState, useEffect } from "react";
import axios from "axios";

import { Jumbotron, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const DetiledProd = props => {
  const [data, setData] = useState([]);

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

  return (
    <div>
      {data.map((item, index) => (
        <Jumbotron key={index} className="detiled">
          <div className="description">
            <h1>{item.name}</h1>
            <p>{item.description}</p>
            <h2>{item.price}$</h2>
            <p>
              <LinkContainer to="/product">
                <Button variant="primary">Go Back</Button>
              </LinkContainer>
            </p>
          </div>
          <img src={item.img} alt="avatar" id="detiledImg" />
        </Jumbotron>
      ))}
    </div>
  );
};

export default DetiledProd;
