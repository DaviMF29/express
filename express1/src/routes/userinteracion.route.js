const route = require("express").Router();
const userInteractionController = require('../controllers/UserInteraction.controller');
const { validId, validUser, validUsername } = require('../middlewares/global.middlewares');

route.post("/favorites",userInteractionController.addPostToFavorites)
route.post("/friends",userInteractionController.findAllFriends)

module.exports = route;
