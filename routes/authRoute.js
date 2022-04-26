const express = require('express')
const app = express()
const authMethods = require('../controllers/authController')

app.post('/signup', authMethods.signup)
app.post('/signin', authMethods.signin)

module.exports = app