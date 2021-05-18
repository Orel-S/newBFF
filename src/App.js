import './styles/App.css';
import React from 'react';
import SignInSide from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import PassReset from "./pages/PassReset";
import withAuth from "./components/withAuth";
import Profile from "./pages/Profile";
import Chat from "./components/Chat";

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
