const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/pilgrimage_bookings", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

/* Booking Schema */
const bookingSchema = new mongoose.Schema({
    temple: String,
    date: String,
    time: String,
    name: String,
    mobile: String,
    email: String,
    aadhaar: String,
    ticketId: String,
    transactionId: String,
    status: { type: String, default: "Pending" }
});

/* User Schema */
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    mobile: String,
    password: String
});

/* Notification Schema */
const notificationSchema = new mongoose.Schema({
    userEmail: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, default: "info" },
    read: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

const Booking = mongoose.model("Booking", bookingSchema);
const User = mongoose.model("User", userSchema);
const Notification = mongoose.model("Notification", notificationSchema);

module.exports = {
    mongoose,
    Booking,
    User,
    Notification
};
