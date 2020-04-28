require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const utils = require('./Utils/utils')

const PORT = 5000 || process.env.PORT; //set port or let process set port
const app = express(); //initialize express

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'Brandon',
    password: 'R8$P$Nk^7e2c',
    database: 'project_db'
});

connection.connect();

app.listen(PORT, () => {
    console.log('Backend server running on port 5000');
});

app.get("/", (req, res) => {
    res.send(({ message: "Successfully established connection to backend." }));
  });

  const userData = {
    userId: "789789",
    password: "123456",
    name: "Brandon",
    username: "Brandon",
    isAdmin: true
  };

app.post('/users/signin', function (req, res) {
    const user = req.body.username;
    const pwd = req.body.password;
   
    if (!user || !pwd) {
      return res.status(400).json({
        error: true,
        message: "Username or Password required."
      });
    }
   
    if (user !== userData.username || pwd !== userData.password) {
      return res.status(401).json({
        error: true,
        message: "Username or Password is Wrong."
      });
    }
   
    const token = utils.generateToken(userData);
    const userObj = utils.getCleanUser(userData);
    return res.json({ user: userObj, token });
  });

  // verify the token and return it if it's valid
app.get('/verifyToken', function (req, res) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token;
    if (!token) {
      return res.status(400).json({
        error: true,
        message: "Token is required."
      });
    }
    // check token that was passed by decoding token using secret
    jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
      if (err) return res.status(401).json({
        error: true,
        message: "Invalid token."
      });
   
      // return 401 status if the userId does not match.
      if (user.userId !== userData.userId) {
        return res.status(401).json({
          error: true,
          message: "Invalid user."
        });
      }
      // get basic user details
      var userObj = utils.getCleanUser(userData);
      return res.json({ user: userObj, token });
    });
  });

  //middleware that checks if JWT token exists and verifies it if it does exist.
//In all future routes, this helps to know if the request is authenticated or not.
app.use(function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.headers['authorization'];
    if (!token) return next(); //if no token, continue
   
    token = token.replace('Bearer ', '');
    jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
      if (err) {
        return res.status(401).json({
          error: true,
          message: "Invalid user."
        });
      } else {
        req.user = user; //set the user to req so other routes can use it
        next();
      }
    });
  });
   
  // request handlers
  app.get('/', (req, res) => {
    if (!req.user) return res.status(401).json({ success: false, message: 'Invalid user to access it.' });
    res.send('Welcome to the Node.js Tutorial! - ' + req.user.name);
  });