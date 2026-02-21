import express from 'express'
import Database from 'better-sqlite3'
import cors from 'cors'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DB_PATH = path.join(__dirname, '../db/checkup.db')

const db = new Database(DB_PATH)
db.pragma('foreign_keys = ON')

// Auto-initialize DB on first run
const tableExists = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='users'").get()
if (!tableExists) {
  console.log('No DB found — running schema + seed...')
  db.exec(fs.readFileSync(path.join(__dirname, '../db/schema.sql'), 'utf8'))
  db.exec(fs.readFileSync(path.join(__dirname, '../db/seed.sql'), 'utf8'))
  console.log('DB initialized.')
}

const app = express()
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(path.join(__dirname, '../uploads')))

// POST /api/auth/login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body
  const user = db.prepare(
    'SELECT * FROM users WHERE user_email = ? AND password = ?'
  ).get(email, password)

  if (!user) return res.status(401).json({ error: 'Invalid email or password' })

  res.json({
    user_id: user.user_id,
    name: user.user_display_name,
    email: user.user_email,
    dob: user.user_dob,
    medicalField: user.medical_field,
    role: user.user_role,
  })
})

// POST /api/auth/register
app.post('/api/auth/register', (req, res) => {
  const { email, password, username, dob, medicalField } = req.body

  const existing = db.prepare('SELECT user_id FROM users WHERE user_email = ?').get(email)
  if (existing) return res.status(409).json({ error: 'Email already in use' })

  const result = db.prepare(
    'INSERT INTO users (user_email, user_display_name, password, user_dob, medical_field) VALUES (?, ?, ?, ?, ?)'
  ).run(email, username || email.split('@')[0], password, dob || null, medicalField || null)

  res.json({
    user_id: result.lastInsertRowid,
    name: username || email.split('@')[0],
    email,
    dob: dob || null,
    medicalField: medicalField || null,
    role: 'user',
  })
})

// PUT /api/users/:id
app.put('/api/users/:id', (req, res) => {
  const { name, email, dob, medicalField } = req.body
  const { id } = req.params

  db.prepare(
    'UPDATE users SET user_display_name = ?, user_email = ?, user_dob = ?, medical_field = ? WHERE user_id = ?'
  ).run(name, email, dob || null, medicalField || null, id)

  res.json({
    user_id: Number(id),
    name,
    email,
    dob: dob || null,
    medicalField: medicalField || null,
  })
})

app.listen(3001, () => console.log('Server running on http://localhost:3001'))
