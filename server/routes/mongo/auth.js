const router = require('express').Router()
const Login = require('../../models/login')
import { v4 } from 'node-uuid';

/**
 * 1. password encrypt
 * 2. if token exists, return token instead of query DB
 * 3. redis save token ?
 * 4. if token not exist, query DB, and create token, return token
 * 5. use authenticate middleware
 * 6. add token as `next`  middleware to validate?
 */
//{ account: 'iwantlogin', pass: 'reduxform' }
router.route('/login')
  .post((req, res, next) => {
    var login = req.body;

    Login.findOne({account: login.account, pass: login.pass}, (err, login) => {
      if (err) return res.status(500).json({result: 'LOGIN FAILED'});
      if (login) {
        /**
         * login successful:
         * { _id: 590f68939dc6a2475f15015c, account: 'test', pass: 'test', active: true }
         * should return a token
         */
        return res.status(200).json({account: login.account, tokenId: v4()});
      }
      else {
        // user not exist.
        return res.status(201).json({account: ''})
      }
    })
  });

router.route('/logout')
  .get((req, res, next) => {
    res.status(200);
  });

module.exports = router