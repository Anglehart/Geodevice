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
  //Что мы пытаемся присвоить константе user?
  //По идее, в нее надо положить значения name и age, которые отрендерились на странице (или перехватить до этого)
  //Если убрать обертку app.post и заявить переменные явно, то они запишутся в базу (я закоммитил это)
  //В таком виде код просто подвешивает консоль
  pool.connect(function (err, client, done) {
    if (err) {
      return next(err)
    }
    client.query('INSERT INTO users (name, age) VALUES ($1, $2);', [user.name, user.age], function (err, result) {
      pool.end()
      if (err) {
        return next(err)
      }
    })
  })
})
