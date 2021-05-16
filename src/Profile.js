import React from 'react';
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
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChatIcon from '@material-ui/icons/Chat';
import Button from '@material-ui/core/Button';
import Chat from './Chat';



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
    const classes = useStyles();
    console.log(`My name:${props.data.user.firstname}`);
    const {firstname, lastname, bio, img} = props.data.user;

    return (
        <>
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            R
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon/>
                        </IconButton>
                    }
                    title={`${firstname} ${lastname}`}
                    subheader="September 14, 2016"
                />
                <CardMedia
                    component="img"
                    className={classes.media}
                    src={`data:image/png;base64,${img.img.data.toString('base64')}`}
                    title="Paella dish"
                />
                <CardContent>
                    <Typography variant="h4" color="textSecondary" component="p">
                        {bio}
                    </Typography>
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
        </>
    );
}