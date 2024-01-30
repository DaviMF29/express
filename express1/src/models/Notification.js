const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
    },
    username: {
        type: String, required: true
    },
    type: {
        type: String, enum: ['follow', 'like', 'comment'], required: true
    },
    content: {
        type: String, required: false
    },
    isRead: {
        type: Boolean, default: false
    },
    createdAt: {
        type: Date, default: Date.now
    }
});


NotificationSchema.pre("save", async function (next) {
    next();
});

const Notification = mongoose.model("Notification", NotificationSchema);
module.exports = Notification;
