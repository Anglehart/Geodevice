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
app.get('/userage', (request, response) => {
    response.render('home')
})

app.post("/userage", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    pool.connect(function (err, client, done) {
      if (err) {
        return next(err)
      }
      client.query('INSERT INTO users (name, age) VALUES ($1, $2);', [request.body.userName, request.body.userAge], function (err, result) {
        pool.end()
        if (err) {
          return next(err)
        }
      })
    })
});

/*app.post("/userage", urlencodedParser, function (request, response, next) {
    if(!request.body) return response.sendStatus(400);
    pool.connect(function (err, client, done) {
      if (err) {
        return next(err)
      }
      client.query('INSERT INTO users (name, age) VALUES ($1, $2);', [request.body.userName, request.body.userAge], function (err, result) {
        pool.end()
        if (err) {
          return next(err)
        }
      })
    })
});*/

app.get("/", function(request, response){
    response.send("Главная страница");
});
