const pool = require('./connection'); //для модуля из этой же папки обязательно ставить ./
module.exports = function router(app){
  app.get("/user", function (request, response) {
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
};
