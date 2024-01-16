const route = require("express").Router();
const authController = require("../controllers/Mod.controller"); 


route.post("/", authController.login);

module.exports = route; 
