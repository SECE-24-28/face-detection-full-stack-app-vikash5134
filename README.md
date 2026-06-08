# Face Recognition App

## Stack
- Frontend: React + Vite
- Backend: Express + Prisma + PostgreSQL
- Auth: JWT
- Face API: LuXand Cloud

## Setup

### 1. Database
Create a PostgreSQL database named `facerecog`.

### 2. Backend
```bash
cd server
# Edit .env — set DATABASE_URL, JWT_SECRET, LUXAND_API_KEY
npx prisma migrate dev --name init
npm run dev
```

### 3. Frontend
```bash
cd client
npm run dev
```

## Environment Variables (server/.env)
| Variable | Description |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Secret key for JWT signing |
| `LUXAND_API_KEY` | Your LuXand Cloud API token |
| `PORT` | Server port (default 5000) |

## LuXand API
Get your API key at https://luxand.cloud  
The app calls `POST /photo/detect` with a photo URL.
