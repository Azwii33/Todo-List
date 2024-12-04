import React, { useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios'

function AddTodo() {
  const [message, setMessage] = useState('');

  const createTodo = async () => {
    //Validation message
    if (message === '') {
      toast.error('Cannot add an empty message');
      return;
    }

    if (message.length <4 || message.length > 20) {
      toast.error('Message must be between 4 and 20 characters');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/todolist',{
        message: message,
      });
      if (response.data.success === 'created') {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
      
    }
  };
  return (
    <div className='container'>
      <input type="text" placeholder='Add task here...' onChange={(e) => setMessage(e.target.value)} />
      <button onClick={createTodo} className='btn'>ADD</button>
    </div>
  );
}

export default AddTodo

