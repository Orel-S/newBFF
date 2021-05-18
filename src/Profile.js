import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ChatIcon from '@material-ui/icons/Chat';
import Button from '@material-ui/core/Button';
import Chat from './Chat';
import {TextField} from "@material-ui/core";
import {ExitToApp} from "@material-ui/icons";
import { useInnerStyles } from "./styles/styles";
import { logout, update } from "./api/api";
import { arrayBufferToBase64 } from "./utils/util";


export default function Profile(props) {
    const [editable, setEditable] = useState(false);
    const [newBio, setNewBio] = useState("");
    const classes = useInnerStyles();
    const userData = JSON.parse(localStorage.getItem('user'));
    /*console.log(userData)
    console.log(userData.bio);
    console.log(userData.firstname);
    console.log(userData.lastname);
    console.log(userData.email);*/
    console.log(userData.img);

    const {firstname, lastname, bio, img, email} = userData;
    console.log(img);
    /*const imageData = (JSON.stringify(img.data.data).toString('base64'));*/
    const imageData = arrayBufferToBase64(img.data.data);
    console.log(imageData);
    const iconLetter = firstname.charAt(0)
    const isValidData = () =>{
        return  firstname && lastname && email;
    }

    return (
        <>
            { !isValidData() && <div> Loading... </div> }
            { isValidData() && <>
                <Card className={classes.root}>
                    <CardHeader
                        avatar={
                            <Avatar aria-label="recipe" className={classes.avatar}>
                                {iconLetter}
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings"
                                        onClick={() => {
                                            localStorage.removeItem('user');
                                            logout()
                                            .then( response => {
                                                return window.location.replace(response.url);
                                            });
                                        }}>
                                <ExitToApp/>
                            </IconButton>
                        }
                        title={`${firstname} ${lastname}`}
                    />

                    {<img src={imageData} className={classes.media} ></img>}
                    <CardContent>

                        { !editable && <Typography variant="h4" color="textSecondary" component="p">
                            {bio}
                        </Typography>}
                        { editable && <TextField variant="standard" onChange={(e) => setNewBio(e.target.value)} color="secondary" defaultValue={bio}>

                        </TextField>}
                        { !editable && <Button variant="contained"  color="secondary" onClick={() => { setEditable(true) }}>
                            Edit
                        </Button>}
                        { editable && <Button variant="contained"  color="secondary" onClick={() => {

                            console.log("Updating bio to the following value:", newBio)
                            update(email, newBio, null, true)
                                .then(res => {
                                    console.log(res);
                                });
                            setEditable(false);
                        }}>
                            Save
                        </Button>}
                    </CardContent>
                    {/*<CardActions disableSpacing>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            startIcon={<ChatIcon />}
                            href="/Chat"
                        >
                            Chat
                        </Button>
                    </CardActions>*/}
                </Card>
                <Chat/>
            </>}
        </>
    );
}