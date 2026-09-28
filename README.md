# StatSaksham (SIHPS_26101)
### AI-Powered Skill Intelligence & Personalized Learning Platform for MoSPI Official Statistics Workforce

**StatSaksham** is an enterprise-grade capacity building and skill intelligence platform designed specifically for the **Ministry of Statistics and Programme Implementation (MoSPI)** and the **National Statistical Systems Training Academy (NSSTA)**.

---

## 🌟 Key Features

1. **AI-Driven Competency Matrix & Gap Diagnostics:**
   - Real-time mapping against MoSPI official statistical benchmarks (PLFS, CPI, SNA 2008 / GVA, IIP, Survey Sampling).
   - Automated deficit calculation flagging priority areas for cadre progression.

2. **Dual-Track Learning Recommendations:**
   - **iGOT Karmayogi:** Direct alignment with competency-based digital micro-courses.
   - **NSSTA Programmes:** Residential workshops, calendar trainings, and field immersion modules.

3. **AI MCQ & Assessment Generation:**
   - Ingestion and semantic parsing of official Ministry manuals and circulars.
   - Automatic generation of multiple-choice questions with MoSPI manual citations.
   - Faculty approval and rejection workflow.

4. **Interactive Role-Based Dashboards:**
   - **Statistical Officer / Employee:** Profile, competency progress, quiz attempts, and learning roadmap.
   - **Trainer / Faculty:** Ingestion pipeline, question bank curation, and learner analytics.
   - **Administrator:** Division-wide competency heatmap (NSSO, PSD, NAD, FOD, ESD, CPD) and future skills forecast.

---

## 🛠️ Tech Stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS, Lucide Icons, Recharts, Zustand.
- **Backend:** Node.js, Express, TypeScript, JWT Authentication, Helmet, Cors, Prisma (optional).
- **Architecture:** Decoupled RESTful API with unified SPA production hosting support.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18+ recommended)
- npm

### 1. Clone & Install
```bash
git clone https://github.com/Tarun-Gajjalwar/SIHPS_26101.git
cd SIHPS_26101
```

### 2. Start Backend
```bash
cd backend
npm install
npm run dev
# Backend runs on http://localhost:3001
```

### 3. Start Frontend
```bash
cd ../frontend
npm install
npm run dev
# Frontend runs on http://localhost:5173
```

---

## 🔑 Demo Access Credentials

| Role | Email | Password |
|---|---|---|
| **Statistical Officer** | `employee@statintel.demo` | `demo123` |
| **NSSTA Faculty / Trainer** | `trainer@statintel.demo` | `demo123` |
| **MoSPI Administrator** | `admin@statintel.demo` | `demo123` |

*Note: One-click quick login buttons are also available on the login page.*

---

## 📄 License
Developed for Smart India Hackathon / MoSPI Innovation.
