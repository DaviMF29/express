const mongoose = require("mongoose")
const userService = require('../services/user.service')
const postService = require('../services/post.service')

const validId = (req, res, next) => {
    const id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({ message: "Usuário não encontrado" })
    }
    next()
}
const validPostId = async (req, res, next) => {
    const postId = req.params.idPost;

    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return res.status(400).send({ message: "ID de post inválido" });
    }

    try {
        const post = await postService.findByIdService(postId);

        if (!post) {
            return res.status(404).send({ message: "Post não encontrado" });
        }

        req.post = post; 
        next();
    } catch (error) {
        console.error('Erro ao buscar post por ID:', error);
        res.status(500).send({ message: "Ocorreu um erro ao buscar o post por ID" });
    }
};


const validUser = async (req, res, next) => {
    const id = req.params.id

    const user = await userService.findByIdService(id)

    if (!user) {
        return res.status(400).send({ message: "Usuário não encontrado" })
    }

    req.id = id
    req.user = user

    next()
}

const validUsername = async (req, res, next) => {
    const name = req.params.username;

    const user = await userService.findByUsernameService(name);

    if (!user) {
        return res.status(404).send({ message: "Usuário não encontrado" });
    }

    next();
};

const validModerator = async (req, res, next) => {
    const modId = req.body.id

    const mod = await userService.findByIdService(modId)

    if (!mod) {
        return res.status(404).send({ message: "Usuário não encontrado" });
    }

    if (mod.role !== "moderador") {
        return res.status(401).send({ message: "Usuário não tem essa permissão" });
    }

    next()
}


module.exports = { validId, validUser, validUsername, validModerator,validPostId }