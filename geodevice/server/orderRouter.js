const express = require('express');
const router = express.Router();
const db = require('./connection'); //для модуля из этой же папки обязательно ставить ./

router.post("/", function (request, response) { //Добавление пользователя, возврат ID
  if(!request.body) return response.sendStatus(400);
  let t = request.body;
  db.one('INSERT INTO orders (ourid, contactname, contactphone, companyname, devicename, devicesn, mastername) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING ourid', [t.ourId, t.contactName, t.contactPhone, t.companyName, t.deviceName, t.deviceSn, t.masterName])
    .then(function (data) {
      return response.json(data);
    })
    .catch(function (error) {
      console.log("Ошибка: ", error);
  });
});

router.get("/", function (request, response) { //Показать всех пользователей
  if(!request.body) return response.sendStatus(400);
  db.any('SELECT id, ourid, contactname, contactphone, companyname, devicename, devicesn, mastername FROM orders;')
  .then(function (data) {
    return response.json(data);
  })
})

router.delete("/id", function (request, response) { //Удалить пользователя по ID
  console.log(request.query.orderId)
  db.any('DELETE FROM orders WHERE id = $1 RETURNING id;', [request.query.orderId])
    .then(function (data) {
      return response.json(data);
    })
    .catch(function (error) {
      console.log("ERROR:", error);
  });
});
/*
router.get("/id", function (request, response) { //Возвращает одного пользователя
  db.one('SELECT name, age, id FROM users WHERE id = $1;', [request.query.userId])
  .then(function (data) {
    return response.json(data);
  })
})*/

router.put("/id", function (request, response) { //Изменить заказ
  if(!request.body) return response.sendStatus(400);
  db.one(`UPDATE orders SET ${request.body.changedrow} = '${request.body.newvalue}' WHERE id = ${request.body.id}`)
    .catch(function (error) {
      return response.json(error);
  });
});
module.exports = router;
