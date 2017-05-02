const router = require('express').Router();
const Counter = require('../../models/counter');

/**
 * {
	"_id" : ObjectId("58ea52f57d8c0c15bb2920ba"),
	"updatedAt" : ISODate("2017-04-09T15:27:50.003Z"),
	"createdAt" : ISODate("2017-04-09T15:27:50.003Z"),
	"counter" : 11,
	"__v" : 0
 * }
 */
router.route('/')
  .get((req, res, next) => {
    Counter.findOne((err, data) => {
      if (err) return next(err)
      return res.status(200).json({"counter": data.counter})
    })
  })
  .put((req, res, next) => {
    /**
     * req.body: {"counter":88}
     * findOneAndUpdate: https://docs.mongodb.com/manual/reference/method/db.collection.findOneAndUpdate/
     * - Specify an empty document {} to update the first document returned in the collection.
     * - The $set operator replaces the value of a field with the specified value.
     */
    console.log('put->counter->', req.body)
    Counter.findOneAndUpdate({}, {
        $set: {counter: req.body.counter}
      }, (err, counter) => {
        if (err) return next(err)
        // counter: old value, req.body.counter: new updated value.
        return res.status(200).send(counter);
      })
  })
  //post is for create, not for update.
  // for mocha->char-http test.
  .post((req, res, next) => {
    console.log('post->counter->', req.body);
    Counter.findOneAndUpdate({},
      { $set: {counter: req.body.counter} }, (err, counter) => {
        if (err) return next(err)
        // counter: old value, req.body.counter: new updated value.
        return res.send(counter)
      })
  });

module.exports = router;
