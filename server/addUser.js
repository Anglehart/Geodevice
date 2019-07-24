const pool = require('./connection'); //для модуля из этой же папки обязательно ставить ./
module.exports = function router(app){
  app.post("/user", function (request, response) {
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
};
