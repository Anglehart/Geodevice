const pgp = require("pg-promise")(/*options*/);
const db = pgp("postgres://postgres:123456@localhost/geodevice");
module.exports = db;
