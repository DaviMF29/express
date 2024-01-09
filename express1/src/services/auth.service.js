const User = require("../models/User")

const loginService = (email) =>{
    return User.findOne({email:email})
}

module.exports = loginService
