const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select:false
    }
});

userSchema.pre("save", async function(next){
    this.password = await bcrypt.hash(this.password,10)
    next()
})

const User = mongoose.model("User", userSchema); 
module.exports = User;
