const express = require('express');
const router = express.Router();
const db = require('./connection'); //для модуля из этой же папки обязательно ставить ./

router.post("/", function (request, response) { //Добавление пользователя, возврат ID
  if(!request.body) return response.sendStatus(400);
  db.one('INSERT INTO orders (ourid, contactname, contactphone) VALUES ($1, $2, $3) RETURNING ourid', [request.body.ourId, request.body.contactName, request.body.contactPhone])
    .then(function (data) {
      return response.json(data);
    })
    .catch(function (error) {
      console.log("Ошибка: ", error);
  });
});

/*router.get("/", function (request, response) { //Показать всех пользователей
  if(!request.body) return response.sendStatus(400);
  db.any('SELECT name, age, id FROM users;')
  .then(function (data) {
    return response.json(data);
  })
})

router.delete("/id", function (request, response) { //Удалить пользователя по ID
  db.any('DELETE FROM users WHERE id = $1 RETURNING id;', [request.query.userId])
    .then(function (data) {
      return response.json(data);
    })
    .catch(function (error) {
      console.log("ERROR:", error);
  });
});

router.get("/id", function (request, response) { //Возвращает одного пользователя
  db.one('SELECT name, age, id FROM users WHERE id = $1;', [request.query.userId])
  .then(function (data) {
    return response.json(data);
  })
})

router.put("/id", function (request, response) { //Изменить пользователя по ID
  if(!request.body) return response.sendStatus(400);
  db.one('UPDATE Users SET name = $1, age = $2 WHERE id = $3 RETURNING id, name, age; ', [request.body.userName, request.body.userAge, request.body.userId])
    .then(function (data) {
      console.log(data);
      return response.json(data);
    })
    .catch(function (error) {
      return response.json(error);
  });
});*/
module.exports = router;
