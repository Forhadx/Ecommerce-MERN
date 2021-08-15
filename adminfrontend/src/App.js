import React from "react";

import Sidebar from "./components/sidebar/sidebar";
import Products from "./Pages/Products/Products";
import Category from "./Pages/Category/Category";
import Orders from "./Pages/Orders/Orders";

import "./App.scss";
import { Route } from "react-router";

const App = () => {
  return (
    <div className="App">
      <header className="header"></header>
      <aside className="sidebar">
        <Sidebar />
      </aside>
      <main className="main">
        <Route path="/products" component={Products} />
        <Route path="/category" component={Category} />
        <Route path="/orders" component={Orders} />
      </main>
    </div>
  );
};

export default App;
