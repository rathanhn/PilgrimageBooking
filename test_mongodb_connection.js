// Test MongoDB Connection Script
// Run this to test your MongoDB connection

const { mongoose, Booking, User, Notification } = require('./backend/database');

async function testConnection() {
    try {
        console.log('🔄 Testing MongoDB connection...');
        
        // Test connection
        await mongoose.connection.asPromise();
        console.log('✅ MongoDB connected successfully!');
        
        // Test database operations
        console.log('🔄 Testing database operations...');
        
        // Count documents in each collection
        const bookingCount = await Booking.countDocuments();
        const userCount = await User.countDocuments();
        const notificationCount = await Notification.countDocuments();
        
        console.log(`📊 Database Stats:`);
        console.log(`   - Bookings: ${bookingCount}`);
        console.log(`   - Users: ${userCount}`);
        console.log(`   - Notifications: ${notificationCount}`);
        
        // Test creating a test document
        console.log('🔄 Testing document creation...');
        const testNotification = new Notification({
            userEmail: 'test@example.com',
            message: 'Test notification from Vercel MongoDB',
            type: 'info'
        });
        
        await testNotification.save();
        console.log('✅ Test document created successfully!');
        
        // Clean up test document
        await Notification.deleteOne({ _id: testNotification._id });
        console.log('🧹 Test document cleaned up');
        
        console.log('🎉 All tests passed! Your Vercel MongoDB is working correctly.');
        
    } catch (error) {
        console.error('❌ Error testing MongoDB connection:', error.message);
        console.error('Please check your connection string and try again.');
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Disconnected from MongoDB');
        process.exit(0);
    }
}

// Run the test
testConnection();
