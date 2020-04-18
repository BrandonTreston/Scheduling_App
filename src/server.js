const express = require('express');
const mysql = require('mysql');

const PORT = 3000; //set port or let process set port

const app = express(); //initialize express

app.listen(PORT, () => {
    console.log('App running on port 3000');
});

const connection = mysql.createConnection({
    hots: 'localhost',
    user: 'me',
    password: 'password',
    database: 'project_db'
});

connection.end();