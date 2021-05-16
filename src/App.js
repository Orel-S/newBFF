import './App.css';
import React, {useState} from 'react';
import SignInSide from "./SignIn";
import SignUp from "./SignUp";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import PassReset from "./PassReset";
import withAuth from "./withAuth";
import Profile from "./Profile";
import Chat from "./Chat";

function App() {
    const [imgFile, setImgFile] = useState(null);
    const onSelectImage = (e) => {
        e.preventDefault();

        const reader = new FileReader();
        const file = e.target.files[0];
        console.log('onSelectImage',{file});
        reader.onloadend = () => {
            setImgFile({
                file: file,
                url: reader.result
            });
        }

        reader.readAsDataURL(file)
    }
  return (
/*      <div>
          {imgFile && imgFile.url &&
          <img style={{width: 200, height: 150}} src={imgFile.url} alt="" />}
          <input type='file' text="select file" onChange={onSelectImage} />
      </div>*/
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
