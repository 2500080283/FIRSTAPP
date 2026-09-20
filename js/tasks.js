// Tasks & Notes Manager with Full-Stack Sync & LocalStorage Fallback
let appTasks = JSON.parse(localStorage.getItem('devsprint_tasks')) || [
    { id: 1, text: "Complete KL University Front-End Lab Experiments", priority: "high", done: true },
    { id: 2, text: "Review Operating Systems Chapter 3", priority: "med", done: false },
    { id: 3, text: "Prepare Database Schema for Web Project", priority: "high", done: false }
];

const tasksListEl = document.getElementById('tasksList');
const taskInputEl = document.getElementById('taskInput');
const taskPriorityEl = document.getElementById('taskPriority');
const totalTasksEl = document.getElementById('totalTasksCount');
const completedTasksEl = document.getElementById('completedTasksCount');

// Fetch latest from API on launch
async function syncFromBackend() {
    try {
        const res = await fetch('/api/tasks');
        if (res.ok) {
            const json = await res.json();
            if (Array.isArray(json.data) && json.data.length > 0) {
                appTasks = json.data;
                localStorage.setItem('devsprint_tasks', JSON.stringify(appTasks));
                renderTasks();
            }
        }
    } catch (e) {
        // Backend offline, keep localStorage data
    }
}

function saveTasks() {
    localStorage.setItem('devsprint_tasks', JSON.stringify(appTasks));
    updateStats();
}

function updateStats() {
    const completed = appTasks.filter(t => t.done).length;
    if (totalTasksEl) totalTasksEl.textContent = appTasks.length;
    if (completedTasksEl) completedTasksEl.textContent = completed;
}

function renderTasks() {
    tasksListEl.innerHTML = '';
    appTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-card ${task.done ? 'done' : ''}`;
        li.innerHTML = `
            <div style="display:flex; align-items:center; gap:12px;">
                <input type="checkbox" ${task.done ? 'checked' : ''} onchange="toggleAppTask(${task.id})">
                <span class="title">${escapeHtml(task.text)}</span>
            </div>
            <div style="display:flex; align-items:center; gap:10px;">
                <span style="font-size:11px; padding:2px 8px; border-radius:4px; text-transform:uppercase; font-weight:700; ${
                    task.priority === 'high' ? 'background:#ef4444; color:white;' :
                    task.priority === 'med' ? 'background:#f59e0b; color:white;' : 'background:#10b981; color:white;'
                }">${task.priority}</span>
                <button onclick="deleteAppTask(${task.id})" style="background:transparent; border:none; color:#ef4444; cursor:pointer; font-size:16px;">&times;</button>
            </div>
        `;
        tasksListEl.appendChild(li);
    });
    updateStats();
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

async function addAppTask() {
    const text = taskInputEl.value.trim();
    if (!text) return;

    const newTask = {
        id: Date.now(),
        text,
        priority: taskPriorityEl.value,
        done: false
    };

    appTasks.push(newTask);
    taskInputEl.value = '';
    saveTasks();
    renderTasks();

    // Async sync with API
    try {
        await fetch('/api/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: newTask.text, priority: newTask.priority })
        });
    } catch (e) {}
}

window.toggleAppTask = async function(id) {
    const t = appTasks.find(x => x.id === id);
    if (t) {
        t.done = !t.done;
        saveTasks();
        renderTasks();

        try {
            await fetch(`/api/tasks/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ done: t.done })
            });
        } catch (e) {}
    }
};

window.deleteAppTask = async function(id) {
    appTasks = appTasks.filter(x => x.id !== id);
    saveTasks();
    renderTasks();

    try {
        await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
    } catch (e) {}
};

document.getElementById('addTaskBtn').onclick = addAppTask;
taskInputEl.onkeydown = (e) => { if (e.key === 'Enter') addAppTask(); };

// Notes auto-save with backend sync
const notePad = document.getElementById('notesPad');
if (notePad) {
    notePad.value = localStorage.getItem('devsprint_notes') || "Welcome to your DevSprint study notes!\n\nUse this area to draft project ideas, summarize lectures, or keep quick formulas handy.";
    
    // Fetch latest note from server
    (async () => {
        try {
            const res = await fetch('/api/notes');
            if (res.ok) {
                const json = await res.json();
                if (json.data && json.data.content) {
                    notePad.value = json.data.content;
                    localStorage.setItem('devsprint_notes', notePad.value);
                }
            }
        } catch (e) {}
    })();

    let noteDebounce;
    notePad.addEventListener('input', () => {
        localStorage.setItem('devsprint_notes', notePad.value);
        clearTimeout(noteDebounce);
        noteDebounce = setTimeout(async () => {
            try {
                await fetch('/api/notes', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ content: notePad.value })
                });
            } catch (e) {}
        }, 1000);
    });
}

renderTasks();
syncFromBackend();
