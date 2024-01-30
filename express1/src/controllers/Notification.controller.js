const notificationService = require('../services/notification.service');
const message = require("../services/messageErrorConfirm.service")


const findAllNotifications = async (req, res) => {
    try {
        const notifications = await notificationService.findAllNotifications();

        if (notifications.length === 0) {
            return res.status(404).send({ message: message.postNotFound });
        }

        res.send(notifications);
    } catch (error) {
        console.error('Erro ao buscar todos as notificações:', error);
        res.status(500).send({ message: "Ocorreu um erro ao buscar as notificações" });
    }
};

const createNotification = async (req, res) => {
    try {
        const { userId, username, type, createdAt } = req.body;

        if (!userId || !username || !type || !createdAt) {
            return res.status(400).send("Parâmetros inválidos. Certifique-se de fornecer userId, username, type e createdAt.");
        }

        const newNotification = await notificationService.createNotificationService({ userId, username, type, createdAt });

        return res.status(201).json(newNotification);
    } catch (error) {
        console.error("Erro durante a criação da notificação:", error);

        return res.status(500).send("Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.");
    }
};

module.exports = { createNotification };


const findAllNotificationsFromUser = async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(400).send("Usuário não encontrado");
        }

        const notifications = await notificationService.findAllNotificationsByUserId(userId);

        return res.status(200).json(notifications);
    } catch (error) {
        console.error("Erro ao resgatar dados das notificações:", error);
        return res.status(500).send("Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.");
    }
};

const markAsRead = async (req, res) => {
    try {
        res.status(200).json(req.updatedNotification);
    } catch (err) {
        console.error('Erro durante a atualização do usuário:', err);
        res.status(500).json({ message: "Ocorreu um erro ao atualizar o usuário" });
    }
};

module.exports = { findAllNotifications, createNotification, findAllNotificationsFromUser,markAsRead };
