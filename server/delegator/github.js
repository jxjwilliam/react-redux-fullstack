const request = require('request');
const router = require('express').Router();

router.route('/api/delegate/github/:user')
  .get((req, res) => {
    const user = req.params.user;

    console.log('in /api/delegate/github', user)
    //debug('debug');

    const options = {
      url: 'https://api.github.com/users/' + user + '/repos',
      headers: {
        "content-type": "application/json",
        'User-Agent': 'request'
      }
    };

    return request(options, (err, response, body) => {
      if (err) {
        res.json({"error": err.toString()});
      }

      let info = JSON.parse(body);
      console.log('called!', info)
      res.status(200).send(info);
    })
  });

module.exports = router;