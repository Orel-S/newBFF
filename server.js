const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('./models/User');
const withAuth = require('./middleware');
require('dotenv').config({path: './.env'});
const app = express();
const fs  = require ('fs');
const secret = process.env.SECRET;
const mongo_uri = process.env.MONGO_URI;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

mongoose.connect(mongo_uri, { useNewUrlParser: true, useUnifiedTopology: true }, function(err) {
    if (err) {
        throw err;
    } else {
        console.log(`Successfully connected to ${mongo_uri}`);
    }
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/api/profile', (req, res) => {
    const { email } = req.body;
    User.findOne({ 'email': email}, 'email bio img firstname lastname', null, (err, user) => {
        if (err) {
            console.log(err);
        }
        res.json(user);
    })
});

app.post('/api/update', (req, res) => {
    const { email, bio } = req.body;
    User.findOneAndUpdate({ 'email': email}, {bio: bio}, {new: true},(err, user) => {
        if (err) {
            console.log(err);
        }
        res.json(user);
    })
});

app.post('/api/register', function(req, res) {
    const { email, password, bio, img, firstname, lastname } = req.body;
    const data =  fs.readFileSync(path.join(__dirname + "\\src\\" + img));
    const imgData =  {
        data,
        contentType: 'image/png'
    }
    const user = new User({ email, password, bio, img: imgData, firstname, lastname });
    user.save(function(err) {
        if (err) {
            console.log(err);
            res.status(500).send("Error registering new user, please try again.");
        } else {
            res.status(200).send("Welcome to the club!");
        }
    });
});

app.post('/api/authenticate', function(req, res) {
    const { email, password } = req.body;
    User.findOne({ email }, function(err, user) {
        if (err) {
            console.error(err);
            res.status(500)
                .json({
                    error: 'Internal error, please try again'
                });
        } else if (!user) {
            res.status(401)
                .json({
                    error: 'Incorrect email or password'
                });
        } else {
            user.isCorrectPassword(password, function(err, same) {
                if (err) {
                    res.status(500)
                        .json({
                            error: 'Internal error, please try again'
                        });
                } else if (!same) {
                    res.status(401)
                        .json({
                            error: 'Incorrect email or password'
                        });
                } else {
                    // Issue token
                    const payload = { email };
                    const token = jwt.sign(payload, secret, {
                        expiresIn: '1h'
                    });
                    res.cookie('token', token, { httpOnly: true }).sendStatus(200);
                }
            });
        }
    });
});

app.get('/api/logout', function(req, res){
    res.clearCookie('token');
    return res.status(200).redirect('/signin');
});

app.get('/api/checkToken', withAuth, function(req, res) {
    res.sendStatus(200);
});

app.listen(process.env.PORT || 8080);

