const Notification = require("../models/Notification");

const findAllNotifications = async () => {
    return Notification.find()
}

const findAllNotificationsByUserId = async (userId) => {
    return Notification.find({ userId: userId })
}

const createNotificationService = async (body) => {
    return Notification.create(body)
};
const markNotificationAsRead = async (notificationId) => {
    try {
        const notification = await Notification.findById(notificationId);

        if (!notification) {
            throw new Error('Notificação não encontrada.');
        }

        notification.isRead = true;

        const updatedNotification = await notification.save();

        return updatedNotification;
    } catch (error) {
        throw new Error('Erro ao marcar a notificação como lida: ' + error.message);
    }
};
module.exports = { findAllNotifications, findAllNotificationsByUserId, createNotificationService, markNotificationAsRead }

