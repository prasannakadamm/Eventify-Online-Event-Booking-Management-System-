const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User' // Can be null for system actions
    },
    action: {
        type: String,
        required: true // e.g., 'USER_LOGIN', 'EVENT_CREATED', 'BOOKING_CANCELLED'
    },
    module: {
        type: String,
        required: true // e.g., 'Auth', 'Event', 'Booking'
    },
    details: {
        type: mongoose.Schema.Types.Mixed
    },
    ipAddress: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('AuditLog', auditLogSchema);
