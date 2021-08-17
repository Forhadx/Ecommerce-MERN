import React from "react";

import Sidebar from "./components/sidebar/sidebar";
import Products from "./Pages/Products/Products";
import Category from "./Pages/Category/Category";
import Orders from "./Pages/Orders/Orders";
import RegularProducts from "./Pages/RegularProducts/RegularProducts";
import AddProduct from "./Pages/AddProduct/AddProducts";

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
        <Route path="/regular+products" component={RegularProducts} />
        <Route path="/add+product" component={AddProduct} />
      </main>
    </div>
  );
};

export default App;
