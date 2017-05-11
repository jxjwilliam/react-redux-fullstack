import express from 'express'
import mongodb from 'mongodb'

const app = express()
const dbUrl = 'mongodb://localhost:27017/crudwithredux'

mongodb.MongoClient.connect(dbUrl, (err, db) => {

  app.get('/api/games', (req, res) => {
    db.collection('games').find({}).toArray((err, games) => {
      res.json({ games });
    })
  })

  app.listen(8080, () => console.log('Server is running on localhost:8080'))
})