const postService = require("../services/post.service");

const createPost = async (req, res, next) => {
    try {
        const { text, id_user, username } = req.body;

        if (!text || !id_user) {
            return res.status(400).send("O texto da postagem e o ID do usuário são obrigatórios.");
        }

        const newPost = await postService.create({ text, id_user, username });

        return res.status(201).json({
            id_user: newPost.id_user, 
            username: newPost.username,
            id: newPost._id, 
            text: newPost.text 
        });
    } catch (error) {
        console.error("Erro durante a postagem:", error);
        res.status(500).send("Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente mais tarde.");
    }
};

const findAllPosts = async (req, res) => {
    try {
        const posts = await postService.findAllServices();

        if (posts.length === 0) {
            return res.status(404).send({ message: "Não há posts registrados" });
        }

        res.send(posts);
    } catch (error) {
        console.error('Erro ao buscar todos os posts:', error);
        res.status(500).send({ message: "Ocorreu um erro ao buscar os posts" });
    }
};

const findByUsername = async (req, res) => {
    try {
        const { username } = req.body; 
        if (!username) {
            return res.status(400).send({ message: 'O campo "username" é obrigatório no corpo da requisição.' });
        }
        const body = { username }; 
        const userPosts = await postService.findByUsernameService(body);
        if (!userPosts || userPosts.length === 0) {
            return res.status(404).send({ message: `Não há posts para o usuário ${username}` });
        }
        res.send(userPosts);
    } catch (error) {
        console.error('Erro durante a busca por nome de usuário:', error);
        res.status(500).send({ message: "Ocorreu um erro ao buscar os posts do usuário por nome de usuário" });
    }
};

const addCommentToPost = async (req, res) => {
    try {
        const { postId, username, text } = req.body;

        const post = await postService.findByIdService(postId);

        if (!post) {
            return res.status(404).send({ message: 'Postagem não encontrada.' });
        }

        const newComment = {
            username,
            text
        };

        post.comments.push(newComment);

        await post.save();

        res.status(201).send({ message: 'Comentário adicionado com sucesso.' });
    } catch (error) {
        console.error('Erro ao adicionar o comentário:', error);
        res.status(500).send({ message: 'Ocorreu um erro ao adicionar o comentário.' });
    }
};

const toggleLikeOnPost = async (req, res) => {
    try {
        const { postId, liked } = req.body;

        const post = await postService.findByIdService(postId);

        if (!post) {
            return res.status(404).send({ message: 'Postagem não encontrada.' });
        }

        if (liked) {
            post.likes += 1; 
            post.liked = true; 
        }

        await post.save();

        res.status(201).send({ message: 'Status de curtida alterado com sucesso.' });
    } catch (error) {
        console.error('Erro ao alterar o status de curtida:', error);
        res.status(500).send({ message: 'Ocorreu um erro ao alterar o status de curtida.' });
    }
};







module.exports = { createPost, findAllPosts, findByUsername, addCommentToPost,toggleLikeOnPost };
