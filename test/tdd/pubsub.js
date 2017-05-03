var PubSub = {
  subscribe: function (ev, callback) {
    var calls = this._callbacks || (this._callbacks = {});

    (this._callbacks[ev] || (this._callbacks[ev] = [])).push(callback);

    return this;
  },

  publish: function () {

    var args = [].slice.call(arguments, 0);

    // get event name (first arg)
    var ev = args.shift();

    var list, calls, i, l;

    // this._callbacks is non object?
    if (!(calls = this._callbacks)) return this;

    // this._callbacks[ev] not exist?
    if (!(list = this._callbacks[ev])) return this;

    // execute callback
    for (i = 0, l = list.length; i < l; i++) {
      list[i].apply(this, args);
    }
    return this;
  }
}

//testing:
PubSub.subscribe('event1', function () {
  console.log('callback 1');
});
PubSub.subscribe('event2', function (val) {
  console.log('callback 2: ' + val);
});
PubSub.subscribe('event3', function (ary) {
  console.log('callback 3', ary);
});

PubSub.publish('event1');  //callback 1
PubSub.publish('event2', 123);  //callback 2: 123
PubSub.publish('event3', [1, 2, 3]); //callback 3 [1, 2, 3]