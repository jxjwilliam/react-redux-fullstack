import redis from 'redis';
import {Redis} from '../etc/config'

//[redis:]//[[user][:password@]][host][:port]
const rurl = Redis.getUrlString();
/**
 * create 3 redis clients:
 * - pub/sub used for socket+redis-pub/sub
 * - client used for login user counts
 * all the 3 access the same `redis-server` DB
 */
const client = redis.createClient(rurl);

// Redis Pub/Sub, can be multiple subscribers.
const pub = redis.createClient(rurl);
const sub = redis.createClient(rurl);

// socket -> sub -> pub -> socket
// call sequence: 'subscribe', 'message'
sub.on('subscribe', (channel, message) => {
  console.log('message: ', message);
  pub.publish(channel, "red"); //"redis_twits"
  setTimeout(()=> pub.publish(channel, 'blue'), 2000)
});


client.once('ready', () => {
  client.set('loginCounts', 1, redis.print);
})

client.on('error', e => console.log('error', e));

module.exports = {sub, pub, client}

/**
 modules.exports = (function(io) {
  var socket = io.sockets;
  //...
  //same as above, but inject a object `io`.
  return { sub, pub, client }
})(io);

 call var redis = require('./redis')(io)
 */