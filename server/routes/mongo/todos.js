const router = require('express').Router()
const Todo = require('../../models/todo')

router.route('/')
  .get((req, res, next) => {
    Todo.find((err, todos) => {
      if (err) return next(err)
      return res.json(todos)
    })
  })
  .post((req, res, next) => {
    Todo.create(req.body, (err, todo) => {
      if (err) return next(err)
      return res.status(201).json(todo)
    })
  })
  .delete((req, res, next) => {
    Todo.remove((err) => {
      if (err) return next(err)

      return res.status(204).end()
    })

    res.status(204).end()
  })

router.param('todoId', (req, res, next, id) => {
  // Handle to find the requested resouce
  Todo.findById(id, (err, todo) => {
    if (err) return next(err)

    // If the todo is not found then the app returns a 404
    if (!todo) {
      err = new Error('Todo not found')
      err.status = 404
    } else {
      req.todo = todo
    }

    return next(err)
  })
})

router.route('/:todoId')

  .get((req, res, next) => {
    return res.json(req.todo)
  })

  .put((req, res, next) => {
    Todo.findByIdAndUpdate(req.todo.id, {
      $set: req.body
    }, {
      new: true,
      overwrite: true,
      runValidators: true
    }, (err, todo) => {
      if (err) return next(err)

      return res.json(todo)
    })
  })
  .patch((req, res, next) => {
    Todo.findByIdAndUpdate(req.todo.id, {
      $set: req.body
    }, {
      new: true,
      runValidators: true
    }, (err, todo) => {
      if (err) return next(err)

      return res.json(todo)
    })
  })
  .delete((req, res, next) => {
    Todo.findByIdAndRemove(req.todo.id, (err) => {
      if (err) return next(err)

      res.status(204).end()
    })
  })

module.exports = router
