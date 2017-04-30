// or: use webpack-dev-server
// or use pm2???

require('babel-core/register');

var args = process.argv.slice(2);

//server, server-psql, server.socket, server-only
if (args[0]) {
  require('./server-' + args[0])
}
else {
  require('./server');
}


/**
 switch (process.env.ENV) {
   case 'express':
     require('./server');
     return;
   case 'websocket':
   case 'redis':
   case 'rabbitmq':
   case 'psql':
   case 'mysql':
   case 'mongodb':
     require('./server');
     return;
   default:
     require('./server');
 }
 */
