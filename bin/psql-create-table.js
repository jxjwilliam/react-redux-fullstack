const pg = require('pg');
const config = require('../etc/config');

const connectionString = config.Pg.getDBFullString();

const client = new pg.Client(connectionString);

client.connect();

const query = client.query(
  'CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(400) not null, complete BOOLEAN)');

query.on('end', () => {
  client.end();
});