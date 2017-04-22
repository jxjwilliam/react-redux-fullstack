const router = require('express').Router()
const User = require('../models/user')

const offset = 10;
const limit = 10;
//User.findOne({_id: token }, callback);
router.route('/api/users/')
  .get((req, res, next) => {
    //User.find().skip(offset).limit(limit).exec((err, users) => {}
    User.find((err, users) => {
      if (err) return next(err)

      //TODO: pagination: /api/users/page/1, /api/user/page/n...
      //const userList = users.slice(0, 10);
      /**
       2017-04-03T04:00:00.000Z 'Kimberly' 'object'
       undefined 'Joshua' 'undefined'
       userList.forEach(u => {
          console.log(u.dob, u.firstName, typeof u.dob);
          u.dob = u.dob ? u.dob.split(/[A-Z]/)[0] : 'N/A'
        });
       */
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
    User.findByIdAndRemove(req.user._id, (err) => {
      if (err) return next(err)

      console.log('should not be here...');
      res.status(204).end()
    })
  })

module.exports = router
