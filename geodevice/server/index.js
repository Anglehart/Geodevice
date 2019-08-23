const path = require('path')
const express = require('express')
const app = express()
const usersRouter = require('./userRouter');
const cors = require('cors')
app.use(cors())

app.use(express.json());
app.use('/orders', usersRouter);

app.listen(3001)
