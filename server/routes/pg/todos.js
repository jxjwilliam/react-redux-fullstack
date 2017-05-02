const router = require('express').Router();
const pool = require('../../postgre_db');

router.route('/todos')
  .get((req, res, next) => {
    pool.query('SELECT * FROM items ORDER BY id ASC;', (err, data) => {
      if (err) return next(err)
      return res.json(data.rows)
    })
  })

  .post((req, res, next) => {
    console.log('todomvc post:', req.body, req.params);
    const data = {text: req.body.text ? req.body.text : 'react-redux-fullstack-todomvc', complete: false};
    pool.query('INSERT INTO items(text, complete) values($1, $2)',
      [data.text, data.complete], (err, data) => {
        if (err) return next(err)
        return res.json(data.rows)
      })
  });

router.route('/todos/:id')
  .put((req, res, next) => {
    const id = req.params.id;
    const data = {text: req.body.text, complete: req.body.complete};
    pool.query('UPDATE items SET text=($1), complete=($2) WHERE id=($3)',
      [data.text, data.complete, id], (err, data) => {
        if (err) return console.error(err)
        return res.json(data.rows)
      })
  })

  .delete((req, res, next) => {
    const id = req.params.id;
    pool.query('DELETE FROM items WHERE id=($1)', [id], (err, data) => {
      if (err) return console.error(err)
      return res.json(data.rows)
    })
  });

module.exports = router;