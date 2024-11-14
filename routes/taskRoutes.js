const express = require('express')
const router = express.Router()
const TaskController = require('../controllers/taskController')

router.post('/create', TaskController.createTask)
router.get('/', TaskController.returnTasks)

module.exports = router