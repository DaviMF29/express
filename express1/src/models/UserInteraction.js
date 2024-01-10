const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    friends: [
        {
            username: {
                type: String 
            }
        }
    ],
    favoritePosts:[{
        posts :{
            type:Object
        }
    }]
});


const User = mongoose.model("User", userSchema); 
module.exports = User;