const postService = require("../services/post.service");
const message = require("../services/messageErrorConfirm.service")

const createPost = async (req, res, next) => {
    try {
        const userId = req.userId;

        const { text, username } = req.body;

        if (!text) {
            return res.status(400).send("O texto da postagem é obrigatório.");
        }

        const newPost = await postService.create({
            text,
            id_user: userId, // Use o ID do usuário recuperado do token
            username
        });

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
            return res.status(404).send({ message: message.postNotFound });
        }

        res.send(posts);
    } catch (error) {
        console.error('Erro ao buscar todos os posts:', error);
        res.status(500).send({ message: "Ocorreu um erro ao buscar os posts" });
    }
};

const findById = async (req, res) => {
    try {
        const post = req.post;
        res.send(post)
    } catch (error) {
        console.error('Erro ao buscar post por ID:', error);
        res.status(500).send({ message: "Ocorreu um erro ao buscar o post por ID" });
    }
};

const findByUsername = async (req, res) => {
    try {
        const username = req.params.username;
        const user = await postService.findByUsernameService(username);

        res.send(user);
    } catch (error) {
        console.error('Erro durante a busca por nome de usuário:', error);
        res.status(500).send({ message: "Ocorreu um erro ao buscar o usuário por nome de usuário" });
    }
};

const addCommentToPost = async (req, res) => {
    try {
        const { postId, username, text } = req.body;

        const post = await postService.findByIdService(postId);

        if (!post) {
            return res.status(404).send({ message: message.postNotFound });
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
            return res.status(404).send({ message: message.postNotFound });
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

const deletePost = async (req, res) => {
    try {
        const { userId, userIdPost } = req.body;
        const postId = req.params.idPost;

        // O middleware validModeratorOrOwner já cuida da verificação do usuário

        const existingPost = await postService.findByIdService(postId);

        if (!existingPost) {
            return res.status(404).send({ message: 'Post não encontrado' });
        }

        await postService.deletePostById(postId);

        res.status(200).send({ message: 'Postagem removida com sucesso.' });
    } catch (error) {
        console.error('Erro ao excluir postagem:', error);
        res.status(500).send({ message: 'Ocorreu um erro ao excluir a postagem.', error: error.message });
    }
};

module.exports = { createPost, findAllPosts, findById, findByUsername, addCommentToPost, toggleLikeOnPost, deletePost };
