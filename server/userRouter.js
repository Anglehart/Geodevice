const express = require('express');
const router = express.Router();
const db = require('./connection'); //для модуля из этой же папки обязательно ставить ./

router.post("/", function (request, response) {
  if(!request.body) return response.sendStatus(400);
  db.one('INSERT INTO users (name, age) VALUES ($1, $2) RETURNING id', [request.body.userName, request.body.userAge])
    .then(function (data) {
      return response.json(data.id);
    })
    .catch(function (error) {
      console.log("ERROR:", error);
  });
});

router.get("/", function (request, response) {
  if(!request.body) return response.sendStatus(400);
  db.any('SELECT name, age, id FROM users;')
  .then(function (data) {
    return response.json(data);
  })
})

router.delete("/id", function (request, response) {
  if(!request.body) return response.sendStatus(400);
  db.any('DELETE FROM users WHERE id = $1;', [request.body.userId])
    .then(function (data) {
      return response.json(data); //Возвращаем хуй знает что, лишь бы был ответ
    })
    .catch(function (error) {
      console.log("ERROR:", error);
  });
});

router.post("/id", function (request, response) {
  if(!request.body) return response.sendStatus(400);
  db.any('SELECT name, age, id FROM users WHERE id = $1;', [request.body.userId])
  .then(function (data) {
    return response.json(data);
  })
})

module.exports = router;
