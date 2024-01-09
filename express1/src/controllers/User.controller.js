const userService = require('../services/user.service');

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
            return res.status(404).send({ message: "Não há usuários cadastrados" });
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

const update = async (req, res) => {
    try {
        const { name, username, email } = req.body;

        if (!name && !username && !email) {
            return res.status(400).send({ message: "Pelo menos um campo (name, username ou email) precisa ser alterado" });
        }

        const { id } = req;
        await userService.updateService(id, name, username, email);

        res.send({ message: "Usuário atualizado com sucesso" });
    } catch (error) {
        console.error('Erro durante a atualização do usuário:', error);
        res.status(500).send({ message: "Ocorreu um erro ao atualizar o usuário" });
    }
};

module.exports = { create, findAllUsers, findById, findByUsername, update };
