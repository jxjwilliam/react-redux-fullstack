import redis from 'redis';
import {Redis} from '../etc/config'


//[redis:]//[[user][:password@]][host][:port]
const url = 'redis://' + Redis.user + ':' + Redis.password + '@' + Redis.host + ':' + Redis.port;

const client = redis.createClient(url);
/**
 * var pub = redis.createClient();
 * var sub = redis.createClient();
 */

// Redis Client Ready
client.once('ready', function () {

  // Flush Redis DB
  // client.flushdb();

  // Initialize Chatters
  client.get('chat_users', function (err, reply) {
    if (reply) {
      chatters = JSON.parse(reply);
    }
  });

  // Initialize Messages
  client.get('chat_app_messages', function (err, reply) {
    if (reply) {
      chat_messages = JSON.parse(reply);
    }
  });
});

client.on('error', (e) => {
  console.log(e);
});

module.exports = client
