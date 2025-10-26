// MongoDB Commands to Clear All Data
// Run these commands in mongosh

// Connect to your database
use pilgrimage_bookings

// Check current data
show collections
db.bookings.countDocuments()
db.users.countDocuments()
db.notifications.countDocuments()

// Clear all data from collections
db.bookings.deleteMany({})
db.users.deleteMany({})
db.notifications.deleteMany({})

// Verify everything is cleared
db.bookings.countDocuments()  // Should return 0
db.users.countDocuments()      // Should return 0
db.notifications.countDocuments()  // Should return 0

// Exit
exit
