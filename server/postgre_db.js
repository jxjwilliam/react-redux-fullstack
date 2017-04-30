const pg = require('pg');

//https://github.com/brianc/node-postgres

const config = {
  host: 'localhost',
  port: 5433,
  user: 'psql',
  password: 'psql',
  database: 'react_redux',
  max: 2
}

const pool = new pg.Pool(config);

pool.on('error', function (err, client) {
  console.error('idle client error', err.message, err.stack);
});


module.exports.query = function (text, values, callback) {
  console.log('query:', text, values);
  return pool.query(text, values, callback);
};

module.exports.connect = function (callback) {
  return pool.connect(callback);
};