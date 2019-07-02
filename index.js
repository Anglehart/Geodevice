const pg = require('pg')
const conString = 'postgres://postgres:123456@localhost:5432/node_hero'
var pool = new pg.Pool({connectionString: conString})

pool.connect(function (err, client, done) {
  if (err) {
    return console.error('error fetching client from pool', err)
  }
  client.query('SELECT $1::varchar AS my_first_query', ['node hero'], function (err, result) {
    done()

    if (err) {
      return console.error('error happened during query', err)
    }
    console.log(result.rows[0])
    pool.end()
  })
})
