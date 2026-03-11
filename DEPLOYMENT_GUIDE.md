# 🚀 FAVcart Deployment Guide

## Prerequisites Checklist ✅

Before deploying, make sure you have:
- [x] MongoDB Atlas database (already configured)
- [ ] Render account (for backend)
- [ ] Vercel account (for frontend)
- [ ] GitHub repository (code pushed)

---

## 🔧 Backend Deployment (Render)

### Step 1: Prepare Backend for Production

Your backend is ready! Just need to configure environment variables on Render.

### Step 2: Deploy on Render

1. **Go to [Render.com](https://render.com)** and sign in
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository: `hemanthsankar0007/FAVcart`
4. Configure:
   - **Name**: `favcart-backend` (or any name)
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: Leave empty (or use `./`)
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node backend/server.js`
   - **Instance Type**: Free

5. **Add Environment Variables** (click "Advanced" → "Add Environment Variable"):

```
NODE_ENV=productio
JWT_SECRET=F66DB4EC116F3
JWT_EXPIRES_TIME=7d
COOKIE_EXPIRES_TIME=7
BACKEND_URL=https://YOUR-RENDER-APP-NAME.onrender.com
FRONTEND_URL=https://YOUR-VERCEL-APP-NAME.vercel.app
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=%YOUR_MAILTRAP_USERNAME%
SMTP_PASS=%YOUR_MAILTRAP_PASS%
SMTP_FROM_NAME=FAVcart
SMTP_FROM_EMAIL=noreply@favcart.com
```

6. Click **"Create Web Service"**
7. **Copy your Render URL** (e.g., `https://favcart-backend.onrender.com`)

### Step 3: Update CORS in server.js

After deployment, update `backend/server.js` line 41 with your Vercel URL:

```javascript
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://YOUR-VERCEL-APP.vercel.app", // Add your Vercel URL
    ],
    credentials: true,
  })
);
```

---

## 🎨 Frontend Deployment (Vercel)

### Step 1: Update Environment Variable

1. Edit `frontend/.env.production`:
```
REACT_APP_API_URL=https://YOUR-RENDER-APP-NAME.onrender.com
```

2. **Commit and push** this change to GitHub:
```bash
git add .
git commit -m "Add production environment variables"
git push origin main
```

### Step 2: Deploy on Vercel

1. **Go to [Vercel.com](https://vercel.com)** and sign in
2. Click **"Add New"** → **"Project"**
3. **Import** your GitHub repository: `hemanthsankar0007/FAVcart`
4. Configure:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `build` (auto-detected)

5. **Add Environment Variable**:
   - Click "Environment Variables"
   - Add: `REACT_APP_API_URL` = `https://YOUR-RENDER-BACKEND.onrender.com`

6. Click **"Deploy"**
7. Wait for build to complete
8. **Copy your Vercel URL** (e.g., `https://favcart.vercel.app`)

### Step 3: Update Backend CORS & URLs

Go back to Render and update environment variables:
- `FRONTEND_URL` = Your Vercel URL
- Redeploy backend

---

## 🔄 Final Configuration

### 1. Update Backend CORS (in code)

Edit `backend/server.js` and `backend/app.js`:

```javascript
// backend/server.js (line 40-46)
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://favcart.vercel.app", // Your actual Vercel URL
    ],
    credentials: true,
  })
);

// backend/app.js (line 22-26)
app.use(
  cors({
    origin: [process.env.FRONTEND_URL, 'http://localhost:3000'],
    credentials: true,
  })
);
```

### 2. Push Changes & Redeploy

```bash
git add .
git commit -m "Update CORS for production"
git push origin main
```

Render will auto-deploy. Vercel will auto-deploy.

---

## ✅ Verification Checklist

After deployment, test:

- [ ] Frontend loads on Vercel URL
- [ ] Backend health check: `https://YOUR-BACKEND.onrender.com/api/v1/products`
- [ ] Login/Register works
- [ ] Products display correctly
- [ ] Cart functionality works
- [ ] Categories filter properly
- [ ] Pagination works
- [ ] Images load correctly

---

## 🐛 Common Issues & Fixes

### Issue 1: "Network Error" on Frontend
**Fix**: Check `REACT_APP_API_URL` in Vercel environment variables

### Issue 2: "CORS Error"
**Fix**: Update `origin` array in `backend/server.js` with your Vercel URL

### Issue 3: Backend takes 30s to respond first time
**Fix**: Normal for Render free tier (spins down after inactivity)

### Issue 4: Images not loading
**Fix**: Check image URLs are using full paths or hosted on CDN

### Issue 5: MongoDB connection fails
**Fix**: 
- Add `0.0.0.0/0` to MongoDB Atlas Network Access
- Check connection string has correct credentials

---

## 📝 Important Notes

1. **Render Free Tier**: Spins down after 15 min inactivity, first request takes 30-50s
2. **Environment Variables**: Never commit `.env` files to GitHub
3. **MongoDB Atlas**: Whitelist Render's IP or use `0.0.0.0/0` for all IPs
4. **HTTPS**: Both Vercel and Render provide free SSL certificates
5. **Updates**: Push to GitHub → Auto-deploys to both platforms

---

## 🔐 Security Recommendations

Before going live:

1. **Change JWT_SECRET** to a stronger random string
2. **Set up proper email** (not Mailtrap) for production
3. **Add rate limiting** to API endpoints
4. **Enable MongoDB IP whitelist** properly
5. **Use strong passwords** for MongoDB
6. **Set up Stripe** if accepting payments

---

## 📞 Support

If you encounter issues:
1. Check Render logs: Dashboard → Logs
2. Check Vercel logs: Deployment → View Function Logs
3. Check browser console for frontend errors
4. Check Network tab for API calls

---

Good luck with your deployment! 🚀
