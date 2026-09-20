# DevSprint - Student Study & Task Management Suite

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

> **Application**: DevSprint  
> **Author**: Ch. Prudhvi Raj  
> **Student ID**: 2500080283  
> **Department**: Computer Science & Engineering, KL University

---

## ⚡ Overview

**DevSprint** is a client-side productivity and study dashboard built for university students. It combines a customizable **Pomodoro Focus Timer**, an **Assignment and Task Board**, and an **Auto-saving Study Scratchpad** into a single cohesive, responsive interface with zero external runtime dependencies.

---

## ✨ Features

- ⏱️ **Pomodoro Focus Timer**: Work in 25-minute sprints with automatic breaks (5-minute short break, 15-minute long break).
- 📋 **Task & Assignment Tracker**: Organize college deliverables with high, medium, and low priority tags, completion checkboxes, and item removal.
- 📝 **Auto-Saved Study Notes**: Live scratchpad with persistence to browser `localStorage`.
- 📊 **Real-time Dashboard Metrics**: Dynamically displays completed vs pending tasks and focus session statistics.
- 📱 **Responsive Dark Mode Layout**: Built with modern CSS variables, flexbox, and CSS grid for seamless mobile and desktop usage.

---

## 🏗️ Architecture

```
FIRSTAPP/
├── index.html         # Application Shell & Tab Views
├── css/
│   └── app.css        # Dark theme design system & responsive styling
└── js/
    ├── timer.js       # Pomodoro countdown engine & notifications
    └── tasks.js       # Task state management & localStorage sync
```

---

## 🚀 Running Locally

```bash
# Clone the repository
git clone https://github.com/2500080283/FIRSTAPP.git

# Navigate to directory
cd FIRSTAPP

# Launch in default browser
start index.html
```

---

&copy; 2026 Ch. Prudhvi Raj (2500080283) • KL University
