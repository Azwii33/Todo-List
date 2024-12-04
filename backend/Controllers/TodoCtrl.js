const Todo = require("../Model/Todo");

const createTodo = async(req,res) => {
    const { message } = req.body;

    if (req.body.message === "") {
        return res.status(401).json({ errorMessage: "Message cannot be empty"});
    }

    //Validation :Check if empty or doesn't meet the length requirements
    if (!message || message.length < 4 || message.length > 20) {
        return res.status(400).json({ errorMessage: "Message must be between 4 and 20 characters"});
    }

    try {
        const addTodo = await Todo.create({ message });
        res.status(200).json({success:"created", data: addTodo});
    } catch (error) {
        res.status(500).json({ error: "Internal Server Eroor"});
    }
};

const getAllTodo = async (req, res) =>{
    try {
        const getTodo = await Todo.find({});
        res.status(200).json({data: getTodo});
    } catch (error) {
        console.log(error);
        
    }
};

//when ypu see an empty {} objecct passed to the .find() method, it means that the function is requesting all the
//documents from the collection.

const deleteTodo = async (req, res) => {
    try {
        const deleted = await Todo.findByIdAndDelete(req.params.id);
        if (deleted) {
            res.status(200).json({ success: "deleted" });
        } else {
            res.status(404).json({ error: "Todo not found" });
        }
    } catch (error) {
        console.error("Error deleting todo:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


//findByIdAllDelete(): This is a Mongoose method that performs two actions in one step;
//find a document bt its _id field.
//Delete that document from the collection.

//req.params.id refers to the ID of the Todo item that you want to delete, which is passed in the URL,
//For example, if the route is / delete/ :id, req.params.id will contain the value of that id.

//A client makes a request to an endpoint like:
//DELETE /todo/12345abcdef
//Where 12345abcdef is the ID of the Todo item to be deleted.

//Route Handler:
// The ID (12345abcdef) gets assigned to req.params.id.

//Mongoose Operation:
// findByIdAllDelete(req,params.id) runs and looks for the document with Id:12345abcdef in the MongoDB collection.


//Delete Outcome:
//If found, the document is deleted and returned to the deleted variable.
//If not found, deletd will be null.

const updateTodo = async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            {
                message:req.body.message,
            },
            {new: true }
        );
        if (updateTodo) {
            res.json({ success : "updated", data: updateTodo });
        } else {
            res.status(404).json({ error: "Todo not found"});
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

//{ new: true} : This option tells Mongoose to return the updated document instead of the old one, 
// Without { new: true }, Mongoose would return the document as it was before the update.
//This endures that newly updated version of the document is returned
module.exports = {
    createTodo,
    getAllTodo,
    deleteTodo,
    updateTodo,
};