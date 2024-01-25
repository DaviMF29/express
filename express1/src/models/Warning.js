const mongoose = require("mongoose");

const warningSchema = new mongoose.Schema({
    text: {
        type: String
    }
});

warningSchema.pre("save", async function(next) {
    next();
});

const Warning = mongoose.model("Warning", warningSchema);
module.exports = Warning;
