const conString = 'postgres://postgres:123456@localhost/node_hero'
const pg = require('pg')
var pool = new pg.Pool({connectionString: conString})

module.exports = pool;
