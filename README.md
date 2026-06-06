# 🚀 CareerTwin AI — AI-Native Employability Ecosystem

> *"From Student → Builder → Professional → Lifelong Learner"*

CareerTwin  AI is an AI-powered career operating system designed for higher education institutions. It bridges the gap between academic learning and real-world employability by equipping students with live projects, AI-native skills, verified portfolios, mentor networks, and internship opportunities — all before graduation.

---

## 📌 Table of Contents

- [Problem Statement](#-problem-statement)
- [Our Vision](#-our-vision)
- [Core Features](#-core-features)
- [Platform Workflow](#-platform-workflow)
- [Tech Stack](#-tech-stack)
- [Business Model](#-business-model)
- [Product Roadmap](#-product-roadmap)
- [Team & Contributions](#-team--contributions)
- [Getting Started](#-getting-started)
- [Folder Structure](#-folder-structure)
- [License](#-license)

---

## ❗ Problem Statement

Today's higher education system is built around exams, attendance, degrees, and static curriculum. However, the job market is rapidly shifting toward AI-assisted and collaborative work, skills and portfolios over degrees, continuous learning and adaptability, and human-AI collaboration.

### Key Gaps We Address

| Problem | Impact |
|---|---|
| Degree ≠ Employability | Graduates lack practical experience and strong portfolios |
| No Industry Exposure | Students rarely interact with founders or engineers until final year |
| No Personalized Career Path | Everyone follows the same curriculum regardless of individual goals |
| AI Skill Gap | Students use AI casually but don't learn prompt engineering or agent workflows |
| Learning Without Building | Consuming videos and lectures without building real products or working in teams |

---

## 🌟 Our Vision

Create an AI-powered ecosystem where every student graduates with:

- ✅ 3–5 internships
- ✅ 15–20 real projects
- ✅ Strong industry network
- ✅ AI-native skills
- ✅ Public portfolio
- ✅ Employability score (0–1000)
- ✅ Personalized career roadmap

The end result is not a certificate — it is a **job-ready, AI-native, industry-connected graduate** who has already built products, completed internships, and developed a verified professional reputation before graduation.

---

## 🧩 Core Features

### 1. 🤖 AI Career Twin
A personal AI career advisor for every student.
- Career guidance and goal setting
- Skill gap analysis
- Personalized learning roadmap
- Weekly goal tracking

### 2. 🛒 Project Marketplace
Real-world projects sourced from startups, NGOs, local businesses, and companies.
- Students earn experience points, portfolio credits, and reputation scores
- Examples: Design a food delivery app, Build an inventory system, Marketing automation

### 3. 🧑‍🏫 Mentor Cloud
AI-matched connections between students and industry experts, founders, and alumni.
- Weekly office hours
- Project reviews
- AMA (Ask Me Anything) sessions

### 4. 📁 AI Portfolio Builder
Every activity automatically generates:
- Portfolio page
- Resume updates
- Skill evidence and case studies
- LinkedIn-ready content

### 5. 🤝 Peer Learning Network
AI-recommended squads based on interests, skills, and goals.
- Learning squads
- Hackathon teams
- Study circles

### 6. 💼 Internship Engine
AI matches student skill graphs with company requirement graphs.
- Micro internships
- Remote projects
- Startup internships

### 7. 🧪 AI Skills Lab
Hands-on future-ready AI workspace.
- AI tools and agents
- Prompt engineering
- Workflow building and automations

### 8. 📊 Employability Score
A career credit score ranging from 0–1000, based on:
- Projects completed
- Skills acquired
- Internships done
- Mentor reviews
- Community contributions

### 9. 🏆 Innovation Arena
Students solve real industry, startup, and social challenges.
- Winning projects receive funding, incubation, and internship offers

---

## 🔄 Platform Workflow

```
Student Joins
     ↓
Career Twin Created
     ↓
Skill Gap Analysis
     ↓
Project Recommendations
     ↓
Project Completion
     ↓
Portfolio Generation
     ↓
Internship Matching
     ↓
Job Placement
     ↓
Lifelong Learning
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend (Web) | React.js |
| Frontend (Mobile) | React Native |
| Backend | Node.js, Express.js |
| Database | PostgreSQL |
| AI Engine | GPT Models, RAG Knowledge Base |
| Cloud | AWS | (Future)

---

## 💰 Business Model

| Segment | Model | Pricing |
|---|---|---|
| Colleges (B2B) | Annual Subscription | ₹500 – ₹1,500 per student/year |
| Students (B2C) | Premium Features | ₹199 – ₹499/month |
| Recruiters | Talent Access Platform | ₹50,000 – ₹5,00,000/year |
| Mentors | Revenue Sharing | On workshops and career programs |

---

## 🗺️ Product Roadmap

| Phase | Focus | Target |
|---|---|---|
| Year 1 — Foundation | Career Twin, Portfolio Builder, Mentor System | 10 Colleges, 10,000 Students |
| Year 2 — Expansion | Internship Marketplace, Employability Score, Community Platform | 100 Colleges, 1,00,000 Students |
| Year 3 — Intelligence | AI Skill Graph, AI Recruiter, AI Career Prediction | 500 Colleges, 5,00,000 Students |
| Year 4 — Ecosystem | Startup Incubator, Research Marketplace, Global Mentorship | 1 Million Students |

---

## 👥 Team & Contributions

Our team of 5 members has divided the project into clear, equal ownership areas to ensure parallel development and accountability.

---

### 👤 Member 1 — AI Systems & Career Twin Lead

**Responsibilities:**
- Design and develop the AI Career Twin module (chat assistant + career roadmap engine)
- Build the Skill Gap Analysis logic using GPT models and RAG Knowledge Base
- Develop the AI Employability Score algorithm (0–1000 scoring system)
- Integrate AI Skills Lab workspace (prompt engineering, agent workflows)
- Train and fine-tune AI models for student-mentor and student-project matching

**Modules Owned:**
- `/ai-engine/career-twin/`
- `/ai-engine/skill-gap/`
- `/ai-engine/employability-score/`
- `/ai-engine/skills-lab/`

---

### 👤 Member 2 — Backend & Database Lead

**Responsibilities:**
- Architect and develop the Node.js + Express.js REST API
- Design the PostgreSQL database schema (users, projects, mentors, internships, scores)
- Build authentication and authorization system (JWT, role-based access)
- Develop APIs for project marketplace, internship engine, and innovation arena
- Set up AWS cloud infrastructure (EC2, S3, RDS) and CI/CD pipelines

**Modules Owned:**
- `/backend/api/`
- `/backend/auth/`
- `/backend/db/`
- `/infrastructure/aws/`

---

### 👤 Member 3 — Frontend (Web) Lead

**Responsibilities:**
- Build the complete React.js web application (Student Dashboard, Mentor Dashboard, Recruiter Portal)
- Develop Project Marketplace UI and Project Hub with team creation flow
- Build Employability Score dashboard with visual analytics
- Create Internship Board and Innovation Arena interfaces
- Ensure responsive design, accessibility, and performance optimization

**Modules Owned:**
- `/frontend/web/dashboard/`
- `/frontend/web/marketplace/`
- `/frontend/web/internship/`
- `/frontend/web/innovation-arena/`

---

### 👤 Member 4 — Frontend (Mobile) & Portfolio Builder Lead

**Responsibilities:**
- Build the React Native mobile application for student-facing features
- Develop the AI Portfolio Builder module (auto case study generation, LinkedIn content, resume updates)
- Design and implement the Peer Learning Network UI (squads, hackathon teams, study circles)
- Build Mentor Booking and session scheduling interface
- Conduct UI/UX design across all screens (design system, components, style guide)

**Modules Owned:**
- `/frontend/mobile/`
- `/frontend/web/portfolio-builder/`
- `/frontend/web/peer-network/`
- `/frontend/web/mentor-booking/`

---

Member 5 – Testing, Quality Assurance & Product Integration Lead

Responsibilities:

Perform functional, integration, and system testing of the application.
Verify that all features work according to the specified requirements.
Identify, document, and track bugs throughout the development lifecycle.
Conduct user acceptance testing (UAT) and ensure a smooth user experience.
Validate API integrations between frontend, backend, and AI modules.
Support sprint planning, project coordination, and quality assurance activities.
Maintain testing documentation, test cases, and test reports.

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- PostgreSQL 14+
- npm or yarn
- AWS account (for cloud deployment)
- OpenAI API Key (for AI features)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-team/futureforge-ai.git
cd futureforge-ai

# 2. Install backend dependencies
cd backend
npm install

# 3. Install frontend dependencies
cd ../frontend/web
npm install

# 4. Set up environment variables
cp .env.example .env
# Fill in your PostgreSQL, OpenAI, and AWS credentials in .env

# 5. Run database migrations
cd ../../backend
npm run migrate

# 6. Start backend server
npm run dev

# 7. Start frontend (in a new terminal)
cd ../frontend/web
npm start
```

---

## 📁 Folder Structure

```
futureforge-ai/
├── ai-engine/
│   ├── career-twin/
│   ├── skill-gap/
│   ├── employability-score/
│   └── skills-lab/
├── backend/
│   ├── api/
│   ├── auth/
│   └── db/
├── frontend/
│   ├── web/
│   │   ├── dashboard/
│   │   ├── marketplace/
│   │   ├── portfolio-builder/
│   │   ├── peer-network/
│   │   ├── mentor-booking/
│   │   ├── internship/
│   │   └── innovation-arena/
│   └── mobile/
├── infrastructure/
│   └── aws/
├── business/
│   ├── onboarding/
│   └── recruiter-portal/
├── docs/
├── tests/
├── .env.example
├── README.md
└── package.json
```

---
Future Scope 

Add real-time industry trend analysis to recommend emerging skills and career opportunities.
Implement AI mentor matching to connect students with alumni and industry professionals.
Develop a personalized internship and project recommendation system based on student skills and interests.
Introduce peer learning communities where students can collaborate, share knowledge, and grow together.
Create an AI-powered portfolio builder that automatically showcases student achievements and projects.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m "feat: add your feature"`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request and tag your assigned reviewer

---

