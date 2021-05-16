import './App.css';
import React from 'react';
import SignInSide from "./SignIn";
import SignUp from "./SignUp";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import PassReset from "./PassReset";
import withAuth from "./withAuth";
import Profile from "./Profile";
import Chat from "./Chat";

function App() {

  return (
<Router>
      <Switch>
        <Route exact path="/" component={withAuth(Profile)} />
        <Route path="/chat" component={withAuth(Chat)} />
        <Route path="/passreset" component={PassReset} />
        <Route path="/signin" component={SignInSide} />
        <Route path="/signup" component={SignUp} />
      </Switch>
</Router>
  );
}

export default App;
