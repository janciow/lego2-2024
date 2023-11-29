const keys = require('../keys');
const { Pool } = require('pg');
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort,
  ssl:
    process.env.NODE_ENV !== 'production'
      ? false
      : { rejectUnauthorized: false },
});

pgClient.on('connect', (client) => {
  client
    .query(`CREATE TABLE IF NOT EXISTS links2 (number INT)`)
    .catch((err) => console.error(err));
});

module.exports = pgClient;