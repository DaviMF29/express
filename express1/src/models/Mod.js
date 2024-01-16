const mongoose = require("mongoose");
const User = require("./User");

const moderatorSchema = new mongoose.Schema({
    
});

class ModeratorClass extends User {
    moderateMessage(message) {
        console.log(`${this.username} moderated: ${message}`);
    }
}

moderatorSchema.loadClass(ModeratorClass);

const Moderator = mongoose.model("Moderator", moderatorSchema);
module.exports = Moderator;
