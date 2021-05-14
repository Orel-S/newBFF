import './App.css';
import React from 'react';
import SignInSide from "./SignIn";
import SignUp from "./SignUp";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import PassReset from "./PassReset";
import Dashboard from "./Dashboard";
import withAuth from "./withAuth";
require('dotenv').config()

function App() {

  return (
<Router>
      <Switch>
        <Route exact path="/" component={withAuth(Dashboard)} />
        <Route path="/passreset" component={PassReset} />
        <Route path="/dashboard" component={withAuth(Dashboard)} />
        <Route path="/signin" component={SignInSide} />
        <Route path="/signup" component={SignUp} />
      </Switch>
</Router>
  );
}

export default App;
