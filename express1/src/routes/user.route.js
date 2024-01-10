const route = require("express").Router();
const userController = require('../controllers/User.controller');
const { validId, validUser, validUsername } = require('../middlewares/global.middlewares');

route.post("/", userController.create);
route.get("/", userController.findAllUsers);
route.get("/:id", validId, validUser, userController.findById);
route.patch("/:id", userController.update);
route.get("/search/:username",validUsername, userController.findByUsername);
route.post("/adicionar",userController.addFriend)

module.exports = route;
