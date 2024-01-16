const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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

// Adicionando um pré-processador para criptografar a senha antes de salvar
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

const User = mongoose.model('User', userSchema);

// Criando um modelo de moderador baseado no modelo de usuário
const Moderator = User.discriminator('Moderator',
    new mongoose.Schema({
        // Adicione campos específicos do moderador aqui
        permissions: {
            type: [String],
            default: []
        }
    })
);

module.exports = { User, Moderator };
