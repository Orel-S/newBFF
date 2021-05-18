import React, {useState} from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Chat from '../components/Chat';
import {TextField} from "@material-ui/core";
import {ExitToApp} from "@material-ui/icons";
import { useInnerStyles } from "../styles/styles";
import { logout, update } from "../api/api";
import { arrayBufferToBase64, removeUser } from "../utils/util";


export default function Profile(props) {
    const [editable, setEditable] = useState(false);
    const [newBio, setNewBio] = useState("");
    const classes = useInnerStyles();
    const userData = JSON.parse(localStorage.getItem('user'));
    const {firstname, lastname, bio, img, email} = userData;
    const imageData = arrayBufferToBase64(img.data.data);
    const iconLetter = firstname.charAt(0)

    const isValidData = () =>{
        return  firstname && lastname && email;
    }

    const onLogout = () =>{
        removeUser();
        logout()
            .then( response => {
                return window.location.replace(response.url);
            });
    }

    const onSave = () => {

        update(email, {key: "bio", value: newBio})
            .then(res => {
                console.log(res);
            });
        setEditable(false);
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
                            <IconButton aria-label="settings" onClick={onLogout}>
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
                        { editable && <Button variant="contained"  color="secondary" onClick={onSave}>
                            Save
                        </Button>}
                    </CardContent>
                </Card>
                <Chat/>
            </>}
        </>
    );
}