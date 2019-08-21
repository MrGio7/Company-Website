import React from "react";

import { Navigation, Home, Product, About, AddProduct } from "./Components";
import Login from "./Components/Users/Login";
import Register from "./Components/Users/Regiser.js";

import { Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Navigation />
      <Route exact path="/home" component={Home} />
      <Route exact path="/product" component={Product} />
      <Route exact path="/about" component={About} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/AddProduct" component={AddProduct} />
    </div>
  );
}

export default App;
