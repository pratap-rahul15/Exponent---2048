
# 🎮 Exponent — 2048

**Exponent - 2048** is a modern, polished web version of the classic 2048 puzzle game - rebuilt from scratch with a full-stack architecture using **React + Tailwind CSS** on the frontend and **Express.js** on the backend.  

The goal remains simple yet addictive - slide tiles to combine matching numbers and reach **2048** -  but with Exponent, the experience is elevated through **premium UI, smooth animations, sound effects, haptic feedback, and persistent leaderboard tracking.**

This project showcases a blend of **game logic design**, **state management**, and **responsive UI engineering**, demonstrating functional and interactive front-end development paired with a clean, modular backend.


###  Visit the game at 🎮 your laptop or Mobile phone

https://exponent-2048.vercel.app/

## ✨ Features


- 🎨 **Modern Glassmorphic UI** — built with Tailwind CSS, responsive for desktop and mobile.  

- 📱 **Mobile-Friendly Experience** — swipe gestures and haptic feedback enhance gameplay on touch devices.  

- 🔊 **Immersive Feedback** — custom move/merge sounds and confetti animation for winning moments.  

- 📈 **Persistent Leaderboard** — store and display top scores with player names.  

- 🔁 **Configurable Grid Size** — choose different board sizes (4x4, 5x5, 6x6).  

- 💾 **Backend Integration** — Express API for saving and fetching leaderboard data.  

-  ⚡ **Optimized for Speed** — lightweight, reactive frontend and efficient backend REST endpoints.  



## 🧩 Game Rules

- **Slide tiles** using arrow keys, swipe gestures, or on-screen controls.  

-  **Merge matching tiles** — when two tiles with the same number touch, they combine into one (`2 + 2 = 4`). 

-  After each valid move, a **new tile (2 or 4)** spawns in a random empty space.  

-  The **goal** is to reach the **2048** tile -  you win instantly when you do!  

- The **game ends** when there are no valid moves left.  

-  Your **score increases** with every merge, and you can **save** it to the leaderboard.  

## ⚙️ How it Works (Internal Workflow)

-  The **React frontend** handles all user interaction, animations, and game logic in-memory using functional updates.  

-  When a player finishes or chooses to save a score, the **frontend sends a POST request** to the backend API (`/scores`). 

-  The **Express.js backend** stores scores in a persistent JSON file (on Render’s mounted volume) and exposes endpoints to fetch and update leaderboard data. 

- The **frontend fetches** top scores from the backend and dynamically updates the leaderboard UI.  

- **State synchronization** ensures the game progress, best scores, and settings (like player name) persist locally across sessions.

## 🛠️ Tech Stack

### Backend 

- 🟢 Node.js + Express.js

- 🧩 CORS-enabled REST APIs

- 🗂️ JSON-based persistent storage

- 🧰 Deployed on **Render.com**

### Frontend

- ⚛️ React.js (Vite)

- 💨 Tailwind CSS

- 🎞️ Framer Motion (animations)

- 🔔 React Hot Toast (notifications)

- 📱 React Swipeable (mobile gestures)

- 🎧 Custom Sound + Vibration Hooks


### **Deployment**

- 🌐 Frontend: **Vercel**

- ⚙️ Backend: **Render**

- 🧾 Data Persistence: Mounted volume (`/opt/render/project/src/data/scores.json`)

### 🖥️ Local Setup (Clone & Run)

Follow these steps to run **Exponent - 2048** locally:

1️⃣ Clone the Repository

```
git clone https://github.com/pratap-rahul15/Exponent---2048

cd Exponent-2048

```

2️⃣ Setup Environment Variables

**Create .env in your frontend/ folder:**

```
VITE_API_URL=http://localhost:4000

```

3️⃣ Setup Backend

```
cd backend
npm install
npm run dev

```

Backend runs by default on http://localhost:4000

4️⃣ Setup Frontend

```
cd ../frontend
npm install
npm run dev

```

5️⃣ Run locally:
```
cd backend
npm install
npx prisma generate
npx prisma db push
npm run dev

Backend runs at → http://localhost:4001

```

6️⃣ Run Frontend
```
cd ../frontend
npm install
npm run dev

Frontend runs at → http://localhost:5173

```

## 🎉 Verdict

**Exponent - 2048**  **reimagines a timeless puzzle** with a professional-grade, interactive, and mobile-friendly interface.

It highlights proficiency in **React state management, Express API design, and end-to-end deployment workflows** - all while delivering a visually elegant, responsive gaming experience.

From dynamic gameplay to real-time leaderboards, this project reflects the craftsmanship behind building a complete, **production-ready full-stack web application.**

<img width="1890" height="1080" alt="image" src="https://github.com/user-attachments/assets/a022a9cb-0ba1-41d0-9c32-b9db7e228c59" />

<img width="1898" height="1080" alt="image" src="https://github.com/user-attachments/assets/2fcd4e1e-48fd-4eaf-82ae-fbc12757b040" />

<img width="456" height="917" alt="image" src="https://github.com/user-attachments/assets/0162c2d5-ccbd-46f5-8c66-0f1d5c3df53a" />




Made with ❤️ by Rahul Pratap Singh
