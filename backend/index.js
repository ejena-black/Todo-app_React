require('dotenv').config({path: __dirname + '/.env'});
const express = require('express');
const app = express()

// parse request body
app.use(express.json())

// require routes
const todoRoutes = require('./routes/todoRoute')


// use routes
app.use('/api/todos', todoRoutes)


app.get('/', (req, res) => {
    res.send('HOME')
})


app.listen(process.env.PORT, () => {
    console.log(`server running on ${process.env.PORT}`)
})