"use strict";

require('dotenv').config();

var express = require('express');

var check = require('express-validator').check;

var mysql = require('mysql');

var cors = require('cors');

var bodyParser = require('body-parser');

var jwt = require('jsonwebtoken');

var utils = require('./Utils/utils');

var nodemailer = require('nodemailer');

var _require = require('lodash'),
    isEmpty = _require.isEmpty;

var PORT = 3001 || process.env.PORT;
var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'yH5**s45ih0yDn83',
  //Development PW
  // password: '69Wolftheeth', //Production PW
  database: 'brandon'
});
connection.connect();
app.listen(PORT, function () {
  console.log('Backend server running on port 3001');
});
var transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '7d340559c01458',
    pass: '1c455e8b3afac6'
  }
});

function sendEmail(to) {
  var message = {
    from: 'BARD.Scheduler@brandontreston.com',
    to: to,
    subject: 'New Schedule!',
    text: 'Your schedule has been updated!'
  };
  transport.sendMail(message, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
}

var userData;
connection.query('SELECT * FROM brandon.empuser;', function (err, results) {
  if (err) {
    throw err;
  } else {
    userData = results;
    console.log(userData);
  }
});
app.post('/users/isAdmin', [check('user').isLength({
  min: 3
}).trim().escape()], function (req, res) {
  var user = req.body.user;
  var admin;
  connection.query('SELECT isAdmin from brandon.empuser WHERE name = "' + user + '";', function (err, results) {
    if (err) {
      throw err;
    } else {
      admin = results;
      res.send({
        admin: admin
      });
    }
  });
});
app.post('/users/schedule', [check('user').isLength({
  min: 3
}).trim().escape()], function (req, res) {
  var user = req.body.user;
  var data;
  connection.query('SELECT * FROM  brandon.empschedule WHERE employee_id IN' + '(SELECT employee_id FROM brandon.empuser WHERE name = "' + user + '" );', function (err, results) {
    if (err) {
      throw err;
    } else {
      data = results;
      res.send({
        data: data
      });
    }
  });
});
app.post('/users/getUserSchedule', [check('user').isLength({
  min: 3
}).trim().escape()], function (req, res) {
  var user = req.body.employee;
  var data;
  connection.query('SELECT * FROM  brandon.empschedule WHERE employee_id IN' + '(SELECT employee_id FROM brandon.empuser WHERE name = "' + user + '" );', function (err, results) {
    if (err) {
      throw err;
    } else {
      data = results;
      res.send({
        data: data
      });
    }
  });
});
app.post('/users/deleteEvent', [check('id').isNumeric().trim().escape()], function (req, res) {
  var id = req.body.id;
  var queryString = 'SELECT email FROM brandon.employee WHERE employee_id IN' + '(SELECT employee_id FROM brandon.empschedule WHERE id = ' + id + ');';
  connection.query(queryString, function (err, results) {
    if (err) {
      throw err;
    } else {
      sendEmail(results[0].email);
    }
  });
  connection.query('DELETE FROM brandon.empschedule WHERE id =' + id + ';', function (err, results) {
    if (err) {
      throw err;
    } else {
      res.send({
        message: 'Deleted event Successfully!'
      });
    }
  });
});
app.get('/users/listEmployees', function (req, res) {
  var data;
  connection.query('SELECT name FROM brandon.empuser', function (err, results) {
    if (err) {
      throw err;
    } else {
      data = results;
      res.send(data);
    }
  });
});
app.post('/users/submit', [check('employee').isLength({
  min: 3
}).trim().escape(), check('start').isLength({
  min: 3
}).trim().escape(), check('end').isLength({
  min: 3
}).trim().escape(), check('title').isLength({
  min: 3
}).trim().escape()], function (req, res) {
  var employee = req.body.employee;
  var start = req.body.start;
  var end = req.body.end;
  var title = req.body.title;
  var employeeID;
  var queryString = 'SELECT email FROM brandon.employee WHERE employee_id IN' + '(SELECT employee_id FROM brandon.empuser WHERE name = "' + employee + '");';
  connection.query(queryString, function (err, results) {
    if (err) {
      throw err;
    } else {
      sendEmail(results[0].email);
    }
  });
  connection.query('SELECT employee_id FROM brandon.empuser WHERE name = "' + employee + '";', function (err, results) {
    if (err) {
      throw err;
    } else {
      employeeID = results[0].employee_id;
      connection.query('Insert into brandon.empschedule (employee_id, start, end, title) Values (' + employeeID + ', "' + start + '", "' + end + '", "' + title + '");', function (err) {
        if (err) {
          throw err;
        } else {
          res.send({
            message: 'Event added to ' + employee + "'s schedule"
          });
        }
      });
    }
  });
});
connection.query('SELECT * FROM brandon.empuser;', function (err, results) {
  if (err) {
    throw err;
  } else {
    userData = results;
  }
});
app.post('/users/signin', [check('user').isLength({
  min: 3
}).trim().escape(), check('pwd').isLength({
  min: 3
}).trim().escape()], function (req, res) {
  var user = req.body.username;
  var pwd = req.body.password;

  var bcrypt = require('bcrypt');

  try {
    var userObjects = Object.values(JSON.parse(JSON.stringify(userData)));
    var userObject = userObjects.find(function (element) {
      return element.user_name === user;
    });
    bcrypt.compare(pwd, userObject.user_password, function (err) {
      if (!err) {
        var token = utils.generateToken(userObject);
        var userObj = utils.getCleanUser(userObject);
        return res.json({
          user: userObj,
          token: token
        });
      }
    });
  } catch (err) {
    if (isEmpty(userObject)) {
      return res.status(401).json({
        err: true,
        message: 'Incorrect username or password.'
      });
    }
  }
});
app.post('/users/register', [check('user').isLength({
  min: 3
}).trim().escape(), check('pwd').isLength({
  min: 3
}).trim().escape(), check('fname').isLength({
  min: 3
}).trim().escape(), check('lname').isLength({
  min: 3
}).trim().escape(), check('name').isLength({
  min: 3
}).trim().escape(), check('address').isLength({
  min: 3
}).trim().escape(), check('city').isLength({
  min: 3
}).trim().escape(), check('user').isLength({
  min: 3
}).trim().escape(), check('zip').isLength({
  min: 5
}).isNumeric().trim().escape(), check('state').isLength({
  min: 2,
  max: 2
}).trim().escape(), check('email').isEmail().normalizeEmail(), check('phone').isNumeric().isLength({
  min: 10
}).trim().escape()], function (req, res) {
  var bcrypt = require('bcrypt');

  var saltRounds = 10;
  var user = req.body.username;
  var pwd = req.body.password;
  var fname = req.body.fname;
  var lname = req.body.lname;
  var name = fname + ' ' + lname;
  var address = req.body.address;
  var city = req.body.city;
  var state = req.body.state;
  var zip = req.body.zip;
  var email = req.body.email;
  var phone = req.body.phone;
  var userId = userData.length + 1;
  var hashedPwd = bcrypt.hash(pwd, saltRounds, function (err, hashedPwd) {
    var userObjects = Object.values(JSON.parse(JSON.stringify(userData)));
    var userObject = userObjects.find(function (element) {
      return element.user_name === user;
    });

    try {
      if (user === userObject.user_name) {
        found = true;
      }
    } catch (error) {
      if (found === true) {
        return res.status(401).json({
          error: true,
          message: 'Username has been taken.'
        });
      }
    }

    if (userObject === undefined) {
      connection.query('' + 'INSERT INTO brandon.EmpUser (employee_id, user_name, name, user_password, isAdmin) VALUES (' + userId + ', "' + user + '" , "' + name + '" , "' + hashedPwd + '", true);'), function (err, results) {
        if (err) {
          return res.status(401).json({
            error: true,
            message: 'Username has been taken.'
          });
        }
      };
    }
  });
  connection.query('INSERT INTO brandon.employee (employee_id, employee_fname, employee_lname, address, city, zip, state, email, phone ) VALUES (' + userId + ', "' + fname + '" , "' + lname + '" , "' + address + '" , "' + city + '" , "' + state + '" , "' + zip + '" , "' + email + '" , "' + phone + '");'), function (err, results) {
    if (err) {
      return res.status(401).json({
        error: true,
        message: 'Username has been taken.'
      });
    }
  };
  connection.query('SELECT * FROM brandon.empuser;', function (err, results) {
    if (err) {
      throw err;
    } else {
      userData = results; //update the user list on the backend server
    }
  });
  return res.status(401).json({
    error: false,
    message: 'User created, return to login.'
  });
});
app.get('/verifyToken', [check('token').trim().escape()], function (req, res) {
  var token = req.body.token || req.query.token;

  if (!token) {
    return res.status(400).json({
      error: true,
      message: 'Token is required.'
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
    if (err) return res.status(401).json({
      error: true,
      message: 'Invalid token.'
    });

    if (user.userId !== userData.userId) {
      return res.status(401).json({
        error: true,
        message: 'Invalid user.'
      });
    }

    var userObj = utils.getCleanUser(userData);
    return res.json({
      user: userObj,
      token: token
    });
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
        message: 'Invalid user.'
      });
    } else {
      req.user = user;
      next();
    }
  });
});