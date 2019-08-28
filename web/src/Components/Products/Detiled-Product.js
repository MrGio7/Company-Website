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

    const form = ev.target;

    axios
      .post(`http://localhost:5000/api/comments/add`, newComment, {
        headers: { token: localStorage.token }
      })
      .then(res => {
        setComments([...comments, res.data]);
        setNewComment({ text: "" });
        form.reset();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const delComHandler = ev => {
    ev.preventDefault();
    const { id } = ev.target;

    axios
      .delete(`http://localhost:5000/api/comments/${id}`, {
        headers: { token: localStorage.token }
      })
      .then(res => {
        setComments(
          comments.filter(comment => {
            const index = comment.id.toString();
            return index !== id;
          })
        );
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
      <div id="commentsSection">
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
              {comment.id_user === user.id || user.authority === "admin" ? (
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAwFBMVEXiGxv////EBgbhAADDAADXFBTiExPBAADiGBjTEhLiEhLhDAz86Oj78fH86+v2yMjvycnGFhb639/ORkbGExPvk5P1vr7nVlbkNjb89PTnVFTmRETlOzvkMjLjKSnzsbHqbW3jISHthobxpqbPS0voXl7qcnLvlZXwnJzxp6fmSkr0u7vztLTtiYnHHh7pZGTsf3/01NTSWVnaeHjXbGzUXl7knZ3019fQAADhkpLfiYnLLS3NOzvcg4PmqKjOQUHknCt0AAAMFklEQVR4nNXd6ZabuBIAYGjpItp4SZzYacdL7F7cnd6XJJ1MZpL3f6srjN1gIwmpqoRx/Zlz5iQevimh0gYEofcYtXs3Z4PT5afxZDpbBIvZdDL+tDwdnN302iP///nA5493e2eP1wu2iiSJ4jgO0pD/jJIk+9eL68ezd12fF+FL2B0OPq9gUabShbSmf+x6MPTF9CHs3i5n8qpbRtp2tOSfny1vfSiphaPe6YnMnDlxmnTKbE7uetS3JqlwNJzLXEQA3SYi+ffnQ1IkoTDlJQhdIZXzId1lUQn7dwkF7w2Z3PWJroxG+GXMGOTWMyAZG38huTYCYXeAu/d0Ie/JS4LOFS3sL6nTl4dM5BLdWJHC/gPd3aeMhD0gjSihdx+FESFs1+FbG9t7EI7uavJlxjvwKAAq/MpYbb40WPK1VuHT1Fv/qYuYTV/rEz56qX9VEbHHmoS9qN4GmgeLenUIl7U30DxitvQufFrsK4FZsMWTX+FgL3dgMSJ26VHYGe83gVmwcceXsOe09OIvWsylw3EQXu6xi9mOmF35EH5qQgvdBLsgF3ZOmgSUxBPbm9FS+NqQWzCPFrMcxNkJh425BfOILfsbK+HXBgJTotV0w0Z41qxbMA92RiO8aipQEi2qRrXwsrlASawewlUKGw20IVYJG9xEs6hsqBXCr00HSmLF4r9ZeNt8oCTewoW9QwBKorH0m4T9Rhb6csTMtChuEI6ifc/nbSOKDOvFBuGkaYNtfbQmEOHFYdyEWRjmi1ph4wvhdujLok54IN1oHtoOVSPsHEg3mkfMNJN+jfCAeplN6HobtfDu0NpoGuzOXvjuEIGS+M5aGBzaTZhFvLAVzg8zhTKJqp0phXB4qEBJVJyHUwhBRyebEXFiI3w83BTKJJY3wkvCp0MGSmJpA7UknB7KlEkd0bRKeAALM+YoLYTvCEcH3M1kEScjo/D00FNYHrxtC9uHD5TErkH4ADuM10pYQj4ZSR81Ad0zyYNe2IekMGbs4vHy9IH2qDBj1/JH56Af3V562xJeAFIYsav1rf2Vbp84Zo/rpjYEnFBKLnTCV0AKk2l+uJXsuE1UrNuAecDWBnhRCEhhdLLV5mnOa7Tirb7CfRi5lcSCEHIXsp3jyRTEVrTzDIL7MKt4JxaES/cUstNwJ/DEVrD7kMW7n66/kRQmirmwC0lhecMASyxlUAb/n/OF5T+SCwfulxbPShcThp9RxChWPCbzTbgS2UAhBFSe1meFEJXFSJHBMPzFjxyJMSsLvwCuq6XeLYBnsRUrH6z4wY9cifnO8JtwDJgXRmOlEJxFZROV8Z8UOhLzS9sIYQO23ZkKLotRS/NozHkqdCS+dYIbIWzapFrbAmdRl8GwI1LgkVt381bINkLYsFnXTCFEbQazRuqaxbe+Zi2ErpHqD8+5ErUZDJ/E0RGAuGlfa+Ec+pSW/hyEGzFq6YAdzo8gxGS+JQTP7QynPF26m0hdJlLgxwLQhRizUUGIWMg3EO2zaMjgNtCFuG6mmRDcSAOSLEaRZQadiOtmmglRCxDoLKqHahqgPXHdm66EyGMJyCzqy4QSaE/MLmslxK6SorKoLxOdIyXQuvRnRX8lPMHuVSCIzhm0z2K2xJIKCdaBwURDBvVAW+JqHpwKIRMnIqKhTGiaqAtxNYVKhZhaYUPUdzeGQv/eCLQjrupFKpyRLFYDsuhQ6EHE1SpLAFuCciSqs2go9FUZtCSmN2JAePbCMYuOhR5CTAduAeURL6csGsqETQatiOleohRe0+3cOxCBZWIrKkt/dL0SUu6KWhOjBFDo3bPIUiHtvq8l0Xo+iCSythQSnwa2IhJlsJooLyYgP9BtQUSWCQciu5JCkhGNJTErGlGC72QsiXJUE4AWu8HENIsEZcKaGI2lcEF/RsiYRdRQzZUYL8Jg5OMIjTGLxBk0E9koAG1YYIhkvWgh9KWf9QNPj47YPi1PAjRkkfUCXw9ROhKRQC2R3Qbenm9yIqKBOiK7CgDb9/RERCdTQWSD4NHfm/OsiQQZ1BGT02Dp8QknSyJJBjXE1jL47PNctxWRKINqYvQ5GHs99mxBJMugkhiPg4nfg92VRMIMHilKfzwJpp6PrlcQSTOYxg4xngYzv8AKIjmwRJwFC99CSdS+f3xrj94P0b8vnQ/qX3nwwYNwN4vejfo1mTTOfRMX3u9DM9B/Fme++9IqoO8syr7Ubz2sBnrOoqyHXsc0+kUn31nclH45pvE5LrXJoOeGKselc39zC/3Cb33E1tzj/NA2g16Jcn7obY5vdw9uwld3I+f4vtZpXDLoMYvszNdamyvQVxbZraf1Uj2wq51peMniz56fNW89cPReKN9A4iuL4tXLvoXxrBqvlSg6PvaeTBmUhjqJnI887B9W7g/WSOS/PewBGzK4WXSqj8jP6ffxDYcQ7t+uvjYi/0V+FiOy2wA1EEmLhhhKIWm5sMpgBZEyi+KV+EyUAbi7bFhPFgXxuTZ9Ex3dl666jizKrpT0bKLjSacaiPyF9HxpRaHfB1HcUp4RBhwE8k4U7eycN8m4zaLQ107kPKQ7q29dJuok8ueQ7HkLQy9q3l3yWjTEj5DqmRlDEzVlsIKIzqLoh0TPPTkUeiciMov8KAxpnl1zKvRORFwW02pI8vwhKoM+iWL4JkQ9Q4q4B/0S5fw+FyLqBbBM1EBc1Qr8s9zgMuGfKP4UhOBmGie6PXqHDFYQ/wKJolMUQpup9iSJUwbNxBHswMa6kSLfi7HzAr/CVbll0Ez8I6r/djnEzZYQ2EzLb3zNAnQQSE+EJHE16i4KQUU/1ryzHpBBI/E7RPhtRwhaj0offqPKoIn4C/B7YtO8UO+JUr8JC5hBA/GP+w+mKzQ7QsgUSplDxzJhQwTkcF0Mi0JIX6N6kb1zmbAgAu5D8faXUe/cU/SlqAzqiMK99LwohJAFqVI9RGZQTfzhXg9FPpbEvfty95MSiE5GTwQcQuXf87+OfH9pvDXwRjdRJfFfwF1YuHuQ76CVk6f8x/o0wJR4k/9fA8wt+N9QLYS8R1hm8SEzvn5z7xD0xL/ZkL79D+RHiynEvwtadjc/P54/n7+n82VG/uH5+R70o/w81AmhW4nHgtMfSecc+qNbKaR5J3twTKxDxWZiqBSC14abRBR9gxC+l9gcYmE4oxLCv2/RFOJ6DVErRHyjpCHE1W6MSYj4zkwjiPz9LqgkBJX95hBF9beCMN972j/xbXXGJMR8s2vfxFI3oxZizmbsmVgYsZuEqG/n7ZVYnBYahajvH+6RqGqjPr5huT+iUG6iePgO6b6I4kVp8fEt2f0Q8zVgKyHue8D7IHKueTmTn28674GovgkNQuTx79qJ4h8dxNe31Wsmbi/NWAqRX66ulcjvNZ8SMQs7uK891kjU9jIVwrCP+xpebUQuXg0KkxD7KEZdRG03Wi3Enjyth1hat3ARYj8tWwexAlglxD4V5Z8oflUIqoThZbOJ+kpvLWw2sRpoIWxyQ61sonbC5vaoVZ2MtTC8bWTp5/mZGbRQln7UaX4vRMOJVIAw7OO+2eyByLlpqOYuDDsnzZpM8fuO5ZXbCrGfUCUmCv18EC6UhbEpazfcogxChLK/acYKHOfal/ghhWF30oR1VHFvmO8ihekBxn0v+HPNwi+VMHwCfM2dksi5XRWEC8NwiUgjlsjFd/2SE5kw7MX72iV262LgwvTRhX0cZ+CivIXtSxj2T8BNFUrk4r3rHYgRyhlVUu/pKc5tZkqUwnSPsb5jfrKB2g5DCYVh+wFodCVyca5/T69PobwdL2BGJyIXHzTPj9UgBBvtiVgfWhiGr3MG6FftiFxWeKSPQCjH4wPmXh8tiFzw/1xfvuhHKOPL2DmRFUSZvt9WC02VQSOUN+Qdc7wjTUSZvhfLZZjKoBLKGD5IpEMmNUSZPfGsOJ8GDUJhGI6GstuxvycVxJR3/gdc3VVBKpQx6p2eWKfyuKT7+DIk5YX0wjS6X+YzmUuLRZ3jou7o+x/E0EUbPoRpdId311LJksiYzuP0wRghxL8vNwSFQRm+hKto966Wk4CtIpHWONPKf0ZJkv3r49/Pv4ZU3aYyvAqzGLV7N2eD0+Wn8WQ6WwSL2XQy/rQ8HZzd9NrOaxLu8X/l7yOTNB7SCAAAAABJRU5ErkJggg=="
                  alt="delete btn"
                  onClick={delComHandler}
                  className="deleteBtn"
                  id={comment.id}
                />
              ) : null}
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
              id="commentInput"
              type="text"
              placeholder="Write a comment..."
              name="text"
              value={setNewComment.text}
              onChange={changeHandler}
            />
          </Form>
        </div>
      </div>
    </div>
  );
};

export default DetiledProd;
