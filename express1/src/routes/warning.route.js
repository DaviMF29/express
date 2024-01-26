const express = require("express");
const route = express.Router();
const warningController = require('../controllers/Warning.controller');
const { authMiddleware } = require('../middlewares/auth.middlewares');
const {checkModerator} = require('../middlewares/global.middlewares');

route.get("/",warningController.findAllWarnings)
route.post("/create",authMiddleware,checkModerator, warningController.createWarning);


module.exports = route;
