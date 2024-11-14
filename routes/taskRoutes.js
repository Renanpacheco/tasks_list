const express = require('express')
const router = express.Router()
const TaskController = require('../controllers/taskController')

router.post('/create', TaskController.createTask)
//
module.exports = router