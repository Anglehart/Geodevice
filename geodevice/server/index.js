const path = require('path')
const express = require('express')
const app = express()
const usersRouter = require('./userRouter');

app.use(express.json());
app.use('/user', usersRouter);
app.use('/', express.static (path.join(__dirname, '../client/src')))

app.listen(3000)
