const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

const TASKS_FILE = path.join(__dirname, 'data', 'tasks.json');
const NOTES_FILE = path.join(__dirname, 'data', 'notes.json');

function readJSON(file, fallback) {
    try {
        if (!fs.existsSync(file)) return fallback;
        return JSON.parse(fs.readFileSync(file, 'utf8'));
    } catch (e) {
        return fallback;
    }
}

function writeJSON(file, data) {
    try {
        fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (e) {
        return false;
    }
}

// Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: 'online', service: 'DevSprint REST API', port: PORT });
});

// Tasks Endpoints
app.get('/api/tasks', (req, res) => {
    const tasks = readJSON(TASKS_FILE, []);
    res.json({ success: true, count: tasks.length, data: tasks });
});

app.post('/api/tasks', (req, res) => {
    const { text, priority } = req.body;
    if (!text || !text.trim()) {
        return res.status(400).json({ success: false, error: 'Task text is required' });
    }

    const tasks = readJSON(TASKS_FILE, []);
    const newTask = {
        id: Date.now(),
        text: text.trim(),
        priority: priority || 'med',
        done: false,
        createdAt: new Date().toISOString()
    };

    tasks.push(newTask);
    writeJSON(TASKS_FILE, tasks);
    res.status(201).json({ success: true, data: newTask });
});

app.put('/api/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const tasks = readJSON(TASKS_FILE, []);
    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({ success: false, error: 'Task not found' });
    }

    if (req.body.done !== undefined) task.done = Boolean(req.body.done);
    if (req.body.priority) task.priority = req.body.priority;
    if (req.body.text) task.text = req.body.text.trim();

    writeJSON(TASKS_FILE, tasks);
    res.json({ success: true, data: task });
});

app.delete('/api/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    let tasks = readJSON(TASKS_FILE, []);
    const filtered = tasks.filter(t => t.id !== id);

    if (filtered.length === tasks.length) {
        return res.status(404).json({ success: false, error: 'Task not found' });
    }

    writeJSON(TASKS_FILE, filtered);
    res.json({ success: true, message: 'Task deleted' });
});

// Notes Endpoints
app.get('/api/notes', (req, res) => {
    const notes = readJSON(NOTES_FILE, { content: '' });
    res.json({ success: true, data: notes });
});

app.put('/api/notes', (req, res) => {
    const { content } = req.body;
    const data = { content: content || '', updatedAt: new Date().toISOString() };
    writeJSON(NOTES_FILE, data);
    res.json({ success: true, data });
});

module.exports = app;

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`DevSprint Full-Stack Server running at http://localhost:${PORT}`);
    });
}
