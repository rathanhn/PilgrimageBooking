@echo off
echo Setting up Vercel MongoDB connection...
echo.

echo Please provide your Vercel MongoDB connection string:
echo Format: mongodb+srv://username:password@cluster.mongodb.net/database_name?retryWrites=true&w=majority
echo.
set /p MONGODB_URI="Enter your MongoDB URI: "

echo.
echo Creating .env file...
echo MONGODB_URI=%MONGODB_URI% > backend\.env
echo PORT=5000 >> backend\.env
echo NODE_ENV=development >> backend\.env
echo API_BASE_URL=http://localhost:5000 >> backend\.env
echo FRONTEND_URL=http://localhost:5500 >> backend\.env
echo BCRYPT_SALT_ROUNDS=10 >> backend\.env
echo JWT_SECRET=your_jwt_secret_key_here_change_in_production >> backend\.env
echo ADMIN_USERNAME=Admin@booking.com >> backend\.env
echo ADMIN_PASSWORD=admin123 >> backend\.env
echo NOTIFICATION_ADMIN_EMAIL=admin@pilgrimage.com >> backend\.env
echo CORS_ORIGIN=http://localhost:5500,http://127.0.0.1:5500,http://localhost:3000,http://127.0.0.1:3000 >> backend\.env

echo.
echo .env file created successfully!
echo.
echo Now you can start your server with:
echo cd backend
echo npm start
echo.
pause
