const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const pg = require('pg')
const conString = 'postgres://postgres:123456@localhost/node_hero'
var pool = new pg.Pool({connectionString: conString})

app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))
app.listen(3000)
app.get('/', (request, response) => {
    response.render('home', {
        name: 'Юрий',
        age: '28'
    })
})

app.post('/', function (req, res, next) {
  const user = req.body

  pool.connect(function (err, client, done) {
    if (err) {
      // Передача ошибки в обработчик express
      return next(err)
    }
    client.query('INSERT INTO users (name, age) VALUES ($1, $2);', [user.name, user.age], function (err, result) {
      pool.end() // Этот коллбек сигнализирует драйверу pg, что соединение может быть закрыто или возвращено в пул соединений
      if (err) {
        // Передача ошибки в обработчик express
        return next(err)
      }
    })
  })
})
