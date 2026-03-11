const notificationService = require('../services/notification.service');

// @desc    Get my notifications
// @route   GET /api/notifications
// @access  Private
const getMyNotifications = async (req, res, next) => {
    try {
        const notifications = await notificationService.getAllNotifications({ user: req.user.id });
        res.status(200).json(notifications);
    } catch (error) {
        next(error);
    }
};

// @desc    Mark notification as read
// @route   PUT /api/notifications/:id/read
// @access  Private
const markAsRead = async (req, res, next) => {
    try {
        const notification = await notificationService.getNotificationById(req.params.id);
        if (notification.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        const updated = await notificationService.markAsRead(req.params.id);
        res.status(200).json(updated);
    } catch (error) {
        next(error);
    }
};

// @desc    Delete notification
// @route   DELETE /api/notifications/:id
// @access  Private
const deleteNotification = async (req, res, next) => {
    try {
        const notification = await notificationService.getNotificationById(req.params.id);
        if (notification.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        const result = await notificationService.deleteNotification(req.params.id);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getMyNotifications,
    markAsRead,
    deleteNotification
};
