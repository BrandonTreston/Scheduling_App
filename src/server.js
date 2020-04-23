const express = require('express');
const mysql = require('mysql');

const PORT = 3000; //set port

const app = express(); //initialize express

app.listen(PORT, () => {
    console.log('App running on port 3000');
});

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'Brandon',
    password: 'R8$P$Nk^7e2c',
    database: 'project_db'
});

connection.connect();

connection.end();