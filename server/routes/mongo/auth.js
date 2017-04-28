const router = require('express').Router()

//{ username: 'iwantlogin', password: 'reduxform' }
router.route('/login')
  .post((req, res, next) => {
    var login = req.body;
    var authLogin = [
      {username: 'william', password: 'jiang'},
      {username: 'admin', password: 'admin'}
    ]

    var valid = authLogin.some(l => l.username === login.username && l.password === login.password)

    if (valid) {
      return res.status(200).json(login)
    }
    else {
      res.json({result: 'LOGIN FAILED'});
    }
  });

router.route('/logout')
  .get((req, res, next) => {
    res.status(200);
  });

module.exports = router