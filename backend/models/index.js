const mongoose = require('mongoose');

// enable mongoose debug mode for development
mongoose.set('debug', true)

// connection to database
mongoose.connect('mongodb://localhost/todo-app_react')

// enabling promises for mongodb
// mongoose.Promise = Promise

module.exports.User = require('./userModel');
module.exports.Todo = require('./todoModel')