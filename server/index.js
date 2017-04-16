// ENV_SIMPLE: server without websocker.
// ENV_ALL: websocker + db + ...
// or: use webpack-dev-server
// or use pm2???

if (process.env.ENV_SIMPLE) {
	require('babel-register')
	require('./server-no-websocket');
}
else if(process.env.ENV_ALL) {
	require('babel-core/register');
	require('./server');
}
else {
	console.log('no env setting match: use webpack-dev-server from command.');

	require('babel-core/register');
	require('./server');
}
