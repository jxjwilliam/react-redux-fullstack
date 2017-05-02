var redis = require("redis");

var pub = redis.createClient();
var sub = redis.createClient();

sub.on("subscribe", function (channel, count) {
  console.log("Subscribed to " + channel + ". Now subscribed to " + count + " channel(s).");
});

sub.on("message", function (channel, message) {
  console.log("Message from channel " + channel + ": " + message);
});

sub.subscribe("tungns");

setInterval(function () {
  var no = Math.floor(Math.random() * 100);
  pub.publish('tungns', 'Generated Chat random no ' + no);
}, 5000);