// Test MongoDB Atlas Integration
const { mongoose, Booking, User, Notification } = require('./backend/database');

async function testAtlasIntegration() {
    try {
        console.log('🔄 Testing MongoDB Atlas Integration...');
        
        // Test connection
        await mongoose.connection.asPromise();
        console.log('✅ Connected to MongoDB Atlas successfully!');
        
        // Test creating a booking
        console.log('🔄 Testing booking creation...');
        const testBooking = new Booking({
            temple: 'Test Temple - Atlas',
            date: '2024-01-15',
            time: '10:00 AM',
            name: 'Atlas Test User',
            mobile: '1234567890',
            email: 'atlas-test@example.com',
            aadhaar: '123456789012',
            ticketId: 'ATLAS-TEST-123',
            status: 'Pending'
        });
        
        await testBooking.save();
        console.log('✅ Test booking created in Atlas!');
        
        // Test creating a notification
        console.log('🔄 Testing notification creation...');
        const testNotification = new Notification({
            userEmail: 'atlas-test@example.com',
            message: 'Test notification from MongoDB Atlas',
            type: 'success'
        });
        
        await testNotification.save();
        console.log('✅ Test notification created in Atlas!');
        
        // Test creating a user
        console.log('🔄 Testing user creation...');
        const testUser = new User({
            username: 'atlas-test-user',
            email: 'atlas-test@example.com',
            mobile: '1234567890',
            password: 'hashed-password'
        });
        
        await testUser.save();
        console.log('✅ Test user created in Atlas!');
        
        // Count all documents
        const bookingCount = await Booking.countDocuments();
        const userCount = await User.countDocuments();
        const notificationCount = await Notification.countDocuments();
        
        console.log('📊 Atlas Database Stats:');
        console.log(`   - Bookings: ${bookingCount}`);
        console.log(`   - Users: ${userCount}`);
        console.log(`   - Notifications: ${notificationCount}`);
        
        // Clean up test data
        console.log('🧹 Cleaning up test data...');
        await Booking.deleteMany({ email: 'atlas-test@example.com' });
        await User.deleteMany({ email: 'atlas-test@example.com' });
        await Notification.deleteMany({ userEmail: 'atlas-test@example.com' });
        console.log('✅ Test data cleaned up');
        
        console.log('🎉 MongoDB Atlas integration test completed successfully!');
        console.log('Your application is ready to use with MongoDB Atlas!');
        
    } catch (error) {
        console.error('❌ Error testing Atlas integration:', error.message);
        console.error('Full error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('🔌 Disconnected from MongoDB Atlas');
        process.exit(0);
    }
}

// Run the test
testAtlasIntegration();
