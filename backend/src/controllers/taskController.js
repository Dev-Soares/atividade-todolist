import taskService from '../services/taskService.js';

const taskController = {
    async getAll(req, res) {
        const tasks = await taskService.getAll();
        res.status(200).json({ message: 'Get all tasks', tasks });
    },

    async create(req, res) {
        const { title, description } = req.body;
        const task = await taskService.create({ title, description });
        res.status(201).json({ message: 'Task created', task });
    },

    async update(req, res) {
        const { id } = req.params;
        const { title, description } = req.body;
        const task = await taskService.update(id, { title, description });
        res.status(200).json({ message: 'Task updated', task });
    },

    async delete(req, res) {
        const { id } = req.params;
        await taskService.delete(id);
        res.status(200).json({ message: 'Task deleted' });
    }

}

export default taskController;