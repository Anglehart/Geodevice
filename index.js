const path = require('path')
const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const pg = require('pg')
const bodyParser = require("body-parser");
const conString = 'postgres://postgres:123456@localhost/node_hero'
var pool = new pg.Pool({connectionString: conString})
const urlencodedParser = bodyParser.urlencoded({extended: false});


app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))
app.listen(3000)

//Этот запрос должен получать из базы все данные и рендерить их. Но не работает =(
app.get('/userage', (request, response, next) => {
  pool.connect(function (err, client, done) {
    if (err) {
      return next(err)
    }
    client.query('SELECT name, age FROM users;', [], function (err, result) {
      if (err) {
        return next(err)
      }
      response.render('home', {object: result});
    })
  })
})

//Этот запрос работает и отправляет данные в базу, а потом заново рендерит страницу
app.post("/userage", urlencodedParser, function (request, response, next) {
    if(!request.body) return response.sendStatus(400);
    pool.connect(function (err, client, done) {
      if (err) {
        return next(err)
      }
      client.query('INSERT INTO users (name, age) VALUES ($1, $2);', [request.body.userName, request.body.userAge], function (err, result) {
        //pool.end() - если закрыть пул, то при повторном обращении выдает ошибку
        if (err) {
          return next(err)
        }
      response.render('home') //После выполнения post-запроса браузер ожидает ответа, поэтому отправляем ему рендер страницы
      })
    })
});
