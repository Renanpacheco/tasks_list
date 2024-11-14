const express = require('express')
const router = express.Router()
const TaskController = require('../controllers/taskController')

router.post('/create', TaskController.createTask)
router.get('/', TaskController.returnTasks)
router.delete('/remove/:id', TaskController.deleteTask)

module.exports = router