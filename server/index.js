const path = require('path')
const express = require('express')
const app = express()
const pg = require('pg')
const jsonParser = express.json();
const conString = 'postgres://postgres:123456@localhost/node_hero'
var pool = new pg.Pool({connectionString: conString})

app.use('/', express.static (path.join(__dirname, '../client')))

app.post("/", jsonParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    pool.connect(function (err, client, done) {
      if (err) {
        return next(err)
      }
      client.query('INSERT INTO users (name, age) VALUES ($1, $2);', [request.body.userName, request.body.userAge], function (err, result) {
        if (err) {
          return next(err)
        }
      })
      client.query('SELECT name, age FROM users;', function (err, result) {
        if (err) {
          return next(err)
        }
        response.json(result.rows);
      })
    })
});

app.listen(3000)
