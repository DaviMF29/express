const route = require("express").Router();
const userController = require('../controllers/User.controller');
const { validId, validUser, validUsername } = require('../middlewares/global.middlewares');

route.post("/", userController.create);
route.get("/", userController.findAllUsers);
route.get("/:id", validId, validUser, userController.findById);
route.patch("/:id", userController.updateUser);
route.get("/search/:username",validUsername, userController.findByUsername);
route.post("/adicionar",userController.addFriend)
route.post("/favorites",userController.addPostToFavorites)
route.post("/friends",userController.findAllFriends)
route.post("/removeFriend",userController.removeFriend)
route.post("/friendRecommended",userController.recommendFriends)
route.post("/promoveToModerator",userController.promoteToModerator)

module.exports = route;
