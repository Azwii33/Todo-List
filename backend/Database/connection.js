// mongodb+srv://azweenaammi370:<db_password>@cluster0.tymnu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
const mongoose = require('mongoose')

function RunServer(){
    mongoose.connect('mongodb+srv://azweenaammi370:project-Azweena33@cluster0.tymnu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
    try {
        console.log('MongoDB connected');
        
    } catch (error) {
        console.log('Not connected');
        
    }
}

module.exports = RunServer;