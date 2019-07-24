client.query('SELECT name, age, id FROM users;', function (err, result) {
  if (err) {
    return next(err)
  }
  response.json(result.rows);
})
