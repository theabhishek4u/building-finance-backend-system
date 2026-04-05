# 💹 Finance Data Processing & Access Control Backend

[![Node.js](https://img.shields.io/badge/Node.js-v24.x-green)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-v5.x-lightgrey)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-blue)](https://www.mongodb.com/cloud/atlas)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A professional-grade, scalable backend system for managing financial records, user roles, and dashboard analytics with robust **Role-Based Access Control (RBAC)**. 

Designed for both seamless local testing (via Zero-Config In-Memory DB) and production-ready deployments.

---

## 🚀 Key Features

### 🛡️ Secure Authorization
- **Role-Based Access Control (RBAC)**: Fine-grained permissions for **Admin**, **Analyst**, and **Viewer**.
- **User Status Enforcement**: Global middleware to instantly block `inactive` users from all protected routes.

### 📊 Advanced Analytics
- **Dashboard Summary**: Real-time calculation of Total Income, Total Expenses, and Net Balance.
- **Monthly Trends**: Multi-month financial performance trends using MongoDB aggregation pipelines.
- **Category Breakdown**: Dynamic categorization of expenses and incomes for high-fidelity visualization.

### 📂 Transaction Intelligence
- **Keyword Search**: Robust search across transaction `descriptions` and `categories`.
- **Pagination**: Performance-optimized record retrieval supporting `page` and `limit` parameters.
- **Soft Delete**: Industry-standard "archive" pattern (`isDeleted: true`) for data auditability.

### 🛠️ Developer-First (Zero-Config)
- **Automatic Fallback**: If a local/remote MongoDB is missing, the app automatically starts an **In-Memory MongoDB Server**.
- **Auto-Seeding**: In development mode, the database is pre-populated with test users and sample records for instant testing.

---

## 💻 Tech Stack

- **Runtime**: [Node.js (v24+)](https://nodejs.org/)
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose ODM](https://mongoosejs.com/)
- **Validation**: [Joi](https://joi.dev/)
- **Development Tools**: 
  - [dotenv](https://github.com/motdotla/dotenv) (Environment config)
  - [morgan](https://github.com/expressjs/morgan) (HTTP logging)
  - [node --watch](https://nodejs.org/en/blog/release/v18.11.0/) (Native file watching)

---

## 📝 API Documentation

### 🔑 Authentication (Mocked)
For the purpose of this assignment, authentication is simulated via the `x-user-id` header.
- **Header**: `x-user-id`
- **Value**: Valid MongoDB User ID (e.g., `69d2a691fadc9b1f1b03a343`)

### 🗃️ Permissions Matrix
| Endpoint | Method | Admin | Analyst | Viewer |
| :--- | :---: | :---: | :---: | :---: |
| `/api/dashboard/summary` | GET | ✅ | ✅ | ✅ |
| `/api/records` | GET | ✅ | ✅ | ❌ |
| `/api/records` | POST | ✅ | ❌ | ❌ |
| `/api/records/:id` | PUT/DELETE| ✅ | ❌ | ❌ |
| `/api/users` | (Full CRUD) | ✅ | ❌ | ❌ |

---

## ⚙️ Project Structure

```text
├── controllers/      # Request handlers & logic
├── middleware/       # Auth, Roles, Error & Status check
├── models/           # Mongoose schemas (User, Record)
├── routes/           # API endpoint definitions
├── services/         # Complex DB logic & Aggregations
├── utils/            # Helper functions
├── seed.js           # CLI Seeding script
├── server.js         # Entry point & App configuration
└── test-apis.http    # VS Code REST Client test suite
```

---

## 🛠️ Getting Started

### 1. Installation
```bash
git clone <repository-url>
cd finance-backend
npm install
```

### 2. Environment Setup
Create a `.env` file in the root directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/finance-db
NODE_ENV=development
JWT_SECRET=your_secret_key
```

### 3. Running the App
```bash
# Development (with watch mode & auto-seeding)
npm run dev

# Production mode
npm start
```

---

## 🚀 Deployment Guide
This project is configured for cloud deployment (e.g., Render, Railway, Heroku).

1.  **Database**: Set `MONGODB_URI` to a **MongoDB Atlas** connection string.
2.  **State**: Set `NODE_ENV=production` to disable automatic seeding.
3.  **Port**: Use the platform's default `PORT` (e.g., 8080 or 443).

---
> [!IMPORTANT]
> The server automatically starts an **In-Memory MongoDB** if no connection is found. This is for demo purposes only and should not be used in a production environment.

*Developed as part of the Finance Data Processing Backend Assignment - 2026*
