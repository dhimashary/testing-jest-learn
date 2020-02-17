const request = require('supertest')
const app = require('../app')
const Sequelize = require('sequelize')
const { User, sequelize } = require('../models')
const { queryInterface } = sequelize

describe('User Routes', () => {
  afterEach((done) => {
    queryInterface.bulkDelete('Users', {})
      .then(response => {
        done()
      }).catch(err => done(err))
  })

  describe('User Register Test', () => {
    test('it should return new user object and status 201', (done) => {
      request(app)
        .post('/register')
        .send({
          email: 'd@mail.com',
          password: '12345'
        })
        .end((err, response) => {
          expect(err).toBe(null)
          expect(response.body).toHaveProperty('email', 'd@mail.com')
          expect(response.body).toHaveProperty('password', expect.any(String))
          expect(response.body).toHaveProperty('id', expect.any(Number))
          expect(response.status).toBe(201)
          done()
        })
    })

  })
})

