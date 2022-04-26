const express = require('express')
const app = express()
const {addTodo, updateTodo, getTodo, getUserTodos, deleteTodo, getAllTodos} = require('../controllers/todoController')

// Middleware verifica si estoy logged
const verify = require('../middlewares/verifySessionMiddleware')

//app.get('/', verify.verifySessionMiddleware, getAllTodos)
app.get('/:id', verify.verifySessionMiddleware, getTodo)
app.get('/', verify.verifySessionMiddleware, getUserTodos)
app.put('/:id', verify.verifySessionMiddleware, updateTodo)
app.delete('/:id', verify.verifySessionMiddleware, deleteTodo)
app.post('/', verify.verifySessionMiddleware, addTodo)

module.exports = app