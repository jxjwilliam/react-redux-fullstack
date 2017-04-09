const router = require('express').Router();
const Counter = require('../models/counter');

/**
 * {
	"_id" : ObjectId("58ea52f57d8c0c15bb2920ba"),
	"updatedAt" : ISODate("2017-04-09T15:27:50.003Z"),
	"createdAt" : ISODate("2017-04-09T15:27:50.003Z"),
	"counter" : 11,
	"__v" : 0
 * }
 */
router.route('/api/counter')
    .get((req, res, next) => {
        Counter.findOne((err, data) => {
            if (err) return next(err)
            return res.send(200, {"counter":data.counter})
        })
    })
    .put((req, res, next) => {
        console.log('put->counter->', req.body);
        res.send(200);
        Counter.findOneAndUpdate(req.body, {
            $set: {"counter": req.body.counter}
        }, {
            new: true
        }, (err, counter) => {
            if (err) return next(err)

            return res.send(counter)
        })
    });

module.exports = router