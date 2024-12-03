const express = require('express')
const router = express.Router()
const TaskController = require('../controllers/taskController')

router.post('/create', TaskController.createTask)
router.get('/api', TaskController.getTasks)
router.delete('/remove/:id', TaskController.deleteTask)
router.put('/update/:id', TaskController.updateTask)
router.put("/change", TaskController.updateOrder);
module.exports = router
