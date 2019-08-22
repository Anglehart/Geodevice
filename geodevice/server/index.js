const path = require('path')
const express = require('express')
const app = express()
const usersRouter = require('./userRouter');
const cors = require('cors')
app.use(cors())

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept, authorization');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
});

app.use(express.json());
app.use('/user', usersRouter);
//app.use('/', express.static (path.join(__dirname, '../client/src')))

app.listen(3001)
