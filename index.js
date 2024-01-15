/**
 * author: Gabriel Diaconu
 * date: January 2024
 * purpose: creates an Express web server with MongoDB integration. It uses the 'cors' middleware for Cross-Origin Resource Sharing and defines endpoints for CRUD operations on a 'Todo' model. The MongoDB connection is established at 'mongodb://127.0.0.1:27017/test'. Endpoints include fetching all todos, updating a todo's completion status, deleting a todo, and adding a new todo. The server listens on port 3001 and logs a message when it starts. The 'TodoModel' is imported from './Models/Todo'.
 * **/


// Importing the 'express' library, which simplifies the creation of web servers
const express = require('express');

// Importing the 'mongoose' library for MongoDB interaction
const mongoose = require('mongoose');

// Importing the 'cors' middleware to handle Cross-Origin Resource Sharing
const cors = require('cors');

// Importing the TodoModel created in a separate file (assumed to be in './Models/Todo')
const TodoModel = require('./Models/Todo');

// Creating an instance of the express application
const app = express();

// Using the 'cors' middleware to enable cross-origin requests
app.use(cors());

// Using the 'express.json()' middleware to parse incoming JSON requests
app.use(express.json());

// Connecting to the MongoDB database at 'mongodb://127.0.0.1:27017/test'
mongoose.connect('mongodb://127.0.0.1:27017/test');

// Handling GET requests at the '/get' endpoint
app.get('/get', (req, res) => {
    // Querying the MongoDB using the TodoModel to retrieve all todos
    TodoModel.find()
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

// Handling PUT requests at the '/update/:id' endpoint
app.put('/update/:id', (req, res) => {
    // Extracting the 'id' parameter from the request parameters
    const { id } = req.params;
    
    // Updating a todo by setting its 'done' field to true
    TodoModel.findByIdAndUpdate({ _id: id }, { done: true })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

// Handling DELETE requests at the '/delete/:id' endpoint
app.delete('/delete/:id', (req, res) => {
    // Extracting the 'id' parameter from the request parameters
    const { id } = req.params;

    // Deleting a todo by its id
    TodoModel.findByIdAndDelete({ _id: id })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

// Handling POST requests at the '/add' endpoint
app.post('/add', (req, res) => {
    // Extracting the 'task' property from the request body
    const task = req.body.task;

    // Creating a new todo using the TodoModel
    TodoModel.create({
        task: task
    })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

// Starting the server on port 3001
app.listen(3001, () => {
    console.log("Server is Running");
});
