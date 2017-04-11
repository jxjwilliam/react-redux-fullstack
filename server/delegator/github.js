const request = require('request');
const router = require('express').Router();

router.use('/:user', (req, res) => {
  const user = req.params.user;

  const options = {
    url: 'https://api.github.com/users/' + user.trim() + '/repos',
    headers: {
      "content-type": "application/json",
      'User-Agent': 'request'
    }
  }

  request(options, (err, response, body) => {
    if (err) {
      res.json({"error": err.toString()});
    }
    var info = JSON.parse(body);

    console.log('called!', info)

    res.status(200).send([{"OK": "YES OK"}]);
  })
});

module.exports = router;