@echo off
echo ======================================
echo Clear MongoDB Data for Pilgrimage Booking
echo ======================================
echo.
echo This will delete ALL data from your database!
echo.
pause

echo.
echo Opening MongoDB Shell...
echo.
echo Please copy and paste the following commands:
echo.
echo use pilgrimage_bookings
echo.
echo db.bookings.deleteMany({^})
echo db.users.deleteMany({^})
echo db.notifications.deleteMany({^})
echo.
echo show collections
echo.
echo Press any key to continue...
pause > nul

mongosh

echo.
echo Done! Database cleared.
pause
