const pgp = require('pg-promise')(/*options*/)
const config = require('../config')

const cn = {
  host: config.host,
  port: 5432,
  database: config.database,
  user: config.user,
  password: config.password
}
console.log('postgres db', cn);
const db = pgp(cn)

module.exports = {
  pgp, db
}
