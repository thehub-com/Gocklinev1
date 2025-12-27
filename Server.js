const express = require('express')
const cors = require('cors')
const { tokens } = require('./bot')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

// авторизация
app.post('/auth', (req, res) => {
  const { token } = req.body
  if (!tokens.has(token)) {
    return res.status(401).json({ error: 'Invalid token' })
  }

  const user = tokens.get(token)
  res.json(user)
})

// админка
app.get('/admin', (req, res) => {
  const token = req.headers.authorization
  const user = tokens.get(token)

  if (!user || user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden' })
  }

  res.json({
    users: [...tokens.values()],
    bans: [],
    logs: []
  })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log('GockLine server online')
})
