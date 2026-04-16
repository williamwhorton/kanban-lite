import { Router } from 'express';
import {getAllTasks, getTaskById, createTask, updateTask, deleteTask, moveTask} from '../services/taskService';

const router = Router();

router.get('/', (req, res, next) => {
    getAllTasks().then(tasks => res.send(tasks));
});
router.get('/:id', (req, res, next) => {
    getTaskById(parseInt(req.params.id)).then(task => res.send(task));
});

router.post('/', (req, res, next) => {
    createTask(req.body).then(task => res.send(task));
});

router.put('/:id', (req, res, next) => {
    updateTask(req.body).then(task => res.send(task));
});

router.put('/move/:id', (req, res, next) => {
    moveTask(parseInt(req.params.id), req.body.status).then((task: any) => res.send(task));
});

router.delete('/:id', (req, res, next) => {
    deleteTask(parseInt(req.params.id)).then(() => res.sendStatus(204));
});

export default router;