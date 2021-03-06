const router = require('express').Router()
const User = require('../../models/user')

//total items:
router.route('/total')
    .get((req, res, next) => {
        User.count({}, (err, count) => {
            if (err) return next(err)
            return res.json({total: count})
        })
    });

// pagination: /api/users/page/1, /api/user/page/2...
const limit = 10;
router.route('/page/:page')
    .get((req, res, next) => {
        const offset = req.params.page-1;
        User.find().skip(offset*limit).limit(limit).exec((err, users) => {
            if (err) return next(err)
            return res.json(users)
        })
    })

// works but deprecated, not use anymore.
router.route('/')
    .get((req, res, next) => {
        //User.findOne({_id: token }, callback);
        User.find((err, users) => {
            if (err) return next(err)
            return res.json(users)
        })
    })

/**
 * .get('/:username/:password', function(req, res) {
     * var newUser = newUser();
     * newUser.username = req.params.username;
     * newUser.password = req.params.password;
     * newUser.save(callback)
     */
    .post((req, res, next) => {
        User.create(req.body, (err, user) => {
            if (err) return next(err)
            return res.status(201).json(user)
        })
    })

    .put((req, res, next) => {
        console.log('User:findByIdAndUpdate:', req.body);

        User.findByIdAndUpdate(req.body._id,
            {
                $set: {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    phone: req.body.phone,
                    dob: req.body.dob,
                }
            }, {
                new: true
            },
            (err, user) => {
                if (err) return next(err)

                return res.json(user)
            })
    })
    .delete((req, res, next) => {
        // This method is similar to find but instead
        // it removes all the occurrences
        User.remove({_id: req.body._id}, (err) => {
            if (err) return next(err)

            return res.status(204).json(req.body._id)
        })
    });

router.route('/search/:username')
    .get((req, res, next) => {

        var reg = new RegExp(req.params.username, 'i');

        User.find({
            '$or': [
                {firstName: reg},
                {lastName: reg}
            ]
        }).exec((err, users) => {
            if (err) return next(err)
            return res.json(users)
        })
    });

//TODO:
router.param('id', (req, res, next, id) => {
    // Handle to find the requested resouce
    User.findById(id, (err, user) => {
        if (err) return next(err)

        // If the user is not found then the app returns a 404
        if (!user) {
            err = new Error('User not found')
            err.status = 404
        } else {
            req.user = user
        }

        return next(err)
    })
});
router.route('/:uid')
    .delete((req, res, next) => {
        User.findByIdAndRemove(req.user._id, (err) => {
            if (err) return next(err)

            console.log('should not be here...');
            res.status(204).end()
        })
    })

module.exports = router
