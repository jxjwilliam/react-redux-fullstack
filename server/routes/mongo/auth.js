const router = require('express').Router()
const Login = require('../../models/auth')
import { v4 } from 'node-uuid';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import config from '../../../etc/jwtconfig'

//TODO:
router.route('/jwt')
  .post((req, res, next) => {
    const { account, pass } = req.body;
    Login.findOne({account: account}, (err, user)=> {
      if (err) {
        return res.status(401).json({errors: {form: 'Invalid Credentials'}})
      }
      console.log('auth.js:', user);
      if (bcrypt.compareSync(pass, user.get('password_digest'))) {
        const token = jwt.sign({  //jwt.verify(token)
          id: user.get('id'),
          username: user.get('username')
        }, config.jwtSecret);
        res.json({token})
      }
      else {
        res.status(401).json({errors: {form: 'Invalid Password'}});
      }
    })
  })
/**
 * 1. password encrypt
 * 2. if token exists, return token instead of query DB
 * 3. redis save token ?
 * 4. if token not exist, query DB, and create token, return token
 * 5. use authenticate middleware
 * 6. add token as `next`  middleware to validate?
 */

router.route('/login')
  .post((req, res, next) => {
    var auth = req.body;
    Login.findOne({account: auth.account, pass: auth.pass}, (err, login) => {
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