import './App.css';
import React, {useState} from 'react';
import SignInSide from "./SignIn";
import SignUp from "./SignUp";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import PassReset from "./PassReset";
import withAuth from "./api/withAuth";
import Profile from "./Profile";
import Chat from "./Chat";
import { arrayBufferToBase64 } from "./utils/util";

const default_data = {user: {bio: "", img: null, firstname: "", lastname: ""}}
function App() {
    const [myData, setMyData] = useState(default_data);
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
    let isLoaded = false;
/*    const onSuccess = (data) =>{
        if (!data){
            return;
        }
        const newData = {...data};
        console.log({newData});
        /!*console.log({img: newData.user.img});*!/
        /!*newData.img = arrayBufferToBase64(data.img);*!/
        newData.img = Buffer.from(data.img.data).toString('base64')
        localStorage.setItem('user', JSON.stringify(newData))
        setMyData(newData);
        console.log(JSON.stringify(newData));
    }*/
  return (
/*      <div>
          {imgFile && imgFile.url &&
          <img style={{width: 200, height: 150}} src={imgFile.url} alt="" />}
          <input type='file' text="select file" onChange={onSelectImage} />
      </div>*/
<Router>
      <Switch>
          {/*<Route exact path="/" component={withAuth(Profile, {...myData})} />*/}
          <Route exact path="/" component={withAuth(Profile)} />
          <Route path="/chat" component={withAuth(Chat)} />
          <Route path="/passreset" component={PassReset} />
       {/* <Route path="/signin" component={()=><SignInSide onSuccess={onSuccess}/>} />*/}
{/*        <Route
            path="/signin"
            render={(props) => (
                <SignInSide {...props} onSuccess={onSuccess}/>
            )}
            />*/}
          <Route path="/signin" component={SignInSide} />
          <Route path="/signup" component={SignUp} />
      </Switch>
</Router>
  );
}

export default App;
