import express from 'express';
import tasksController from '../controllers/taskController.js';

const route = express.Router();

route.get('/tasks', tasksController.getAll);
route.post('/tasks', tasksController.create);
route.put('/tasks/:id', tasksController.update);
route.delete('/tasks/:id', tasksController.delete);

export default route;