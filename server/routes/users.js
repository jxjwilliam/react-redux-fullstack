const router = require('express').Router()
const User = require('../models/user')

//User.findOne({_id: token }, callback);
router.route('/api/users/')
    .get((req, res, next) => {
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

            console.log('===after post: ', JSON.stringify(user));

            return res.status(201).json(user)
        })
    })

    .delete((req, res, next) => {
        // This method is similar to find but instead
        // it removes all the occurrences
        User.remove((err) => {
            if (err) return next(err)

            return res.status(204).end()
        })

        res.status(204).end()
    })

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
})

router.route('/api/users/:id')

    .get((req, res, next) => {
        return res.json(req.user)
    })

    .put((req, res, next) => {
        // I'm not using req.user.update() because
        // that method doesn't return the user on the callback
        User.findByIdAndUpdate(req.user.id, {
            $set: req.body
        }, {
            // Returns the updated user
            new: true,
            // Set the whole document even if we are not
            // receiving all the properties
            overwrite: true,
            // Run validations if we have them
            runValidators: true
        }, (err, user) => {
            if (err) return next(err)

            return res.json(user)
        })
    })

    .patch((req, res, next) => {
        User.findByIdAndUpdate(req.user.id, {
            $set: req.body
        }, {
            new: true,
            runValidators: true
        }, (err, user) => {
            if (err) return next(err)

            return res.json(user)
        })
    })

    .delete((req, res, next) => {
        User.findByIdAndRemove(req.user.id, (err) => {
            if (err) return next(err)

            res.status(204).end()
        })
    })

module.exports = router
