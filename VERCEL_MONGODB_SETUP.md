# Vercel MongoDB Setup Guide

## How to Configure Your Application to Use Vercel MongoDB

### Step 1: Get Your MongoDB Connection String from Vercel

1. **Log into your Vercel account**
2. **Go to your MongoDB project/database**
3. **Find the connection string** - it should look like:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/database_name?retryWrites=true&w=majority
   ```

### Step 2: Update Configuration

#### Option A: Using Environment Variables (Recommended)

Create a `.env` file in the `backend` folder with:
```env
MONGODB_URI=mongodb+srv://your-username:your-password@your-cluster.mongodb.net/pilgrimage_bookings?retryWrites=true&w=majority
```

#### Option B: Direct Configuration Update

Replace the connection string in `backend/config.js`:
```javascript
MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://your-actual-username:your-actual-password@your-actual-cluster.mongodb.net/pilgrimage_bookings?retryWrites=true&w=majority',
```

### Step 3: Test the Connection

1. **Stop your current server** (if running)
2. **Start the server**:
   ```bash
   cd backend
   npm start
   ```
3. **Check the console** for:
   ```
   ✅ MongoDB connected
   ```

### Step 4: Verify Data Migration

If you have existing data in local MongoDB, you may need to:

1. **Export data from local MongoDB**:
   ```bash
   mongodump --uri="mongodb://127.0.0.1:27017/pilgrimage_bookings" --out=./backup
   ```

2. **Import to Vercel MongoDB**:
   ```bash
   mongorestore --uri="mongodb+srv://your-username:your-password@your-cluster.mongodb.net/pilgrimage_bookings" ./backup/pilgrimage_bookings
   ```

### Step 5: Update Frontend Configuration (if needed)

If your backend will be hosted on Vercel too, update `js/config.js`:
```javascript
const AppConfig = {
    BASE_URL: "https://your-backend-app.vercel.app", // Your Vercel backend URL
    // ... rest of config
};
```

## Security Notes

- **Never commit your `.env` file** to version control
- **Use strong passwords** for your MongoDB user
- **Enable IP whitelisting** in Vercel MongoDB if possible
- **Use environment variables** in production

## Troubleshooting

### Connection Issues
- Check if your IP is whitelisted in Vercel MongoDB
- Verify the connection string format
- Ensure the database name is correct

### Authentication Issues
- Verify username and password
- Check if the user has proper permissions
- Ensure the database exists

### Network Issues
- Check your internet connection
- Verify Vercel MongoDB is accessible
- Check firewall settings

## Example Connection String Format

```
mongodb+srv://username:password@cluster0.abc123.mongodb.net/pilgrimage_bookings?retryWrites=true&w=majority
```

Where:
- `username`: Your MongoDB username
- `password`: Your MongoDB password
- `cluster0.abc123`: Your cluster identifier
- `pilgrimage_bookings`: Your database name
