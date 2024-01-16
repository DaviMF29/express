const userService = require('../services/user.service');
const message = require("../services/messageErrorConfirm.service")

const create = async (req, res) => {
    try {
        const { name, username, email, password, confirmpassword } = req.body;

        if (!name || !username || !email || !password || !confirmpassword) {
            return res.status(400).send({ message: "Todos os campos precisam estar preenchidos" });
        }

        if (password !== confirmpassword) {
            return res.status(400).send({ message: "As senhas não coincidem" });
        }

        const user = await userService.create(req.body);

        if (!user) {
            return res.status(400).send({ message: "Erro ao criar usuário" });
        }

        res.status(201).send({
            message: "Usuário criado com sucesso",
            user: {
                id: user._id,
                name,
                username,
                email,
            }
        });
    } catch (error) {
        console.error('Erro ao criar usuário:', error);
        res.status(500).send({ message: "Ocorreu um erro ao processar a solicitação" });
    }
};

const findAllUsers = async (req, res) => {
    try {
        const users = await userService.findAllServices();

        if (users.length === 0) {
            return res.status(404).send({ message: message.userNotFound });
        }

        res.send(users);
    } catch (error) {
        console.error('Erro ao buscar todos os usuários:', error);
        res.status(500).send({ message: "Ocorreu um erro ao buscar os usuários" });
    }
};

const findById = async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    } catch (error) {
        console.error('Erro ao buscar usuário por ID:', error);
        res.status(500).send({ message: "Ocorreu um erro ao buscar o usuário por ID" });
    }
};

const findByUsername = async (req, res) => {
    try {
        const username = req.params.username;
        const user = await userService.findByUsernameService(username);

        res.send(user);
    } catch (error) {
        console.error('Erro durante a busca por nome de usuário:', error);
        res.status(500).send({ message: "Ocorreu um erro ao buscar o usuário por nome de usuário" });
    }
};

const updateUser = async (req, res) => {
    try {
        const { name, username, email } = req.body;

        if (!name && !username && !email) {
            return res.status(400).send({ message: "Informe pelo menos um campo para atualização" });
        }

        const id = req.params.id;

        await userService.updateService(
            id,
            { name, username, email }
        );

        res.send({ message: "Usuário atualizado com sucesso!" });
    } catch (err) {
        console.error('Erro durante a atualização do usuário:', err);
        res.status(500).send({ message: "Ocorreu um erro ao atualizar o usuário" });
    }
};

const addFriend = async (req, res) => {
    try {
        const { userId, friendId } = req.body;
        const result = await userService.addFriendService(userId, friendId);

        res.status(201).send(result);
    } catch (error) {
        console.error('Erro ao adicionar o amigo:', error);
        res.status(500).send({ message: error.message });
    }
};

const addPostToFavorites = async (req, res) => {
    try {
        const { postId, userId } = req.body;
        const result = await userService.addRemovePostToFavoritesService(postId, userId);

        res.status(200).send(result);
    } catch (error) {
        console.error('Erro ao adicionar/remover dos favoritos:', error);
        res.status(500).send({ message: error.message });
    }
};

const findAllFriends = async (req, res) => {
    try {
        const userId = req.body.userId;
        const result = await userService.findAllFriendsService(userId);

        res.status(200).send(result);
    } catch (error) {
        console.error('Erro ao encontrar amigos:', error);
        res.status(500).send({ message: error.message });
    }
};

const removeFriend = async (req, res) => {
    try {
        const { userId, friendId } = req.body;

        const result = await userService.removeFriendService(userId, friendId);

        res.status(200).send(result);
    } catch (error) {
        console.error('Erro ao remover amigo:', error);
        res.status(500).send({ message: 'Ocorreu um erro ao remover o amigo.', error: error.message });
    }
};

const recommendFriends = async (req, res) => {
    try {
        const { userId, friendId } = req.body;
        const commonFriends = await userService.findCommonFriendsService(userId, friendId);
        const quantFriendsCommon = commonFriends.length; // Quantidade de amigos em comum (usar para sistema de recomendação)

        res.status(200).json({ commonFriends, quantFriendsCommon });
    } catch (error) {
        console.error('Erro ao encontrar amigos em comum:', error);
        res.status(500).json({ message: 'Ocorreu um erro ao encontrar amigos em comum.', error: error.message });
    }
};

const promoteToModerator = async (req, res) => {
    try {
        const papel = "moderador";
        const { userId } = req.body;

        const result = await userService.promoteToModeratorService(userId);

        if (result.success) {
            res.status(200).send({ message: message.addedRole, papel });
        } else if (result.status === 200 && result.message === 'Usuário já é moderador.') {
            res.status(200).send({ message: 'Usuário já é moderador.' });
        } else {
            res.status(404).send({ message: result.message });
        }
    } catch (error) {
        console.error('Erro no controlador ao promover usuário a moderador:', error);
        res.status(500).send({ message: 'Ocorreu um erro ao processar a solicitação.' });
    }
};

module.exports = {
    create,
    findAllUsers,
    findById,
    findByUsername,
    updateUser,
    addFriend,
    addPostToFavorites,
    findAllFriends,
    removeFriend,
    recommendFriends,
    promoteToModerator
};
