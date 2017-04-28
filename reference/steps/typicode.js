// https://jsonplaceholder.typicode.com/posts

const request = require('request');
const router = require('express').Router();

router.route('/jsonplaceholder')
  .get((req, res) => {
    const options = {
      url: 'https://jsonplaceholder.typicode.com/posts',
      headers: {
        "content-type": "application/json",
        'User-Agent': 'request'
      }
    };

    //return res.status(200).send([{"OK": "YES and OK 111111"}]);

    request(options, (err, response, body) => {
      //if (err) {
      //  res.json({"error": err.toString()});
      //}
      //let info = JSON.parse(body);
      //
      require('request').debug = true

      console.log('jsonplaceholder is called:', typeof res, res === response);
      res.status(200).json([{"OK": "YES and OK2222222"}]);
    })

  });

module.exports = router;