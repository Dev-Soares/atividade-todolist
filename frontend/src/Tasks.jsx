import { useEffect, useState } from 'react'

const API = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export default function Tasks() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editTitle, setEditTitle] = useState('')
  const [editDescription, setEditDescription] = useState('')

  async function load() {
    const res = await fetch(`${API}/tasks`)
    const data = await res.json()
    setTasks(data.tasks || [])
  }

  useEffect(() => { load() }, [])

  async function handleCreate(e) {
    e.preventDefault()
    await fetch(`${API}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description })
    })
    setTitle('')
    setDescription('')
    load()
  }

  async function handleDelete(id) {
    await fetch(`${API}/tasks/${id}`, { method: 'DELETE' })
    load()
  }

  function startEdit(t) {
    setEditingId(t.id)
    setEditTitle(t.title)
    setEditDescription(t.description || '')
  }

  async function submitEdit(e) {
    e.preventDefault()
    await fetch(`${API}/tasks/${editingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: editTitle, description: editDescription })
    })
    setEditingId(null)
    setEditTitle('')
    setEditDescription('')
    load()
  }

  function cancelEdit() {
    setEditingId(null)
    setEditTitle('')
    setEditDescription('')
  }

  return (
    <div className="tasks">
      <form className="task-form" onSubmit={handleCreate}>
        <input className="input" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} required />
        <input className="input" placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
        <button className="btn primary" type="submit">Create</button>
      </form>

      <ul className="task-list">
        {tasks.map(t => (
          <li key={t.id} className="task-item">
            {editingId === t.id ? (
              <form className="edit-form" onSubmit={submitEdit}>
                <input className="input" value={editTitle} onChange={e=>setEditTitle(e.target.value)} required />
                <input className="input" value={editDescription} onChange={e=>setEditDescription(e.target.value)} />
                <div className="controls">
                  <button className="btn primary" type="submit">Save</button>
                  <button className="btn" type="button" onClick={cancelEdit}>Cancel</button>
                </div>
              </form>
            ) : (
              <div className="task-view">
                <div>
                  <strong className="task-title">{t.title}</strong>
                  <div className="task-desc">{t.description}</div>
                </div>
                <div className="controls">
                  <button className="btn" onClick={()=>startEdit(t)}>Edit</button>
                  <button className="btn danger" onClick={()=>handleDelete(t.id)}>Delete</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
