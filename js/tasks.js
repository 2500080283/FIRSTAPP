// Tasks & Notes Manager
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
                <span class="title">${task.text}</span>
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

function addAppTask() {
    const text = taskInputEl.value.trim();
    if (!text) return;
    appTasks.push({
        id: Date.now(),
        text,
        priority: taskPriorityEl.value,
        done: false
    });
    taskInputEl.value = '';
    saveTasks();
    renderTasks();
}

window.toggleAppTask = function(id) {
    const t = appTasks.find(x => x.id === id);
    if (t) {
        t.done = !t.done;
        saveTasks();
        renderTasks();
    }
};

window.deleteAppTask = function(id) {
    appTasks = appTasks.filter(x => x.id !== id);
    saveTasks();
    renderTasks();
};

document.getElementById('addTaskBtn').onclick = addAppTask;
taskInputEl.onkeydown = (e) => { if (e.key === 'Enter') addAppTask(); };

// Notes auto-save
const notePad = document.getElementById('notesPad');
if (notePad) {
    notePad.value = localStorage.getItem('devsprint_notes') || "Welcome to your DevSprint study notes!\n\nUse this area to draft project ideas, summarize lectures, or keep quick formulas handy.";
    notePad.addEventListener('input', () => {
        localStorage.setItem('devsprint_notes', notePad.value);
    });
}

renderTasks();
