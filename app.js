const express = require('express')
const app = express()
const { User } = require('./models')

app.use(express.urlencoded({ extended:false }))
app.use(express.json())

app.post('/register', (req, res, next) => {
  User
    .create({
      email: req.body.email,
      password: req.body.password
    })
      .then(user => {
        res.status(201).json({
          email: user.email,
          password: user.password,
          id: user.id
        })
      })
      .catch(err => {
        next(err)
      })
})

app.use((err, req, res, next) => {
  let status = 500
  let msg = { msg: 'internal server error' }
  if(err.name === 'SequelizeValidationError') {
    const errors = []
    err.errors.forEach(error => {
      errors.push(error.message)
    })
    msg = {
      msg: 'Bad Request',
      errors
    }
    status = 400
  }
  res.status(status).json(msg)
})

module.exports = app