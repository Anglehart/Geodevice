const path = require('path')
const express = require('express')
const app = express()
const addUser = require('./addUser');
const showAllUsers = require('./showAllUsers');

app.use(express.json());
addUser (app)
showAllUsers (app)
app.use('/', express.static (path.join(__dirname, '../client')))

app.listen(3000)
