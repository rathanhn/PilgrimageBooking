# 🔍 Check Environment Variables

## Current Issue
Backend is deployed but still getting: `{"success":false,"message":"Failed to fetch stats"}`

---

## ✅ Checklist: Did You Add Environment Variables?

Please confirm you added ALL 6 variables in Vercel:

- [ ] **MONGODB_URI** - Added
- [ ] **JWT_SECRET** - Added  
- [ ] **ADMIN_USERNAME** - Added
- [ ] **ADMIN_PASSWORD** - Added
- [ ] **NOTIFICATION_ADMIN_EMAIL** - Added
- [ ] **CORS_ORIGIN** - Added (Production only)

---

## 🚨 Common Issues

### Issue 1: Variables Not Added
**Solution**: You MUST add variables via Vercel Dashboard:
1. Go to: https://vercel.com/dashboard
2. Click your project
3. Settings → Environment Variables
4. Add all 6 variables

### Issue 2: Variables Added BUT Not Redeployed
**Solution**: After adding variables, you MUST redeploy:
1. Go to "Deployments" tab
2. Click "..." (three dots) on latest deployment
3. Click "Redeploy"
4. Wait 2-3 minutes

### Issue 3: MongoDB Not Allowing Vercel IP
**Solution**: Check MongoDB Atlas Network Access:
1. Go to: https://cloud.mongodb.com/
2. Click "Network Access"
3. Click "Add IP Address"
4. Click "Allow Access from Anywhere" (0.0.0.0/0)
5. Click "Confirm"

---

## 🎯 Next Steps

1. **Confirm** you added all 6 environment variables in Vercel
2. **Confirm** you clicked "Redeploy" after adding them
3. **Check** MongoDB Atlas Network Access allows 0.0.0.0/0
4. **Test** again: https://pilgrimage-backend.vercel.app/admin/stats

---

## 💡 Quick Test

If you haven't added the environment variables yet, that's why it's failing.

Please:
1. Open: https://vercel.com/dashboard
2. Click on "pilgrimage-backend" project
3. Click "Settings" → "Environment Variables"
4. Add the 6 variables (copy from `backend/environment-variables.txt`)
5. Click "Redeploy"

Then test again! 🚀
