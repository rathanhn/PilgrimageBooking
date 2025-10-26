// Frontend Configuration for Pilgrimage Booking System
// This file contains API endpoints and other frontend configuration

const config = {
    // API Configuration
    // ✅ Using production backend URL
    API_BASE_URL: 'https://pilgrimage-backend.vercel.app',
    
    // API Endpoints
    ENDPOINTS: {
        BOOK: '/book',
        GET_BOOKING: '/api/getBooking',
        LOGIN: '/api/login',
        REGISTER: '/api/register',
        ADMIN_LOGIN: '/api/admin-login',
        USER_BOOKINGS: '/api/user-bookings',
        BOOKINGS: '/api/bookings',
        UPDATE_BOOKING: '/api/updateBooking',
        DELETE_BOOKING: '/api/deleteBooking',
        CLEAR_BOOKINGS: '/api/clearBookings',
        CANCEL_BOOKING: '/api/:id/cancel',
        NOTIFICATIONS: '/api/notifications',
        NOTIFICATIONS_READ: '/api/notifications/read',
        NOTIFICATIONS_CLEAR_ALL: '/api/notifications/clear-all',
        NOTIFICATIONS_SEND: '/api/notifications/send',
        NOTIFICATIONS_BROADCAST: '/api/notifications/broadcast',
        ADMIN_STATS: '/admin/stats'
    },
    
    // Helper function to get full API URL
    getApiUrl: function(endpoint) {
        return this.API_BASE_URL + endpoint;
    },
    
    // Helper function to get API URL with parameters
    getApiUrlWithParams: function(endpoint, params) {
        const url = new URL(this.API_BASE_URL + endpoint);
        if (params && typeof params === 'object') {
            Object.keys(params).forEach(key => {
                if (params[key] !== null && params[key] !== undefined) {
                    url.searchParams.append(key, params[key]);
                }
            });
        }
        return url.toString();
    },
    
    // Helper function to make API requests
    makeApiRequest: async function(endpoint, options = {}) {
        const url = this.getApiUrl(endpoint);
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        
        const finalOptions = { ...defaultOptions, ...options };
        
        try {
            const response = await fetch(url, finalOptions);
            const data = await response.json();
            return { response, data };
        } catch (error) {
            console.error('API Request Error:', error);
            throw error;
        }
    }
};

// Debug logging
console.log('🔧 AppConfig initialized with API_BASE_URL:', config.API_BASE_URL);

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = config;
} else {
    // For browser usage
    window.AppConfig = config;
}
