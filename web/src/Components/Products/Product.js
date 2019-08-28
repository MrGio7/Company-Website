import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button, Alert } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import likeImg from "../../style/img/like.png";
import dislikeImg from "../../style/img/dislike.png";

import "../../style/product.scss";

const Product = () => {
  const [data, setData] = useState([]);
  const [counter, setCounter] = useState([0]);
  const [user, setUser] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/product`, {
        headers: { token: localStorage.token }
      })
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/auth/user`, {
        headers: { token: localStorage.token }
      })
      .then(res => {
        setUser(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/likes`)
      .then(res => {
        setCounter(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const likeHandler = ev => {
    ev.preventDefault();
    const body = { id_product: ev.target.id, id_user: user.id };

    axios
      .put(`http://localhost:5000/api/likes`, body)
      .then(res => {
        setCounter(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const find = (prodId, userId) =>
    counter.find(
      value => value.id_product === prodId && value.id_user === userId
    );

  return (
    <div>
      {!localStorage.token ? (
        <div className="alert">
          <Alert variant="danger">
            <Alert.Heading>Hey, nice to see you</Alert.Heading>
            <p>Sorry But you neet to login first.</p>
            <hr />
            <p className="mb-0">
              If you don`t have account, please register first.
            </p>
          </Alert>
        </div>
      ) : (
        <div className="productPage">
          {data.map((item, index) => (
            <Card style={{ width: "18rem" }} key={index}>
              <Card.Img variant="top" src={item.img} />
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>Price: {item.price}$</Card.Text>
                <div className="cardBottom">
                  <LinkContainer to={`/product/${item.id}`}>
                    <Button variant="primary">View Detiled</Button>
                  </LinkContainer>
                  <div className="likeSection">
                    <h5>
                      {counter
                        .map(each => {
                          return each.id_product === item.id ? each.likes : 0;
                        })
                        .reduce((acc, cur) => acc + cur)}
                    </h5>
                    <img
                      className="likeBtn"
                      id={item.id}
                      src={
                        find(item.id, user.id) &&
                        find(item.id, user.id).likes === 1
                          ? likeImg
                          : dislikeImg
                      }
                      alt="like button"
                      onClick={likeHandler}
                    />
                  </div>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Product;
