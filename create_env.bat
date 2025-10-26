@echo off
echo Creating .env file for Pilgrimage Booking System...
echo.

cd backend

echo # Environment Configuration for Pilgrimage Booking System > .env
echo. >> .env
echo # Server Configuration >> .env
echo PORT=5000 >> .env
echo NODE_ENV=development >> .env
echo. >> .env
echo # Database Configuration >> .env
echo MONGODB_URI=mongodb://127.0.0.1:27017/pilgrimage_bookings >> .env
echo. >> .env
echo # API Configuration >> .env
echo API_BASE_URL=http://localhost:5000 >> .env
echo FRONTEND_URL=http://localhost:3000 >> .env
echo. >> .env
echo # Security Configuration >> .env
echo BCRYPT_SALT_ROUNDS=10 >> .env
echo JWT_SECRET=your_jwt_secret_key_here_change_in_production >> .env
echo. >> .env
echo # Admin Configuration >> .env
echo ADMIN_USERNAME=Admin@booking.com >> .env
echo ADMIN_PASSWORD=admin123 >> .env
echo. >> .env
echo # Email Configuration (for future use) >> .env
echo SMTP_HOST=smtp.gmail.com >> .env
echo SMTP_PORT=587 >> .env
echo SMTP_USER=your_email@gmail.com >> .env
echo SMTP_PASS=your_app_password >> .env
echo. >> .env
echo # Notification Configuration >> .env
echo NOTIFICATION_ADMIN_EMAIL=admin@pilgrimage.com >> .env
echo. >> .env
echo # CORS Configuration >> .env
echo CORS_ORIGIN=http://localhost:3000,http://127.0.0.1:3000 >> .env

echo.
echo ✅ .env file created successfully in backend directory!
echo.
echo 📝 Next steps:
echo 1. Review and update the values in backend/.env
echo 2. Change default passwords for production
echo 3. Update JWT_SECRET for production
echo 4. Run: npm run dev
echo.
pause
