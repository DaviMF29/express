const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let User;
try {
    User = mongoose.model('User');
} catch (e) {
    const userSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            select: false
        },
        friends: [
            {
                username: {
                    type: String
                }
            }
        ],
        favoritePosts: [{
            posts: {
                type: Object
            }
        }]
    });

    userSchema.pre('save', async function (next) {
        if (this.isModified('password')) {
            this.password = await bcrypt.hash(this.password, 10);
        }
        next();
    });

    User = mongoose.model('User', userSchema);
}

const Moderator = User.discriminator('Moderator',
    new mongoose.Schema({
        permissions: {
            type: [String],
            default: []
        }
    })
);

module.exports = { User, Moderator };
