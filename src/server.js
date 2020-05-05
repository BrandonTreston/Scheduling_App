require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const utils = require('./Utils/utils');

const PORT = 3001 || process.env.PORT;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'Brandon',
  password: 'R8$P$Nk^7e2c',
  database: 'project_db',
});

connection.connect();

app.listen(PORT, () => {
  console.log('Backend server running on port 3001');
});

app.post('/users/isAdmin', (req, res) => {
  const user = req.body.user;
  let admin;
  connection.query(
    'SELECT isAdmin from project_db.empuser WHERE name = "' + user + '";',
    (err, results) => {
      if (err) {
        throw err;
      } else {
        admin = results;
        res.send({ admin });
      }
    }
  );
});

app.post('/users/schedule', (req, res) => {
  const user = req.body.user;
  let data;
  connection.query(
    'SELECT * FROM  project_db.empschedule WHERE employee_id IN' +
      '(SELECT employee_id FROM project_db.empuser WHERE name = "' +
      user +
      '" );',
    (err, results) => {
      if (err) {
        throw err;
      } else {
        data = results;
        res.send({ data });
      }
    }
  );
});

let userData;
connection.query('SELECT * FROM project_db.empuser;', (err, results) => {
  if (err) {
    throw err;
  } else {
    userData = results;
  }
});

app.post('/users/signin', function (req, res) {
  const user = req.body.username;
  const pwd = req.body.password;
  let found = false;
  let userIndex;

  for (let i = 0; i <= userData.length; i++) {
    try {
      if (user === userData[i].user_name && pwd === userData[i].user_password) {
        const token = utils.generateToken(userData[i]);
        const userObj = utils.getCleanUser(userData[i]);
        found = true;
        userIndex = i;
        return res.json({ user: userObj, token });
      }
    } catch (error) {
      if (found === false) {
        return res.status(401).json({
          error: true,
          message: 'Username or Password is Wrong.',
        });
      }
    }
  }
});

app.post('/users/register', function (req, res) {
  const user = req.body.username;
  const pwd = req.body.password;
  const userID = userData.length + 1;
  const fname = req.body.fname;
  const lname = req.body.lname;
  const name = fname + ' ' + lname;
  const address = req.body.address;
  const city = req.body.city;
  const state = req.body.state;
  const zip = req.body.zip;
  const email = req.body.email;
  const phone = req.body.phone;

  let found = false;
  for (let i = 0; i <= userData.length; i++) {
    try {
      if (user === userData[i].user_name) {
        found = true;
      }
    } catch (error) {
      if (found === true) {
        return res.status(401).json({
          error: true,
          message: 'Username has been taken.',
        });
      }
    }
  }
  connection.query(
    'INSERT INTO project_db.employee VALUES (' +
      userID +
      ', "' +
      fname +
      '" , "' +
      lname +
      '" , "' +
      address +
      '" , "' +
      city +
      '" , "' +
      state +
      '" , "' +
      zip +
      '" , "' +
      email +
      '" , "' +
      phone +
      '");'
  ),
    function (err, results) {
      if (err) {
        return res.status(401).json({
          error: true,
          message: 'Username has been taken.',
        });
      }
    };
  connection.query(
    'INSERT INTO project_db.EmpUser VALUES (' +
      userID +
      ', "' +
      user +
      '" , "' +
      name +
      '" , "' +
      pwd +
      '", false);'
  ),
    function (err, results) {
      if (err) {
        throw err;
      }
    };
  return res.status(401).json({
    error: false,
    message: 'User created, return to login.',
  });
});

app.get('/verifyToken', function (req, res) {
  var token = req.body.token || req.query.token;
  if (!token) {
    return res.status(400).json({
      error: true,
      message: 'Token is required.',
    });
  }
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err)
      return res.status(401).json({
        error: true,
        message: 'Invalid token.',
      });

    if (user.userId !== userData[i].userId) {
      return res.status(401).json({
        error: true,
        message: 'Invalid user.',
      });
    }
    var userObj = utils.getCleanUser(userData[i]);
    return res.json({ user: userObj, token });
  });
});

app.use(function (req, res, next) {
  var token = req.headers['authorization'];
  if (!token) return next();

  token = token.replace('Bearer ', '');
  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) {
      return res.status(401).json({
        error: true,
        message: 'Invalid user.',
      });
    } else {
      req.user = user;
      next();
    }
  });
});
