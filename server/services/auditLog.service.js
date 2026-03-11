const AuditLog = require('../models/AuditLog');

const getLogs = async (filter = {}, limit = 100) => {
    return await AuditLog.find(filter).populate('user', 'name email').sort({ createdAt: -1 }).limit(limit);
};

const logAction = async (data) => {
    return await AuditLog.create(data);
};

module.exports = { getLogs, logAction };
