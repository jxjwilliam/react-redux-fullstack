const router = require('express').Router()

//{ username: 'iwantlogin', password: 'reduxform' }
router.route('/api/auth/login')
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
  })
module.exports = router