const express = require("express");
const route = express.Router();
const notificationController = require('../controllers/Notification.controller');
const { authMiddleware } = require('../middlewares/auth.middlewares');
const { markNotificationAsReadMiddleware } = require("../middlewares/global.middlewares")


route.get("/", notificationController.findAllNotifications)
route.get("/:userId",notificationController.findAllNotificationsFromUser)
route.post("/", notificationController.createNotification);
route.put("/updateisread/:notificationId",markNotificationAsReadMiddleware,notificationController.markAsRead)


module.exports = route;
