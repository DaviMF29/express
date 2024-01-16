const route = require("express").Router();
const authController = require("../controllers/Auth.controller"); 


route.post("/", authController.login);

module.exports = route; 
