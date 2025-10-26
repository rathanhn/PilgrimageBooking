# 🚨 Quick Fix: MongoDB Connection Failed

## Problem
You're getting: `{"success":false,"message":"Failed to fetch stats"}`

## Cause
Environment variables are not added to Vercel yet.

---

## ✅ Solution: Add Environment Variables (5 Minutes)

### Step 1: Go to Vercel Dashboard
1. Visit: https://vercel.com/dashboard
2. Click on your project: **"pilgrimage-backend"**

### Step 2: Open Environment Variables
1. Click **"Settings"** tab (top navigation)
2. Click **"Environment Variables"** (left sidebar)

### Step 3: Add These 6 Variables
Click **"Add"** button 6 times and enter:

**Variable 1:**
- Key: `MONGODB_URI`
- Value: `mongodb+srv://rathancoorg11_db_user:i6KensWvAw7mYJHA@pilgrimage-backend-clus.5qvnno4.mongodb.net/pilgrimage_bookings?retryWrites=true&w=majority`
- Environments: ☑️ Production ☑️ Preview ☑️ Development

**Variable 2:**
- Key: `JWT_SECRET`
- Value: `pilgrimage_booking_jwt_secret_2025_secure_key_987654321`
- Environments: ☑️ Production ☑️ Preview ☑️ Development

**Variable 3:**
- Key: `ADMIN_USERNAME`
- Value: `Admin@booking.com`
- Environments: ☑️ Production ☑️ Preview ☑️ Development

**Variable 4:**
- Key: `ADMIN_PASSWORD`
- Value: `admin123`
- Environments: ☑️ Production ☑️ Preview ☑️ Development

**Variable 5:**
- Key: `NOTIFICATION_ADMIN_EMAIL`
- Value: `admin@pilgrimage.com`
- Environments: ☑️ Production ☑️ Preview ☑️ Development

**Variable 6:**
- Key: `CORS_ORIGIN`
- Value: `http://localhost:5500,http://127.0.0.1:5500,http://localhost:3000`
- Environments: ☑️ Production (ONLY)

### Step 4: Save and Redeploy
1. Click **"Save"** for each variable
2. Go to **"Deployments"** tab
3. Click **"..."** (three dots) on the latest deployment
4. Click **"Redeploy"**
5. Wait 2-3 minutes

---

## 🎯 Test Again

After redeploy, visit:
```
https://pilgrimage-backend.vercel.app/admin/stats
```

You should see:
```json
{"success":true,"totalBookings":0,"pendingBookings":0,"cancelledBookings":0,"todaysBookings":0}
```

---

## ✅ If Still Not Working

Check MongoDB Atlas Network Access:
1. Go to: https://cloud.mongodb.com/
2. Click **"Network Access"** → **"IP Access List"**
3. Click **"Add IP Address"**
4. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
5. Click **"Confirm"**

This allows Vercel to connect to your database.
