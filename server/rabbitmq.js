var amqp = require('amqplib/callback_api');
import {RabbitMQ} from '../etc/config'

const queue_name = 'basic'

const receive = (io) => {

  amqp.connect(RabbitMQ.url, (err, conn) => {

    conn.createChannel((err, ch) => {

      ch.assertQueue(queue_name, {durable: false});

      ch.consume(queue_name, function (msg) {

        io.sockets.emit('rabbis', msg.content.toString());

      }, {noAck: true});
    });
  });
}

const send = (msg) => {

  amqp.connect(RabbitMQ.url, (err, conn) => {

    conn.createChannel((err, ch) => {

      ch.assertQueue(queue_name, {durable: false});

      ch.sendToQueue(queue_name, new Buffer(msg));
    });

    setTimeout(() => conn.close(), 500);
  });
}

module.exports = {
  receive, send
}