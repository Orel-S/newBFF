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



const useStyles = makeStyles((theme) => ({
    root: {

    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));



export default function Profile(props) {
    const [editable, setEditable] = useState(false);
    const [newBio, setNewBio] = useState("");
    const classes = useStyles();
    //console.log(`My name:${props.data.user.firstname}`);
    const userData = JSON.parse(localStorage.getItem('user'));
    /*const userData = localStorage.getItem('user');*/
    console.log(userData)
    console.log(userData.bio);
    console.log(userData.firstname);
    console.log(userData.lastname);
    console.log(userData.email);
    const {firstname, lastname, bio, img, email} = userData;
    const iconLetter = firstname.charAt(0)
    const isValidData = () =>{
        return  firstname && lastname && bio && email;
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
                                            //localStorage.removeItem('user');
                                            fetch('/api/logout', {
                                                method: 'get',
                                                credentials: 'include'
                                            }).then(function(response) {
                                                if (response.redirected) {
                                                    return window.location.replace(response.url);
                                                }

                                            }).catch(function(err) {
                                                console.log(err);
                                            });
                                        }}>
                                <ExitToApp/>
                            </IconButton>
                        }
                        title={`${firstname} ${lastname}`}
                    />
                    <CardMedia
                        component="img"
                        className={classes.media}
                        src={`data:image/png;base64,${img}`}
                        //src={`data:image/png;base64,${img.img.data.toString('base64')}`}
                    />
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
                            console.log();
                            fetch('/api/updatebio', {
                                method: 'POST',
                                body: JSON.stringify({email, bio: newBio}),
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            }).then(res => {
                                if (res) {
                                    console.log({res});
                                        localStorage.setItem('user', JSON.stringify(res))
                                    }
                                    else {
                                        const error = new Error(res.error);
                                        throw error;
                                    }
                                })
                                .catch(err => {
                                    console.log(err);
                                    alert('Error updating please try again');
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