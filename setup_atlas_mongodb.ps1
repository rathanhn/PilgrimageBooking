# PowerShell script to setup MongoDB Atlas connection
Write-Host "Setting up MongoDB Atlas connection..." -ForegroundColor Green
Write-Host ""

# Create .env file in backend directory
$envContent = @"
# MongoDB Atlas Configuration
MONGODB_URI=mongodb+srv://rathancoorg11_db_user:i6KensWvAw7mYJHA@pilgrimage-backend-clus.5qvnno4.mongodb.net/pilgrimage_bookings?retryWrites=true&w=majority

# Server Configuration
PORT=5000
NODE_ENV=development

# API Configuration
API_BASE_URL=http://localhost:5000
FRONTEND_URL=http://localhost:5500

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
CORS_ORIGIN=http://localhost:5500,http://127.0.0.1:5500,http://localhost:3000,http://127.0.0.1:3000
"@

# Write to .env file
$envContent | Out-File -FilePath "backend\.env" -Encoding UTF8

Write-Host ".env file created successfully in backend directory!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Test the connection: node test_mongodb_connection.js" -ForegroundColor White
Write-Host "2. Start the server: cd backend && npm start" -ForegroundColor White
Write-Host ""
Write-Host "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
