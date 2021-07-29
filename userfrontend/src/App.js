import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";

import Navigationbar from "./components/Navigation/Navigationbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Cartbar from "./components/Cartbar/Cartbar";

import MainCategories from "./Pages/MainCategories/MainCategories";
import SubCategies from "./Pages/SubCategories/SubCategories";
import RegularItems from "./Pages/RegularItems/RegularItems";

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
          <Route path="/Regular+items" component={RegularItems} />
        </Switch>
      </main>
      <aside className={className("cartbar", { open: isCartOpen })}>
        <Cartbar />
      </aside>
    </div>
  );
};

export default App;
