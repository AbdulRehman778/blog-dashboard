# Full Stack Blog App (Angular + Node.js + PostgreSQL)

A simple full stack blog app with user authentication, post creation, and protected routes using Angular 17 (PrimeNG), Node.js (Express), and PostgreSQL.

---

## 📦 Tech Stack

### Frontend
- Angular 19
- PrimeNG
- RxJS
- Angular Reactive Forms
- Tailwind CSS

### Backend
- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- JWT Authentication
- CORS
- Bcrypt

---

## 🛠️ Features

- User Registration & Login
- JWT Auth (Token Stored in LocalStorage)
- Protected Routes
- Post Creation & Listing
- Form Validation
- Toast Notifications (PrimeNG)
- PostgreSQL Integration

---

## 🔧 Setup Instructions

### ✅ Prerequisites

- Node.js (v18+)
- Angular CLI (`npm install -g @angular/cli`)
- PostgreSQL installed
- pgAdmin or DBeaver for DB management

---

## Backend Setup

### 1. Clone Repo
```bash
git clone https://github.com/AbdulRehman778/blog-dashboard.git
cd blog-app/backend

### 2. Install Dependencies

```bash
npm install
```
### 3. Setup PostgreSQL DB
Open pgAdmin or DBeaver and:

Create a new database named: blogdb

Save username/password (e.g., postgres/yourpassword)

### 4. Configure .env
Create a file .env inside backend/:
Add DATABASE_URL and JWT_SECRET

### 5. Run Migrations

```bash
npx sequelize-cli db:migrate
```
Also init prisma 

```bash
npx prisma init
```
npx prisma migrate dev --name init

### 6. Start Backend

```bash
npm run dev
```
Server will run at http://localhost:5000

# Frontend Setup

### 1. Install Dependencies

```bash
npm install
```
### 2. Run Angular App

```bash
ng serve
```
App will be available at http://localhost:4200