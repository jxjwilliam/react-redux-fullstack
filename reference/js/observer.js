//https://gist.github.com/Drbelfast/48b26fc4fe5cd808ad5b9aba63d11b88

function Observer1() {
  var Subject = function () {

    // use this.observers will throw 'undefined'.
    var observers = [];

    return {
      subscribeObserver: function subscribeObserver(observer) {
        observers.push(observer);
      },
      unsubscribeObserver: function (observer) {
        var index = observers.indexOf(observer);
        if (index > -1) {
          observers.splice(index, 1);
        }
      },
      notifyObserver: function (observer) {
        var index = observers.indexOf(observer);
        if (index > -1) {
          observers[index].notify(index);
        }
      },
      notifyAllObservers: function () {
        for (var i = 0; i < observers.length; i++) {
          observers[i].notify(i);
        }
      }
    };
  };

  var Observer = function () {
    return {
      notify: function (index) {
        console.log("Observer " + index + " is notified!");
      }
    }
  }

  var subject = new Subject();

  const observers = Array(4).fill(new Observer());

  observers.forEach(o => {
    subject.subscribeObserver(o);
  });

  subject.notifyObserver(observers[2]); // Observer 2 is notified!

  subject.notifyAllObservers();
}
//
//var observer1 = new Observer();
//var observer2 = new Observer();
//var observer3 = new Observer();
//var observer4 = new Observer();
//
//subject.subscribeObserver(observer1);
//subject.subscribeObserver(observer2);
//subject.subscribeObserver(observer3);
//subject.subscribeObserver(observer4);
//
//subject.notifyObserver(observer2); // Observer 2 is notified!
//
//subject.notifyAllObservers();
// Observer 1 is notified!
// Observer 2 is notified!
// Observer 3 is notified!
// Observer 4 is notified!


/////////////// Osmani version ////////////

function ObserverList() {
  this.observerList = [];
}
ObserverList.prototype = {
  add: function (obj) {
    return this.observerList.push(obj);
  },
  count: function () {
    return this.observerList.length;
  },
  get: function () {
  },
  indexOf: function () {
  },
  removeAt: function () {
  }
}


function Subject() {
  this.observers = new ObserverList();
}
Subject.prototype = {
  addObserver: function (observer) {
    this.observers.add(observer);
  },
  removeObserver: function (observer) {
  },
  notify: function (context) {
    var observerCount = this.observers.count();
    for (var i = 0; i < observerCount; i++) {
      this.observers.get(i).update(context);
    }
  }
}

Subject.prototype.constructor = Subject;

function Observer() {
  this.update = function (notify) {
    console.log('do update', notify)
  }
}

var subject = new Subject()
console.log('===========', subject);
subject.addObserver(new Observer());
subject.notify('do notify');