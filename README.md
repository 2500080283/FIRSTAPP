# DevSprint - Full-Stack Student Study & Productivity Suite

![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

> **Application**: DevSprint (Full-Stack Edition)  
> **Author**: Ch. Prudhvi Raj  
> **Student ID**: 2500080283  
> **Department**: Computer Science & Engineering, KL University

---

## ⚡ Overview

**DevSprint** is a full-stack student task, note-taking, and focus manager powered by a **Node.js + Express REST API** backend with persistent JSON database storage and automatic client-side synchronization.

---

## 📡 REST API Reference

Runs on `http://localhost:4000`:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Backend status check |
| `GET` | `/api/tasks` | Fetch all tasks from server database |
| `POST` | `/api/tasks` | Create new study task (`{ text, priority }`) |
| `PUT` | `/api/tasks/:id` | Update task completion status (`{ done }`) |
| `DELETE` | `/api/tasks/:id` | Remove task by ID |
| `GET` | `/api/notes` | Fetch latest study scratchpad notes |
| `PUT` | `/api/notes` | Auto-save scratchpad notes (`{ content }`) |

---

## 🏗️ Architecture

```
FIRSTAPP/
├── package.json       # Node.js configuration
├── server.js          # Express REST API server & static middleware
├── data/
│   ├── tasks.json     # Persistent task storage
│   └── notes.json     # Persistent study notes storage
├── index.html         # Application Shell & Tab Views
├── css/
│   └── app.css        # Dark theme design system & responsive styling
└── js/
    ├── timer.js       # Pomodoro countdown engine & notifications
    └── tasks.js       # Dual-sync client (Backend API + LocalStorage fallback)
```

---

## 🚀 Running the Server

```bash
# Clone the repository
git clone https://github.com/2500080283/FIRSTAPP.git

# Navigate to directory
cd FIRSTAPP

# Install dependencies
npm install

# Start the full-stack server
npm start
```

Open: **`http://localhost:4000`**

---

&copy; 2026 Ch. Prudhvi Raj (2500080283) • KL University
