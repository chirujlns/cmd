import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
// import DrawerRouterContainer from "./layout/DrawerRouterContainer";
import Dashboard from "./Dashboard";
import Home from "./Home";
import Login from "./Login.js";
import "./styles/_App.scss";

export default function App() {
  return (
    <BrowserRouter>
      {/* <DrawerRouterContainer> */}
        <div className="page-container">
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route exact path="/Dashboard">
              <Dashboard />
            </Route>
            <Route exact path="/Home">
              <Home />
            </Route>
          </Switch>
        </div>
      {/* </DrawerRouterContainer> */}
    </BrowserRouter>
  );
}
