/**
 * author: Gabriel Diaconu
 * date: January 2024
 * purpose: uses the 'mongoose' library to interact with MongoDB. It defines a schema for a 'Todo' model with fields for task description ('task') and a boolean indicator of completion ('done'), set to a default value of false. The schema is then used to create a 'TodoModel' associated with the MongoDB collection named 'todos'. Finally, the TodoModel is exported for accessibility in other files.
 * **/

// Importing the 'mongoose' library, which allows us to interact with MongoDB
const mongoose = require('mongoose');

// Creating a new mongoose schema for our 'Todo' model
const TodoSchema = new mongoose.Schema({
    // Defining a field 'task' of type String to store the task description
    task: String,
    
    // Defining a field 'done' of type Boolean with a default value of false
    done: {
        type: Boolean,
        default: false
    }
});

// Creating a TodoModel using the TodoSchema, with the collection name 'todos'
const TodoModel = mongoose.model("todos", TodoSchema);

// Exporting the TodoModel to make it accessible in other files
module.exports = TodoModel;
