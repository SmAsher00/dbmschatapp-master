# Deploying the Backend to Render

Use these steps to host the Express/Socket.io backend for free on Render.

## 1. Prerequisites

- GitHub repository up-to-date (`backend` folder contains the server)
- MongoDB Atlas database (free tier)
- Cloudinary account (optional, for profile pictures)

## 2. Update Environment Variables

Create a `.env` file locally (and on Render) with:

```
PORT=10000                 # Render sets this automatically; keep fallback
CLIENT_URL=https://<your-frontend-domain>.vercel.app
MONGODB_URI=<atlas-connection-string>
JWT_SECRET=<long-random-string>
CLOUDINARY_CLOUD_NAME=<optional>
CLOUDINARY_API_KEY=<optional>
CLOUDINARY_API_SECRET=<optional>
NODE_ENV=production
```

## 3. Prepare `package.json`

The backend now contains:

```json
"scripts": {
  "dev": "nodemon src/index.js",
  "start": "node src/index.js"
}
```

Render will execute `npm install` followed by `npm start`.

## 4. Deploy on Render

1. Visit [render.com](https://render.com) → **New** → **Web Service**
2. Connect your GitHub account and pick this repository
3. Set the root directory to `backend`
4. Use these defaults:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Add the environment variables from step 2 in the Render dashboard
6. Click **Create Web Service** and wait for the deploy to finish

Render will output the backend URL, e.g. `https://chat-backend.onrender.com`.

## 5. Frontend Integration

Set `VITE_API_URL` (in Vercel or `.env`) to the Render URL. The frontend now uses this env var automatically for all fetch requests and Socket.io connections.

## 6. Tips

- Free tier sleeps after ~15 minutes of inactivity; first request may take a few seconds
- Monitor logs in Render’s dashboard for debugging
- Update `CLIENT_URL` whenever the frontend domain changes
- Push to `main` (or the chosen branch) to trigger automatic redeploys

