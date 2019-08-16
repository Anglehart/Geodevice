const path = require('path')
const express = require('express')
const app = express()
const usersRouter = require('./userRouter');
var cors = require('cors')
app.use(cors())

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
    next();
});
app.use(express.json());
app.use('/user', usersRouter);
//app.use('/', express.static (path.join(__dirname, '../client/src')))

app.listen(3001)
