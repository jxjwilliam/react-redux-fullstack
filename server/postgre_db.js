const pg = require('pg');
import prettyjson from 'prettyjson'

//https://github.com/brianc/node-postgres

const config = {
  host: 'localhost',
  port: 5433, //5432
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
  console.log(prettyjson.render(text, values));
  return pool.query(text, values, callback);
};

module.exports.connect = function (callback) {
  return pool.connect(callback);
};

/**
 * https://gist.github.com/brianc/f906bacc17409203aee0
 *
 pool = new pg.Pool(config);
 pool.connect((err, db, done) => {
  if(err) throw new Error(err);
  db.query('SELECT * from items', (err, table) => {
    console.log(table);
  });
 });
 */