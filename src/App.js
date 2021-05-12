import './App.css';
import React from 'react';
import SignInSide from "./SignIn";
import SignUp from "./SignUp";
import SignUp2 from "./SignUp2";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import PassReset from "./PassReset";
import Dashboard from "./Dashboard";


function App() {

  return (
<Router>
      <Switch>
        <Route exact path="/" component={SignInSide} />
        <Route path="/passreset" component={PassReset} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/signin" component={SignInSide} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signup2" component={SignUp2} />
      </Switch>
</Router>
  );
}

export default App;
