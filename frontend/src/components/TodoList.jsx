import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiOutlineDelete } from "react-icons/ai"; 
import { AiFillEdit } from "react-icons/ai"; 
import { toast } from 'react-toastify';

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [isEditing, setIsEditing] =useState(false);
    const [currentTodo, setCurrentTodo] = useState({_id: null, message: ''});
  
    const getAllTodos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/todolist/getall');
        setTodos(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      getAllTodos();
    }, []);
  
    //The useEffect hook is an essential part of this React component. It is used to perform side effects in functional
    //components. such as fetching data, subscribing to events, or manually updating the DOM.
  
    //In this component, the useEffect is used to fetch the initial list of to-dos from the backend when the component
    //is first rendered.
  
    // In this case, getAllTodos() is called inside this function to fetch the list of to-dos.
    
    //The empy array ([]) is the dependency array.
    //It specifies when the effect should re-run:
    //An empty array means the effect will run only once after the initial render of the component.
    //If dependencies are added (e.g. , [todos]), the effect will run every time those dependencies change.
  
    const handleDelete = async (id) => {
      try {
        const result = await axios.delete(`http://localhost:5000/todolist/deleteTodo/${id}`);
        if (result.data.success === 'deleted') {
          toast.success('Todo deleted successfully!');
        getAllTodos();
       }
      } catch (error) {
        console.error(error);
        toast.error('Failed to delete todo.');  
      }
    };
  
    const handleEditInputChange = (e) => {
      setCurrentTodo({ ...currentTodo, message: e.target.value});
    };
    //{ ...currentTodo} means create a new object and copy all properties of currentTodo into it.
  
    //Example workflow
    //Initial State:
  
    //isEditing = false
    //currentTodo = {_id: null, message:""}
    //The user is not editing any to-do yet.
  
    //User Clicks the edit Button for a to-do: Let's say the user clicks the Edit button for the to-do:
  
    //{_id:'123', message:'Buy groceries'}
    //handleEdit is called:
  
    //handle edit({_id: '123' , message:'Buy groceries'});
    //setIsEditing (true) changes isEditing to true.
    //setCurrentTodo({_id :'123' message:'Buy groceries'}) updates curren todo to:
  
    // ({_id: '123' , message:'Buy groceries'})
    //UI Updates:
  
    //The components detects isEditing = true and switches to the edit view.
    //The input field is pre-filled with the text 'Buy groceries' from currentTodo.message.
  
    const handleEdit = (todo) => {
      setIsEditing(true);
      setCurrentTodo({_id: todo._id , message:todo.message});
    };
  
    const handleUpdate = async () => {
      //Validate the message before handling
      if (currentTodo.message.length <4 || currentTodo.message.length >20) {
        toast.error('Message must be between 4 and 20 characters.');
        return; //Block the update if validation fails
      }
      try {
        const result = await axios.put(`http://localhost:5000/todolist/updateTodo/${currentTodo._id}`,{
          message: currentTodo.message
        });
        if (result.data.success === 'updated') {
          toast.success('Todo updated successfully!');
          getAllTodos();
          setIsEditing(false);
          setCurrentTodo({_id: null, message:''});
        }
      } catch (error) {
        console.error(error);
        toast.error('Failed to update todo.');
        
      }
    };
  
    const handleCancleEdit = () => {
      setIsEditing(false);
      setCurrentTodo({_id: null, message:''});
    };
  return (
    <div className="text">
    {isEditing ? (
      <div>
        <input type="text" value={currentTodo.message} onChange={handleEditInputChange}/>
        <button onClick={handleUpdate}>Update</button>
        <button onClick={handleCancleEdit}>Cancel</button>
      </div>
    ):(
      <ul>{todos.map((todo) => (
        <li key={todo._id}>{todo.message}
        <AiFillEdit className="icon" onClick={()=>handleEdit(todo)}/>
        <AiOutlineDelete className="icon " onClick={()=>handleDelete(todo._id)} />  
        </li>
      ))}
      </ul>
    )}
  </div>
);
};

export default TodoList
