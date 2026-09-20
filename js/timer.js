// Pomodoro Timer Controller
let timerInterval = null;
let timeLeft = 25 * 60;
let isRunning = false;
let currentMode = 'pomodoro';

const modes = {
    pomodoro: 25 * 60,
    short: 5 * 60,
    long: 15 * 60
};

const clockEl = document.getElementById('timerClock');
const toggleBtn = document.getElementById('timerToggle');

function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function updateClock() {
    clockEl.textContent = formatTime(timeLeft);
    document.title = `${formatTime(timeLeft)} - DevSprint`;
}

function startTimer() {
    if (isRunning) return;
    isRunning = true;
    toggleBtn.textContent = 'Pause';
    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateClock();
        } else {
            clearInterval(timerInterval);
            isRunning = false;
            toggleBtn.textContent = 'Start';
            alert('Focus interval complete! Great job.');
            resetTimer();
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    toggleBtn.textContent = 'Start';
}

function resetTimer() {
    pauseTimer();
    timeLeft = modes[currentMode];
    updateClock();
    document.title = 'DevSprint - Student Productivity Suite';
}

toggleBtn.onclick = () => {
    if (isRunning) pauseTimer();
    else startTimer();
};

document.getElementById('timerReset').onclick = resetTimer;

document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.onclick = () => {
        document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentMode = btn.dataset.mode;
        resetTimer();
    };
});

updateClock();
