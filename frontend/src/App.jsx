import './App.css'
import React from 'react'
import Header from './components/Header'
import AddTodo from './components/AddTodo'
import TodoList from './components/TodoList'
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from 'react-toastify'

const App = () => {
  return (
    <div>
      <Header/>
      <AddTodo/>
      <TodoList/>
      <ToastContainer/>
    </div>
  )
}

export default App
