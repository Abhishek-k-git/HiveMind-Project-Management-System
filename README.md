# HiveMind - Project Management System

## 🚀 Overview
HiveMind is a comprehensive, full-stack project management application designed to streamline team collaboration, workspace management, and task tracking. Built on the MERN stack with TypeScript, it provides a robust and scalable solution for managing projects and team workflows efficiently.

## ✨ Features
- **Workspace Management:** Create, configure, and isolate distinct workspaces for different teams or organizations.
- **Projects & Tasks:** Organize work into projects and manage granular tasks with statuses, assignees, and priorities.
- **Role-Based Access Control (RBAC):** Manage permissions with robust user roles (Owner, Admin, Member) to ensure strict data security.
- **Member Collaboration:** Seamlessly invite new members via links and manage their access within workspaces.
- **Secure Authentication:** Multi-strategy authentication supporting traditional email/password login alongside Google OAuth integration.
- **Modern UI/UX:** Responsive, accessible, and fast interface built using React, Radix UI (ShadCN), and Tailwind CSS.
- **State Management:** Optimized client-server data fetching and caching with TanStack React Query, paired with Zustand for minimal global UI state.

## 🛠 Tech Stack

### Frontend
- **Framework:** React 18 + Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS, ShadCN UI (Radix UI primitives)
- **State/Caching:** TanStack React Query, Zustand
- **Routing:** React Router v7
- **Forms & Validation:** React Hook Form, Zod
- **Icons & UI Utilities:** Lucide React, `clsx`, `tailwind-merge`

### Backend
- **Runtime:** Node.js + Express
- **Language:** TypeScript
- **Database:** MongoDB (using Mongoose)
- **Authentication:** Passport.js (JWT, Local Strategy, Google OAuth20), bcrypt
- **Validation:** Zod
- **Architecture:** Controller-Service-Repository pattern with explicit types.

## ⚙️ Prerequisites
Before running the application locally, ensure you have the following installed:
- Node.js (v18+)
- MongoDB (Running locally via port `27017` or a MongoDB Atlas URI)
- Git

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/Abhishek-k-git/HiveMind-Project-Management-System.git
```

### 2. Environment Setup

**Backend (`backend/.env`):**
Create a `.env` file in the `backend` directory based on the following template:
```env
PORT=8080
NODE_ENV=development
DATABASE_URL=mongodb://localhost:27017/hivemind

# Session & JWT Secrets
SESSION_SECRET=your_session_secret
SESSION_EXPIRES_IN=3600000

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=3600000

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:8080/api/auth/google/callback

FRONTEND_URL=http://localhost:5173
FRONTEND_GOOGLE_CALLBACK_URL=google/oauth/callback
```

**Frontend (`frontend/.env`):**
Create a `.env` file in the `frontend` directory:
```env
VITE_API_BASE_URL="http://localhost:8080/api"
```

### 3. Install Dependencies
Install dependencies for both the backend and frontend:

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 4. Database Seeding
To populate initial roles and permissions in your MongoDB database, run the seeder script from the `backend` directory:
```bash
cd backend
npm run seed
```

### 5. Running the Application

**Start the Backend (Development mode):**
```bash
cd backend
npm run dev
```

**Start the Frontend:**
```bash
cd frontend
npm run dev
```

The frontend will be accessible at `http://localhost:5173` and the backend API at `http://localhost:8080`.

## 📂 Project Structure
```text
├── backend/
│   ├── src/
│   │   ├── configs/       # Database & environment configurations
│   │   ├── controllers/   # Route controllers (Auth, Workspace, Project, Task)
│   │   ├── enums/         # TypeScript enums (Roles, Statuses)
│   │   ├── middlewares/   # Express middlewares (Auth, Error handling)
│   │   ├── models/        # Mongoose database schemas
│   │   ├── routes/        # API routing definitions
│   │   ├── seeders/       # DB seeding scripts (Permissions Initialization)
│   │   ├── services/      # Independent business logic layer
│   │   └── validations/   # Zod payload validations
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── assets/        # Static files and assets
    │   ├── components/    # Reusable generic/UI components
    │   ├── constant/      # Application constants/config
    │   ├── context/       # React Context Providers
    │   ├── hoc/           # Higher-Order Components
    │   ├── hooks/         # Custom React hooks (Data fetching)
    │   ├── layout/        # Page layouts (Dashboard, Sidebar)
    │   ├── lib/           # Utility functions and axios clients
    │   ├── page/          # Application Pages (Auth, Workspace, Settings)
    │   ├── routes/        # Router configuration
    │   ├── store/         # Zustand global stores
    │   └── types/         # TypeScript interface definitions (Shared)
    └── package.json
```

## 🤝 Contributing
Contributions are always welcome! Feel free to open an issue or submit a pull request if you'd like to improve the project.

## 📜 License
This project is licensed under the ISC License.
