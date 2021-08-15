import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";

import Navigationbar from "./components/Navigation/Navigationbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Cartbar from "./components/Cartbar/Cartbar";

import MainCategories from "./Pages/MainCategories/MainCategories";
import SubCategies from "./Pages/SubCategories/SubCategories";
import DailyProducts from "./Pages/DailyProducts/DailyProducts";
import Signup from "./Pages/UserAuth/Signup/Signup";
import Login from "./Pages/UserAuth/Login/Login";
import Logout from "./Pages/UserAuth/Logout/Logout";
import Shipping from "./Pages/Shipping/Shipping";
import Payment from "./Pages/Shipping/Payment/payment";

import className from "classnames";
import "./App.scss";

const App = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartClickHandler = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="App">
      <header className="header">
        <Navigationbar cartClickHandler={cartClickHandler} />
      </header>
      <aside className="sidebar">
        <Sidebar />
      </aside>
      <main className="main">
        <Switch>
          <Route path="/m/:name" component={MainCategories} />
          <Route path="/s/:name" component={SubCategies} />
          <Route path="/Daily+Products" exact component={DailyProducts} />
          <Route path="/signup" exact component={Signup} />
          <Route path="/login" exact component={Login} />
          <Route path="/logout" exact component={Logout} />
          <Route path="/shipping" exact component={Shipping} />
          <Route path="/payment" exact component={Payment} />
        </Switch>
      </main>
      <aside className={className("cartbar", { open: isCartOpen })}>
        <Cartbar />
      </aside>
    </div>
  );
};

export default App;
