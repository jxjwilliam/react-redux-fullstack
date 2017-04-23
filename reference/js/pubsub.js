//https://gist.github.com/Drbelfast/47a987065947f3338c1a168b8ee473e0

var PubSub = {

  subscribe: function(ev, callback) {

    var calls = this._callbacks || (this._callbacks = {});

    (this._callbacks[ev] || (this._callbacks[ev]=[])).push(callback);

    return this;
  },

  publish: function() {

    var args = Array.prototype.slice.call(arguments, 0);

    var ev = args.shift();

    var list, calls, i, l;

    if(!(calls = this._callbacks)) return this;

    if(!(list  = this._callbacks[ev])) return this;

    for(i=0, l=list.length; i<l; i++) {
      list[i].apply(this, args);
    }
    return this;
  }
}
//testing:
PubSub.subscribe('event1', function() { console.log('callback 1'); });
PubSub.subscribe('event2', function(val) { console.log('callback 2: ' + val); });
PubSub.subscribe('event3', function(ary) { console.log('callback 3', ary); });

PubSub.publish('event1');  //callback 1
PubSub.publish('event2', 123);  //callback 2: 123
PubSub.publish('event3', [1,2,3]); //callback 3 [1, 2, 3]