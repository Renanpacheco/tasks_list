const express = require("express");
const conn = require("./db/conn");
const cors = require('cors')


const port = 5000;
const app = express();

//model
const Task = require('./models/Task');

//routes
const taskRoutes = require('./routes/taskRoutes');

//import controllers
const taskController = require('./controllers/taskController');

//config json response
app.use(express.json());
const options = {origin: 'http://localhost:3000', credential: 'true', optionsSuccessStatus: 200}
app.use(cors(options))

//use of routes
app.use('/api', taskRoutes);

conn.sync().then(() => {
    app.listen(port);
}).catch(err => console.log(err))
