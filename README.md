# 🪐 Offline Orbit

> **Offline Orbit** is an AI-powered, personalized, offline-first learning platform designed for rural communities and learners with intermittent connectivity. It identifies learning gaps through diagnostic assessments, recommends tailored recovery activities with explicit explanations, enables 100% offline learning (including standalone video playback with picture and sound), and seamlessly synchronizes progress when connectivity returns.

---

## 🌟 Core Product Flow & Positioning

Offline Orbit addresses learning recovery through a connected 7-step learning cycle:

```
Assess → Identify Concept Gap → Explain Recommendation → Practise → Save Offline → Sync → Measure Progress
```

---

## 👥 Demo Personas & Proof of Personalization

To prove that recommendations adapt dynamically to each learner's specific quiz history and interests, Offline Orbit provides pre-configured demo personas accessible via 1-click in the top navigation **"Select Demo Persona"** modal:

| Persona | Name | Role / Grade | Primary Interest | Diagnostic Performance & Gap | Tailored AI Recommendation |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Learner A** | **Aarav Sharma** | Grade 7 Rural Learner | Physics & Mathematics | Missed 2 questions on Equivalent Fractions & Two-Step Equations | *"You missed two questions about Equivalent Fractions, and your selected interest is Physics. Try this illustrated lesson on Two-Step Linear Equations & Fractions next."* |
| **Learner B** | **Priya Patel** | Grade 7 Rural Learner | Computer Science & AI | Missed 2 questions on Algorithmic Complexity (Big O Notation) | *"You missed two questions about Algorithmic Complexity, and your selected interest is Computer Science. Try this visual lesson on Big O Notation & Python Algorithms next."* |
| **Independent** | **Alex Rivera** | Self-Paced Learner | Biotechnology & Chemistry | Missed 1 question on Stomata Gas Exchange in Cellular Biology | *"You missed one question on Stomata gas exchange. Try this interactive lesson on Cellular Biology next."* |
| **Educator** | **Mr. Rajesh Kumar** | Grade 7 STEM Lead Teacher | Science & Tech | Manages Class 7A, inspects real synced student analytics and offline sync states | Classroom pulse dashboard with 6-digit room code join system, misconception heatmaps, and real-time chat with video attachments. |

---

## 🛠 Key Technical Capabilities

1. **Rule-Grounded & OpenAI Recommendation Engine:**
   - Evaluates each learner's diagnostic answer patterns, topic mastery scores, and preferred interest domains.
   - Provides clear, transparent explanation text for every recommendation (*"Why this recommendation?"*).
   - Server-side OpenAI API integration (`gpt-4o-mini`) with graceful local rule-based fallback when offline or without API keys. Never exposes API keys to client-side code.

2. **Offline-First Storage Architecture:**
   - **Service Worker:** Caches the full app shell for instant offline loading.
   - **IndexedDB (`offline_orbit_db` v2):** Stores downloaded lesson packs (`downloadedPacks`), offline standalone video Blobs (`downloadedVideos`), pending sync queue (`pendingSync`), and cached curriculum lists (`cachedLessons`).

3. **Multilingual Offline Video Player:**
   - Downloads complete WebM video Blobs with **full picture and sound** per supported language (English, Hindi, Tamil, etc.).
   - Plays 100% offline via HTML5 `<video controls>` without remote streaming or dummy placeholders.
   - Displays language selection, download progress (0% → 100%), file size (~2.4 MB), and delete control to free storage space.

4. **Reliable Idempotent Sync Manager:**
   - Stores offline quiz and game attempts with unique timestamps and quiz IDs.
   - Displays `"Saved on this device — waiting to sync"` status while offline.
   - Automatically syncs upon reconnection (or via manual **Sync Now** control).
   - Enforces backend deduplication to prevent duplicate attempts or score inflation on retries.

5. **Gamified STEM Knowledge Hub:**
   - Includes 7 interactive topic-linked game modes:
     - 🎯 *Diagnostic & Practice Quizzes* with misconception alerts and step-by-step follow-up retries.
     - 🧩 *Term & Definition Matching*.
     - ⚡ *Speed Category Sorter*.
     - 🃏 *Memory Pairs Flipping*.
     - 🗺️ *Unlockable Puzzle Paths*.
     - 🏆 *Boss Review Challenge*.
     - 🤝 *Cooperative Class Quests*.

6. **Teacher Portal & Analytics:**
   - Classroom dashboard with 6-digit room creation/join codes.
   - Class-level topic strengths and gaps.
   - Individual learner drill-down tracking Aarav vs Priya's synced score curves and offline sync status.
   - All charts (Recharts) render real attempt data.

---

## 🚀 Environment Setup & Quick Start

### 1. Environment Variables (`server/.env`)

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/offline_orbit?retryWrites=true&w=majority
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
JWT_SECRET=offline_orbit_jwt_secret_key_2026_super_secure
BREVO_API_KEY=xkeysib-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SENDER_EMAIL=noreply@offlineorbit.edu
```

*Note: If `MONGODB_URI` or `OPENAI_API_KEY` are not provided, Offline Orbit automatically initializes its built-in memory storage engine and rule-based fallback generator.*

### 2. Run Locally

```bash
# Install root dependencies
npm install

# Start backend server & frontend client concurrently
npm run dev
```

- **Frontend Application:** `http://localhost:3000`
- **Backend API Server:** `http://localhost:5000`

---

## 🧪 11-Step End-to-End Verification Guide

1. **Sign In & Demo Switching:** Click **"Select Demo Persona"** in the top navigation. Switch between **Aarav Sharma** (Math/Physics) and **Priya Patel** (CS/AI).
2. **Verify Personalization:** Notice how Aarav's home screen recommends *Algebra: Two-Step Linear Equations* due to his math gap and physics interest, while Priya's home screen recommends *Computer Science: Algorithms & Big O* due to her CS interest.
3. **Take Diagnostic Quiz:** Launch the **Grade 7 Diagnostic Assessment**. Answer questions to see real-time misconception feedback and follow-up retries.
4. **View Diagnostic Recovery Report:** On completion, observe topic-level strengths, areas to improve, identified misconceptions, and an explicit recommendation explanation box explaining why the recovery lesson was chosen.
5. **Launch Recovery Activity:** Click **"Launch Recommended Lesson"** or launch a topic-linked game (*Term Matching* or *Speed Sorter*).
6. **Download Offline Video & Pack:** Inside the lesson view, select a language pill (English/Hindi) and click **"Download Video File"**. Observe the download progress bar reach 100% and save a ~2.4 MB Blob to IndexedDB.
7. **Simulate Offline Mode:** Open Chrome DevTools Network tab and set to **Offline** (or disconnect Wi-Fi).
8. **Offline Video & Quiz Verification:**
   - Refresh or reopen the lesson page: The video plays **100% offline with full picture and sound**.
   - Complete a practice quiz offline: Result displays `"Saved locally on this device — waiting to sync"`.
9. **Reconnect & De-duplicated Sync:** Set network back to **Online** and click **"Sync Progress Now"**. Verify attempts sync cleanly to the server without duplicate entries.
10. **Verify Teacher Dashboard:** Switch demo persona to **Mr. Rajesh Kumar (Educator)**. View Class 7A analytics, inspect Aarav and Priya's real synced attempts, and verify progress charts.
11. **Verify Production Build:** Run `npm run build` in `client/` to verify zero compilation or bundle errors.

---

## ✅ Acceptance Criteria Status

- [x] **Distinct Recommendations:** Aarav Sharma (Physics/Math) and Priya Patel (CS/AI) receive different recommendations with explicit rationale text.
- [x] **Real Analytics Updates:** Quiz and game attempts update student score curves and mastery metrics dynamically.
- [x] **Offline Lessons & Games:** Lessons and 7 interactive game modes work completely offline from IndexedDB.
- [x] **Offline Video Playback:** Multilingual standalone videos play offline with picture and sound.
- [x] **Reliable De-duplicated Sync:** Offline queue retains attempts and syncs upon reconnection with server-side de-duplication.
- [x] **Teacher Dashboard Integration:** Reflects real synced student attempt activity and offline status.
- [x] **Clean Startup UI:** Professional light-themed interface (`#FAF9F6`, `#FFFFFF`, `#1E2229`, `#F95738`, `#0D9488`).
