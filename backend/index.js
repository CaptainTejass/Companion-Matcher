const express = require('express');
const cors = require('cors');
const pool = require('./db');
const app = express();

app.use(cors());
app.use(express.json());

// POST /users
app.post('/users', async (req, res) => {
  const { name, age, interests } = req.body;
  const result = await pool.query(
    'INSERT INTO users (name, age, interests) VALUES ($1, $2, $3) RETURNING *',
    [name, age, interests]
  );
  res.status(201).json(result.rows[0]);
});

// GET /matches/:username
app.get('/matches/:username', async (req, res) => {
  const username = req.params.username;
  const { rows: [user] } = await pool.query('SELECT * FROM users WHERE name = $1', [username]);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const { rows: users } = await pool.query('SELECT * FROM users WHERE name != $1', [username]);

  const matches = users.filter(u => {
    const common = u.interests.filter(i => user.interests.includes(i));
    return common.length >= 2;
  });

  res.json(matches);
});


// PATCH /users/:username/shortlist
app.patch('/users/:username/shortlist', async (req, res) => {
  const username = req.params.username;
  const { matchName } = req.body;
  try {
    // Get current user and match user
    const { rows: [currentUser] } = await pool.query('SELECT * FROM users WHERE name = $1', [username]);
    const { rows: [matchUser] } = await pool.query('SELECT * FROM users WHERE name = $1', [matchName]);
    if (!currentUser || !matchUser) return res.status(404).json({ message: 'User not found' });
    // Calculate common interests
    const userInterests = currentUser.interests || [];
    const matchInterests = matchUser.interests || [];
    const common = userInterests.filter(i => matchInterests.includes(i));
    if (common.length < 2) {
      return res.status(400).json({ message: 'Cannot shortlist: less than 2 common interests.' });
    }
    // Get current connections
    let connections = currentUser.connections || [];
    if (!connections.includes(matchName)) {
      connections.push(matchName);
    }
    await pool.query('UPDATE users SET connections = $1 WHERE name = $2', [connections, username]);
    res.json({ message: 'Connection added', connections });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add connection' });
  }
});

app.listen(3001, () => console.log("Backend running on http://localhost:3001"));
