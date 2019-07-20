const path = require('path')
const express = require('express')
const app = express()
const router1 = require('./router');

app.use(express.json());
router1 (app)
app.use('/', express.static (path.join(__dirname, '../client')))

app.listen(3000)
