# Production Setup Instructions

## Frontend (Vercel)
The frontend is configured to automatically use the production API URL when deployed to Vercel:
- Production URL: https://msd-project-weld-one.vercel.app
- Production API Base URL: https://msd-project-tmru.onrender.com/api

## Backend (Render)
The backend is configured to accept requests from both localhost and the production frontend:
- Production URL: https://msd-project-tmru.onrender.com
- CORS is configured to allow requests from:
  - https://msd-project-weld-one.vercel.app (Production)
  - http://localhost:3000 (Development)

## Environment Variables

### Frontend
No environment variables needed as the API URL is configured based on NODE_ENV.

### Backend
Required environment variables in `.env`:
```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

## API Endpoints

All API endpoints are now accessible at:
- Production: https://msd-project-tmru.onrender.com/api/*
- Development: http://localhost:5000/api/*

Available endpoints:
- Auth: /api/auth/register, /api/auth/login
- Courts: /api/courts
- Events: /api/events
- Memberships: /api/memberships