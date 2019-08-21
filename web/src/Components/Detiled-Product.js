import React, { useState, useEffect } from "react";
import axios from "axios";

const DetiledProd = () => {
  const [data, setData] = useState({ productList: [] });

  useEffect(id => {
    axios
      .get(`http://localhost:5000/api/product/${id}`, {
        headers: { token: localStorage.token }
      })
      .then(res => {
        setData(() => ({ productList: res.data }));
      })
      .catch(err => {
        console.log(err);
      });
  });

  return (
    <div className="detiled">
      <h1>Detiled Page</h1>
    </div>
  );
};

export default DetiledProd;
