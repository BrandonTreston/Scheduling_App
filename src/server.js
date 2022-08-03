require('dotenv').config();
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const utils = require('./Utils/utils');
const nodemailer = require('nodemailer');
const { isEmpty } = require('lodash');

const PORT = 3002 || process.env.PORT;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'yH5**s45ih0yDn83', //DEV
  // password: '69Wolftheeth', //PROD
  database: 'brandon',
});

connection.connect();

app.listen(PORT, () => {
  console.log('Backend server running on port 3002');
});

var transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '7d340559c01458',
    pass: '1c455e8b3afac6',
  },
});

function sendEmail(to) {
  const message = {
    from: 'BARD.Scheduler@brandontreston.com',
    to: to,
    subject: 'New Schedule!',
    text: 'Your schedule has been updated!',
  };
  transport.sendMail(message, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
}

let userData;

app.post('/users/isAdmin', (req, res) => {
  const user = req.body.user;
  let admin;
  connection.query(
    'SELECT isAdmin from brandon.empuser WHERE name = "' + user + '";',
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
    'SELECT * FROM  brandon.empschedule WHERE employee_id IN' +
      '(SELECT employee_id FROM brandon.empuser WHERE name = "' +
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

app.post('/users/getUserSchedule', (req, res) => {
  const user = req.body.employee;
  let data;
  connection.query(
    'SELECT * FROM  brandon.empschedule WHERE employee_id IN' +
      '(SELECT employee_id FROM brandon.empuser WHERE name = "' +
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

app.post('/users/deleteEvent', (req, res) => {
  const id = req.body.id;
  const queryString =
    'SELECT email FROM brandon.employee WHERE employee_id IN' +
    '(SELECT employee_id FROM brandon.empschedule WHERE id = ' +
    id +
    ');';
  connection.query(queryString, (err, results) => {
    if (err) {
      throw err;
    } else {
      sendEmail(results[0].email);
    }
  });
  connection.query(
    'DELETE FROM brandon.empschedule WHERE id =' + id + ';',
    (err, results) => {
      if (err) {
        throw err;
      } else {
        res.send({ message: 'Deleted event Successfully!' });
      }
    }
  );
});

app.get('/users/listEmployees', (req, res) => {
  let data;
  connection.query('SELECT name FROM brandon.empuser', (err, results) => {
    if (err) {
      throw err;
    } else {
      data = results;
      res.send(data);
    }
  });
});

app.post('/users/submit', (req, res) => {
  const employee = req.body.employee;
  const start = req.body.start;
  const end = req.body.end;
  const title = req.body.title;
  let employeeID;

  const queryString =
    'SELECT email FROM brandon.employee WHERE employee_id IN' +
    '(SELECT employee_id FROM brandon.empuser WHERE name = "' +
    employee +
    '");';

  connection.query(queryString, (err, results) => {
    if (err) {
      throw err;
    } else {
      sendEmail(results[0].email);
    }
  });

  connection.query(
    'SELECT employee_id FROM brandon.empuser WHERE name = "' +
      employee +
      '";',
    (err, results) => {
      if (err) {
        throw err;
      } else {
        employeeID = results[0].employee_id;
        connection.query(
          'Insert into brandon.empschedule (employee_id, start, end, title) Values (' +
            employeeID +
            ', "' +
            start +
            '", "' +
            end +
            '", "' +
            title +
            '");',
          (err) => {
            if (err) {
              throw err;
            } else {
              res.send({
                message: 'Event added to ' + employee + "'s schedule",
              });
            }
          }
        );
      }
    }
  );
});

connection.query('SELECT * FROM brandon.empuser;', (err, results) => {
  if (err) {
    throw err;
  } else {
    userData = results;
  }
});

app.post('/users/signin', function (req, res) {
  const user = req.body.username;
  const pwd = req.body.password;
  const bcrypt = require('bcrypt');
  let found = false;

  try{
    var userObjects = Object.values(JSON.parse(JSON.stringify(userData)));
    var userObject = (userObjects.find(element => element.user_name === user));
    bcrypt.compare(pwd, userObject.user_password, function(err, hash){
      if(!err){
      const token = utils.generateToken(userObject);
      const userObj = utils.getCleanUser(userObject);
      found = true;
      return res.json({ user: userObj, token });
    }})
    
  }
  catch (err) {
    if (isEmpty(userObject)) {
      return res.status(401).json({
        err: true,
        message: 'Incorrect username or password.',
      });
    }
  }

});

app.post('/users/register', function (req, res) {
  const bcrypt = require('bcrypt');
  const saltRounds = 10;
  const user = req.body.username;
  const pwd = req.body.password;
  const fname = req.body.fname;
  const lname = req.body.lname;
  const name = fname + ' ' + lname;
  const address = req.body.address;
  const city = req.body.city;
  const state = req.body.state;
  const zip = req.body.zip;
  const email = req.body.email;
  const phone = req.body.phone;
  
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

    if (user.userId !== userData.userId) {
      return res.status(401).json({
        error: true,
        message: 'Invalid user.',
      });
    }
    var userObj = utils.getCleanUser(userData);
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
