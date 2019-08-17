import React from "react";

import { Navigation, Home, Product, About } from "./Components";

import { Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Navigation />
      <Route exact path="/" component={Home} />
      <Route exact path="/product" component={Product} />
      <Route exact path="/about" component={About} />
    </div>
  );
}

export default App;
