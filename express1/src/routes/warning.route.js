const express = require("express");
const route = express.Router();
const warningController = require('../controllers/Warning.controller');
const { authMiddleware } = require('../middlewares/auth.middlewares');
const {checkModerator} = require('../middlewares/global.middlewares');


route.post("/warning",authMiddleware,checkModerator, warningController.createWarning);


module.exports = route;
