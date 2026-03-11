const auditLogService = require('../services/auditLog.service');

const getLogs = async (req, res, next) => {
    try {
        const logs = await auditLogService.getLogs(req.query);
        res.status(200).json(logs);
    } catch (error) { next(error); }
};

module.exports = { getLogs };
