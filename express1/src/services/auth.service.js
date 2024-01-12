const User = require("../models/User")
const jwt = require("jsonwebtoken")

const loginService = async (email) => {
    try {
        const user = await User.findOne({ email }).select('+password');
        return user;
    } catch (error) {
        console.error('Erro ao buscar usuário para login:', error);
        throw new Error('Ocorreu um erro durante o login. Por favor, tente novamente mais tarde.');
    }
};

const generateToken = (id) => jwt.sign({id: id}, process.env.SECRET_JWT, {expiresIn: 86400})

module.exports = {loginService,generateToken}
