# Fullstack PostgreSQL Auth Starter

This is a fullstack starter template with:
- Express + Prisma + PostgreSQL backend
- React frontend with JWT authentication
- React Native mobile app using the same backend
- Vercel (frontend) + Render (backend) deployment config

---

## 🛠 Setup Instructions

### Backend (Express + Prisma + PostgreSQL)

```bash
cd backend
npm install
npx prisma migrate dev --name init
node index.js
```

Set your `.env` file:

```
DATABASE_URL=postgresql://<username>:<password>@localhost:5432/fullstackapp
JWT_SECRET=your_secret_key
```

---

### Frontend (React)

```bash
cd frontend
npm create vite@latest . --template react
npm install
npm run dev
```

Replace the default `App.jsx` with the provided one.

---

### Mobile App (React Native with Expo)

```bash
cd mobile-app
npx create-expo-app .
npm install
npx expo start
```

Make sure your API URLs in fetch requests point to your backend (locally or deployed).

---

## ☁️ Deployment

### Vercel (Frontend)

- Deployed from `/frontend`
- `vercel.json` sets the root directory

### Render (Backend)

- Add new Web Service
- Use `render.yaml` to configure
- Set environment variables for `DATABASE_URL` and `JWT_SECRET`

---

## 🔐 Authentication Flow

- Signup/Login via `/api/auth`
- Get JWT token and store it in local storage (web) or async storage (mobile)
- Send token as `Authorization: Bearer <token>` in requests

---

## 📂 Structure

```
/backend      -> Express API + Prisma
/frontend     -> React app
/mobile-app   -> Expo-based mobile app
```