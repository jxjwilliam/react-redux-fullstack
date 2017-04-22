//https://www.slideshare.net/stefanmayer13/functional-reactive-programming-with-rxjs

import Rx from 'rxjs';
import reduxObservable from 'redux-observable';

var keyup = Rx.Observable.fromEvent(input, 'keyup')
  .map(function (e) {
    return e.target.value;
  })
  .filter(function (input) {
    return input.length > 2;
  })
  .debounce(250)
  .distinctUntilChanged()
  .flatMapLatest(doAsyncSearch()
    .retry(3))
  .takeUntil(cancelStream)
  .subscribe(
  function (data) {
  },
  function (error) {
    // do error handling
    dispatch({type: 'SEARCH_ERROR', payload: ''})
  }
)

const doAsyncSearch = (value) => {
  ajax('https://api.github.com/search/users?q=' + value)
    .map(payload => ({
      type: 'QUERY_FULFILLED',
      payload
    }))
}

const loadUsers = actionCreator(() => {
  return {
    type: 'USERS_LOADING',
    payload: Observable.ajax('/api/users')
      .map(({response}) => map(response, 'username'))
      .map((users) => ({
        type: 'USERS_LOADED',
        payload: users
      }))
  }
})


/////////////////

// Just like normal redux, we're now using an action factory
// so that we can create a one-off observable that relies on userId
const fetchUserById = (userId) => (
  (actions) => (
    Observable.ajax('/api/users/${userId}')
      .map(
      (payload) => ({type: 'FETCH_USER_FULFILLED', payload})
    )
      .takeUntil(actions.ofType('FETCH_USER_ABORT'))
      .startWith({type: 'FETCH_USER_PENDING'})
  )
);

const subscription = dispatch(fetchUserById(1));

// To cancel the AJAX request you can dispatch an abort action
// from anywhere in your app
dispatch({type: 'FETCH_USER_ABORT'});

// or if it happens to be more ergonomic, just unsubscribe
// directly. Sometimes you want to abort all of these,
// sometimes just this single one.
subscription.unsubscribe();