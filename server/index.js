require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const db = require('./db');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  },
});

app.use(cors());
app.use(express.json());

// Initialize Database
db.initDB();

// --- API ROUTES ---

// App State (FunZone)
app.get('/api/state/funzone', async (req, res) => {
  try {
    const result = await db.query('SELECT value FROM app_state WHERE key = $1', ['funZoneEnabled']);
    const enabled = result.rows.length > 0 ? result.rows[0].value : false;
    res.json({ enabled });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/state/funzone', async (req, res) => {
  const { enabled } = req.body;
  try {
    await db.query(
      'INSERT INTO app_state (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = $2',
      ['funZoneEnabled', enabled]
    );
    io.emit('funzone-updated', { enabled });
    res.json({ success: true, enabled });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Problem Statements Release State
app.get('/api/state/problems-released', async (req, res) => {
  try {
    const result = await db.query('SELECT value FROM app_state WHERE key = $1', ['problemsReleased']);
    const released = result.rows.length > 0 ? result.rows[0].value : false;
    res.json({ released });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/state/problems-released', async (req, res) => {
  const { released } = req.body;
  try {
    await db.query(
      'INSERT INTO app_state (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = $2',
      ['problemsReleased', released]
    );
    io.emit('problems-released', { released });
    res.json({ success: true, released });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Teams
app.get('/api/teams', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM teams ORDER BY "teamNumber" ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/teams', async (req, res) => {
  const { id, teamNumber, teamName, problemStatementNumber } = req.body;
  try {
    await db.query(
      'INSERT INTO teams (id, "teamNumber", "teamName", "problemStatementNumber") VALUES ($1, $2, $3, $4)',
      [id, teamNumber, teamName, problemStatementNumber ?? null]
    );
    const newTeam = { id, teamNumber, teamName, problemStatementNumber: problemStatementNumber ?? null };
    io.emit('team-added', newTeam);
    res.json(newTeam);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/teams/:id', async (req, res) => {
  const { id } = req.params;
  const { teamNumber, teamName, problemStatementNumber } = req.body;
  try {
    await db.query(
      'UPDATE teams SET "teamNumber" = $1, "teamName" = $2, "problemStatementNumber" = $3 WHERE id = $4',
      [teamNumber, teamName, problemStatementNumber ?? null, id]
    );
    const updatedTeam = { id, teamNumber, teamName, problemStatementNumber: problemStatementNumber ?? null };
    io.emit('team-updated', updatedTeam);
    res.json(updatedTeam);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/teams/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM teams WHERE id = $1', [id]);
    io.emit('team-deleted', { id });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Marks
app.get('/api/marks', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM marks');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/marks', async (req, res) => {
  const { teamId, round, score } = req.body;
  try {
    if (score === null) {
      await db.query('DELETE FROM marks WHERE "teamId" = $1 AND round = $2', [teamId, round]);
    } else {
      await db.query(
        'INSERT INTO marks ("teamId", round, score) VALUES ($1, $2, $3) ON CONFLICT ("teamId", round) DO UPDATE SET score = $3',
        [teamId, round, score]
      );
    }
    const update = { teamId, round, score };
    io.emit('marks-updated', update);
    res.json(update);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- SOCKET.IO ---

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
