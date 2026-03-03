# ⚔️ Feek Nafas
> **The E-Sports of Competitive Programming.**

![Project Status](https://img.shields.io/badge/Status-In%20Development-orange?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Stack-React%20|%20Supabase%20|%20TypeScript-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Feek Nafas** (Arabic for *"Do you have breath/stamina?"*) is a real-time competitive programming platform that turns algorithm solving into a high-stakes head-to-head battle. Inspired by "Lockout" matches, it allows developers to compete 1v1 or in teams to solve Codeforces problems faster than their opponents.

Unlike traditional contests, **Feek Nafas** focuses on the adrenaline of live, direct competition with a cyberpunk, gamified UI.

---

## 📸 Screenshots
*(Add your screenshots here later)*
| **The Arena** | **Lobby** |
|:---:|:---:|
| ![Arena UI](./screenshots/arena.png) | ![Lobby UI](./screenshots/lobby.png) |

---

## 🚀 Key Features

* **1v1 Real-Time Battles:** Challenge a friend or get matched instantly. First to solve wins.
* **Live Scoreboard:** Real-time updates using Supabase Realtime. See your opponent's status instantly.
* **Fair Play Referee:** Server-side validation using **Supabase Edge Functions** ensures no client-side cheating.
* **Smart Matchmaking:** Filters problems by rating (800 - 3000) to ensure fair fights.
* **Cyberpunk UI:** A dark-mode, neon-styled interface designed for focus and immersion.
* **Codeforces Integration:** Fetches problems and verifies submissions directly from the Codeforces API.

---

## 🛠️ Tech Stack

This project uses a modern, serverless architecture to ensure speed and scalability.

### **Frontend**
* **Framework:** [React](https://react.dev/) (v18+)
* **Build Tool:** [Vite](https://vitejs.dev/) (with **SWC** for speed)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** CSS Modules / Custom Cyberpunk Design System

### **Backend (BaaS)**
* **Database:** [Supabase](https://supabase.com/) (PostgreSQL)
* **Real-Time:** Supabase Realtime (WebSockets for game state)
* **API Logic:** Supabase Edge Functions (Deno/TypeScript) - *Acts as the secure Referee.*

### **External APIs**
* **Codeforces API:** Used to fetch problem sets and check user submission verdicts.

---

## 🏗️ Architecture Overview

1.  **Match Creation:** User A creates a lobby. Supabase creates a row in the `matches` table.
2.  **Problem Selection:** The app fetches a random problem from Codeforces based on the selected difficulty.
3.  **The Race:** Both players see the problem link.
4.  **Verification (The Referee):**
    * Instead of the frontend checking the winner (which is insecure), a **Supabase Edge Function** runs in the background.
    * It polls the Codeforces API: `GET /user.status?handle={player_handle}`.
    * If it finds an `OK` verdict for the current problem, it updates the database.
5.  **Game Over:** Supabase Realtime pushes the "Winner" update to both clients instantly.

---

## ⚡ Getting Started

### Prerequisites
* Node.js (v18 or higher)
* npm or yarn
* A free [Supabase](https://supabase.com/) account.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/yourusername/feek-nafas.git](https://github.com/yourusername/feek-nafas.git)
    cd feek-nafas
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Create a `.env` file in the root directory and add your Supabase keys:
    ```env
    VITE_SUPABASE_URL=your_supabase_project_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Database Setup:**
    Run the SQL scripts located in `supabase/schema.sql` in your Supabase SQL Editor to create the necessary tables (`matches`, `users`, etc.).

5.  **Run the App:**
    ```bash
    npm run dev
    ```
    Open `http://localhost:5173` to view it in the browser.

---

## 🔮 Roadmap

- [x] Basic 1v1 Match Logic
- [ ] User Authentication (Supabase Auth)
- [ ] Elo/Rating System
- [ ] "Spectator Mode" for live viewing
- [ ] Team Battles (2v2)

---

## 🤝 Contributing

Contributions are welcome!
1.  Fork the project.
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

**Built with ❤️ and ☕ by [Bishoy Mina]**