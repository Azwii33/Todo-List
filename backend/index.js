const express = require('express');
const RunServer = require('./Database/connection');
const cors = require('cors');
const TodoRouter = require('./Routes/TodoRouter');

const app = express();
const port = 5000;


//json: javascript object notation
//used to transfer the data 

app.use(express.json());
app.use(cors())

RunServer()

app.use('/todolist', TodoRouter)

app.listen(port,()=> {
    console.log(`Server is running on ${port} port `);
    
})