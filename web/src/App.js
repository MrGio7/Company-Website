import React from "react";

import {
  Navigation,
  Home,
  Product,
  About,
  AddProduct,
  DetiledProd,
  EditProduct
} from "./Components";
import Login from "./Components/Users/Login";
import Register from "./Components/Users/Regiser.js";

import { Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Route path="/" component={Navigation} />
      <Route exact path="/" component={Home} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/product" component={Product} />
      <Route exact path="/about" component={About} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/AddProduct" component={AddProduct} />
      <Route exact path="/product/:id" component={DetiledProd} />
      <Route exact path="/product/edit/:id" component={EditProduct} />
    </div>
  );
}

export default App;
