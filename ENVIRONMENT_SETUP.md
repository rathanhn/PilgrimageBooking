# Pilgrimage Booking System - Environment Configuration

## 🔧 Environment Variables Setup

This system now uses environment variables for configuration, making it easy to deploy across different environments (development, staging, production).

### 📁 Configuration Files

- `backend/config.js` - Main configuration file with environment variable support
- `js/config.js` - Frontend configuration file
- `backend/.env` - Environment variables file (create this from the example below)

### 🚀 Quick Setup

1. **Create Environment File**
   ```bash
   cd backend
   cp .env.example .env  # If .env.example exists
   # OR create .env manually with the content below
   ```

2. **Environment Variables (.env file)**
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development

   # Database Configuration
   MONGODB_URI=mongodb://127.0.0.1:27017/pilgrimage_bookings

   # API Configuration
   API_BASE_URL=http://localhost:5000
   FRONTEND_URL=http://localhost:3000

   # Security Configuration
   BCRYPT_SALT_ROUNDS=10
   JWT_SECRET=your_jwt_secret_key_here_change_in_production

   # Admin Configuration
   ADMIN_USERNAME=Admin@booking.com
   ADMIN_PASSWORD=admin123

   # Email Configuration (for future use)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_password

   # Notification Configuration
   NOTIFICATION_ADMIN_EMAIL=admin@pilgrimage.com

   # CORS Configuration
   CORS_ORIGIN=http://localhost:3000,http://127.0.0.1:3000
   ```

3. **Start the Application**
   ```bash
   # Development
   npm run dev
   
   # Production
   npm run prod
   ```

### 🌍 Environment-Specific Configurations

#### Development Environment
```env
NODE_ENV=development
PORT=5000
API_BASE_URL=http://localhost:5000
MONGODB_URI=mongodb://127.0.0.1:27017/pilgrimage_bookings_dev
```

#### Production Environment
```env
NODE_ENV=production
PORT=8080
API_BASE_URL=https://your-domain.com/api
MONGODB_URI=mongodb://your-production-db:27017/pilgrimage_bookings
JWT_SECRET=your_very_secure_production_secret_key
ADMIN_PASSWORD=your_secure_admin_password
```

### 🔒 Security Notes

- **Never commit `.env` files to version control**
- **Change default passwords in production**
- **Use strong JWT secrets in production**
- **Update CORS origins for production domains**

### 📝 Available Scripts

- `npm start` - Start the server
- `npm run dev` - Start in development mode
- `npm run prod` - Start in production mode
- `npm run start:dev` - Start with NODE_ENV=development
- `npm run start:prod` - Start with NODE_ENV=production

### 🔄 Frontend Configuration

The frontend automatically uses the configuration from `js/config.js`. To change API endpoints, update the `API_BASE_URL` in the frontend config file.

### 🐛 Troubleshooting

1. **Environment variables not loading**: Ensure `.env` file is in the `backend` directory
2. **CORS errors**: Update `CORS_ORIGIN` in your `.env` file
3. **Database connection issues**: Check `MONGODB_URI` in your `.env` file
4. **API calls failing**: Verify `API_BASE_URL` matches your server URL

### 📚 Benefits of Environment Variables

- ✅ **Easy deployment** across different environments
- ✅ **Security** - sensitive data not in code
- ✅ **Flexibility** - change config without code changes
- ✅ **Scalability** - different configs for different instances
- ✅ **Maintainability** - centralized configuration management
