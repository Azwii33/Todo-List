const express = require('express');
const { getAllTodo, createTodo, updateTodo, deleteTodo } = require('../Controllers/TodoCtrl');

const TodoRouter = express.Router();


//http://localhost:3000/getall

TodoRouter.get('/getall', getAllTodo)
TodoRouter.post('/', createTodo)
TodoRouter.put('/updateTodo/:id', updateTodo)
TodoRouter.delete('/deleteTodo/:id', deleteTodo)

module.exports = TodoRouter;