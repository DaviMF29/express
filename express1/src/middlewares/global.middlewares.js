const mongoose = require("mongoose")
const userService = require('../services/user.service')
const postService = require('../services/post.service')
const notificationService = require('../services/notification.service')

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

const checkModerator = async (req, res, next) => {
    try {
        // Extrai o userId do req após passar pelo middleware de autenticação
        const userId = req.userId;

        const user = await userService.findByIdService(userId);

        if (!user) {
            return res.status(404).send({ message: "Usuário não encontrado" });
        }

        if (user.role === "moderador") {
            // Se o usuário for moderador, continua para a próxima rota/middleware
            next();
        } else {
            return res.status(403).send({ message: "Usuário não tem permissão para realizar esta ação" });
        }
    } catch (error) {
        console.error('Erro no middleware checkModerator:', error);
        res.status(500).send({ message: 'Ocorreu um erro ao processar a solicitação.' });
    }
};

const validModeratorOrOwner = async (req, res, next) => {
    try {
        const userId = req.body.userId;
        const postId = req.params.idPost;

        const user = await userService.findByIdService(userId);
        const post = await postService.findByIdService(postId);

        if (!user || !post) {
            return res.status(404).send({ message: "Usuário ou post não encontrado" });
        }

        if (user.role === "moderador" || post.userId === userId) {
            next();
        } else {
            return res.status(403).send({ message: "Usuário não tem permissão para realizar esta ação" });
        }
    } catch (error) {
        console.error('Erro no middleware validModeratorOrOwner:', error);
        res.status(500).send({ message: 'Ocorreu um erro ao processar a solicitação.' });
    }
};


const checkUser = (req, res, next) => {
    const { userId } = req.body;

    if (!userId) {
        return res.status(404).send({ message: 'Usuário não encontrado' });
    }

    req.userId = userId;
    next();
};


const markNotificationAsReadMiddleware = async (req, res, next) => {
    try {
        const { notificationId } = req.params;
        const updatedNotification = await notificationService.markNotificationAsRead(notificationId);

        req.updatedNotification = updatedNotification;

        next();
    } catch (error) {
        console.error('Erro no middleware markNotificationAsReadMiddleware:', error);
        res.status(500).send('Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.');
    }
};




module.exports =
{
    validId,
    validUser,
    validUsername,
    checkUser,
    checkModerator,
    validModeratorOrOwner,
    validPostId,
    markNotificationAsReadMiddleware
}



