const express = require('express');
const task = require('../controllers/task')
const router = express.Router();
router.post('/v1/addTask/:userId', task.addTask)
router.delete('/v1/deleteTask/:taskId', task.deleteTask)
router.put('/v1/editTask/:taskId', task.editTask)
module.exports = router;    