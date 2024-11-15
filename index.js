const express = require("express");
const conn = require("./db/conn");

const port = 3000;
const app = express();

//model
const Task = require('./models/Task');

//routes
const taskRoutes = require('./routes/taskRoutes');

//import controllers
const taskController = require('./controllers/taskController');

//config json response
app.use(express.json());

conn.sync({force: true}).then(() => {
    app.listen(port);
}).catch(err => console.log(err))