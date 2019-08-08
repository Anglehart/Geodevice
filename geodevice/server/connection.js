/*const conString = 'postgres://postgres:123456@localhost/node_hero'
const pg = require('pg')
var pool = new pg.Pool({connectionString: conString})*/



const pgp = require("pg-promise")(/*options*/);
const db = pgp("postgres://postgres:123456@localhost/node_hero");
module.exports = db;
