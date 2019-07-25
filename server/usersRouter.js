const express = require('express');
const router = express.Router();
const pool = require('./connection'); //для модуля из этой же папки обязательно ставить ./

router.post("/", function (request, response) {
  if(!request.body) return response.sendStatus(400);
  pool.connect(function (err, client, done) {
    if (err) {
      return next(err)
    }
    client.query('INSERT INTO users (name, age) VALUES ($1, $2) RETURNING id', [request.body.userName, request.body.userAge], function (err, result) {
      if (err) {
        return next(err)
      }
      response.json(result.rows);
    })
  })
});

router.get("/", function (request, response) {
  if(!request.body) return response.sendStatus(400);
  pool.connect(function (err, client, done) {
    if (err) {
      return next(err)
    }
    client.query('SELECT name, age, id FROM users;', function (err, result) {
      if (err) {
        return next(err)
      }
      response.json(result.rows);
    })
  })
});

module.exports = router;
