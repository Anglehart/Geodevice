const pool = require('./connection'); //для модуля из этой же папки обязательно ставить ./
module.exports = function router(app1){
  app1.post("/", function (request, response) {
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
};
