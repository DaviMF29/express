const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    id_user: {
        type: String
    },
    username: {
        type: String
    },
    text: {
        type: String
    },
    likes: {
        type: Number,
        default: 0 // Valor padrão inicial para a quantidade de curtidas
    },
    comments: [
        {
            username: {
                type: String 
            },
            text: {
                type: String
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
});

postSchema.pre("save", async function(next) {
    next();
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
