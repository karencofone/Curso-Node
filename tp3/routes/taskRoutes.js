const { Router } = require('express');
const taskController = require('../controllers/taskController');

const router = Router();

router.get('/tasks', taskController.getTask);
router.post('/tasks', taskController.saveTask);
router.get('/tasks/:id', taskController.getTaskById);
router.put('/tasks/:id', taskController.putTaskById);
router.put('/tasks/complete/:id', taskController.completeTask);
router.delete('/tasks/:id', taskController.deleteTaskById);

module.exports = router;