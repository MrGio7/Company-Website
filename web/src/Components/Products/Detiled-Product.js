import React, { useState, useEffect } from "react";
import axios from "axios";

import { Jumbotron, Button, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const DetiledProd = props => {
  const [data, setData] = useState({});
  const [user, setUser] = useState({});
  const [comments, setComments] = useState([]);
  const [userList, setUserList] = useState([]);
  const [newComment, setNewComment] = useState({});

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
  }, [props.match.params.id]);

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
    const id = props.match.params.id;

    axios
      .get(`http://localhost:5000/api/comments/${id}`)
      .then(res => {
        setComments(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [props.match.params.id]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/users`)
      .then(res => {
        setUserList(res.data);
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

  const changeHandler = ev => {
    ev.persist();
    setNewComment(comment => ({
      ...newComment,
      id_user: user.id,
      id_product: props.match.params.id,
      [ev.target.name]: ev.target.value
    }));
  };

  const newCommentHandler = ev => {
    ev.preventDefault();
    axios
      .post(`http://localhost:5000/api/comments/add`, newComment)
      .then(res => {
        setNewComment({text: ''});
        setComments([...comments, res.data]);
      })
      .catch(err => {
        console.log(err);
      });
  };

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
          {user.authority !== "user" ? (
            <div>
              <LinkContainer to={`/product/edit/${data.id}`}>
                <Button variant="dark">Edit</Button>
              </LinkContainer>
              <Button variant="danger" onClick={deleteProdHandler}>
                Delete
              </Button>
            </div>
          ) : null}
        </div>
      </Jumbotron>
      {comments.map(comment => (
        <div key={comment.id}>
          <div className="comments">
            <img
              src="https://www.pinclipart.com/picdir/middle/200-2008697_account-customer-login-man-user-icon-login-icon.png"
              alt="avatar"
            />
            <Jumbotron className="commentsText">
              <p>
                <strong>
                  {userList.map(value => {
                    if (value.id === comment.id_user) {
                      return value.username;
                    }
                  })}{" "}
                </strong>
                {comment.text}
              </p>
            </Jumbotron>
          </div>
          <div className="comDate">
            <p>{comment.created_at}</p>
          </div>
        </div>
      ))}
      <div className="newComment">
        <img
          src="https://www.pinclipart.com/picdir/middle/200-2008697_account-customer-login-man-user-icon-login-icon.png"
          alt="avatar"
        />
        <Form onSubmit={newCommentHandler} className="commentForm">
          <Form.Control
            type="text"
            placeholder="Write a comment..."
            name="text"
            value={setNewComment.text}
            onChange={changeHandler}
          />
        </Form>
      </div>
    </div>
  );
};

export default DetiledProd;
