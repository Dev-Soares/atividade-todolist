import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const TASKS_FILE = path.join(__dirname, '../../tasks.json')

async function readTasks() {
  try {
    const data = await fs.readFile(TASKS_FILE, 'utf8')
    return JSON.parse(data)
  } catch (err) {
    return []
  }
}

async function writeTasks(tasks) {
  await fs.writeFile(TASKS_FILE, JSON.stringify(tasks, null, 2))
}

const taskService = {
  async getAll() {
    const tasks = await readTasks()
    return tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  },

  async create(data) {
    const { title, description } = data
    const tasks = await readTasks()
    
    const newTask = {
      id: tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1,
      title,
      description: description || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    tasks.push(newTask)
    await writeTasks(tasks)
    return newTask
  },

  async update(id, data) {
    const { title, description } = data
    const tasks = await readTasks()
    const task = tasks.find(t => t.id === Number(id))
    
    if (!task) throw new Error('Task not found')
    
    task.title = title
    task.description = description || null
    task.updatedAt = new Date().toISOString()
    
    await writeTasks(tasks)
    return task
  },

  async delete(id) {
    const tasks = await readTasks()
    const filtered = tasks.filter(t => t.id !== Number(id))
    
    if (filtered.length === tasks.length) throw new Error('Task not found')
    
    await writeTasks(filtered)
  }
}

export default taskService