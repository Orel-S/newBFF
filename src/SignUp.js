import React, {useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import PreferenceAccordions from "./Accordions";
import Copyright from "./utils/copyright";
import { useOuterStyles } from "./utils/util";
import { register } from "./api/api";


export default function SignUp(props) {
    const classes = useOuterStyles();
    const [firstName, setFirstName] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [btnEnabled, setBtnEnabled] = useState(true);
    useEffect(() => {
        const enabled = isValid();
        if(enabled !== btnEnabled){
            setBtnEnabled(isValid());
        }
    },[firstName, lastName, email, confirmEmail, password, confirmPassword]);

    const onSubmit = (event) => {
        event.preventDefault();
        register(email, password, firstName, lastName)
            .then(res => {
                props.history && props.history.push('/signin');
            });

    }
    const isValid = (event) => {
        let result = [true, true, true];
        if (email !== confirmEmail){
            setEmailError("Emails do not match.");
            result[0] = false;
        }
        else if (email === ""){
            setEmailError("Email cannot be empty.")
            result[0] = false;
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
            setEmailError("Improper Email format.")
            result[0] = false;
        }
        else{
            setEmailError("");
        }
        if (password !== confirmPassword){
            setPasswordError("Passwords do not match.")
            result[1] = false;
        }
        else if (password === ""){
            setPasswordError("Password cannot be empty.")
            result[1] = false;
        }
        else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(password)){
            setPasswordError("Password must contain at least 8 characters, and include at least one letter, one number, and one special character.")
            result[1] = false;
        }

        else{
            setPasswordError("");
        }

        if(firstName === ""){
            setFirstNameError("First Name cannot be empty.")
            result[2] = false;
        }
        else{
            setFirstNameError("");
        }

        return result.every(e => e === true);

    }

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        You're just a few steps away from meeting your new BFF!
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextField
                            error = {firstNameError !== ""}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="given-name"
                            label="First Name"
                            name="given-name"
                            autoComplete="given-name"
                            onChange={e => setFirstName(e.target.value)}
                            helperText={firstNameError}
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="family-name"
                            label="Last Name"
                            name="family-name"
                            autoComplete="family-name"
                            onChange={e => setLastName(e.target.value)}
                        />
                        <TextField
                            error = {emailError !== ""}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            helperText={emailError}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="confirm-email"
                            label="Confirm Email Address"
                            name="confirm-email"
                            onChange={e => setConfirmEmail(e.target.value)}
                        />
                        <TextField
                            error = {passwordError !== ""}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            onChange={e => setPassword(e.target.value)}
                            autoComplete="current-password"
                            helperText={passwordError}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="confirm-password"
                            label="Confirm Password"
                            type="password"
                            id="confirm-password"
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                        <PreferenceAccordions/>
                        <Button disabled={!btnEnabled}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            id="submit"
                            className={classes.submit}
                            href={"/signin"}
                            onClick={onSubmit}
                        >
                            Create My Account
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="/SignIn" variant="body2">
                                    {"Already have an account?"}
                                </Link>
                            </Grid>
                        </Grid>
                        <Box mt={5}>
                            <Copyright />
                        </Box>
                    </form>
                </div>
            </Grid>
        </Grid>
    );
}
