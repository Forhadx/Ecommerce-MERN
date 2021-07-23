import React from "react";
import { Route, Switch } from "react-router-dom";

import Navigationbar from "./components/Navigation/Navigationbar";
import Sidebar from "./components/Sidebar/Sidebar";
import MainCat from './Pages/mainCat';
import SubCat from './Pages/SubCat';

import "./App.scss";

const App = () => {
  return (
    <div className="App">
      <header className="header">
        <Navigationbar />
      </header>
      <aside className="sidebar">
        <Sidebar />
      </aside>
      <main className="main">
        <Switch>
          <Route path="/m/:name" component={MainCat} />
          <Route path="/s/:name" component={SubCat} />
        </Switch>
      </main>
      <aside className="cartbar">cartbar</aside>
    </div>
  );
};

export default App;
