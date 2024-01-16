const postService = require("../services/post.service");
const message = require("../services/messageErrorConfirm.service")

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
        const { postId } = req.body;

        if (!postId) {
            return res.status(400).send({ message: 'O campo "postId" é obrigatório no corpo da requisição.' });
        }

        const post = await postService.findByIdService(postId);

        if (!post) {
            return res.status(404).send({ message: message.postNotFound });
        }

        res.send(post);
    } catch (error) {
        console.error('Erro ao buscar postagem por ID:', error);
        res.status(500).send({ message: 'Ocorreu um erro ao buscar a postagem por ID.' });
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
            return res.status(404).send({ message: message.userPostNotFound,username});
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
        const { postId, userId, userIdPost } = req.body;

        if (userId !== userIdPost) {
            throw new Error("Usuário não tem permissão para realizar esta ação");
        }

        const existingPost = await postService.findByIdService(postId);

        if (!existingPost) {
            return res.status(404).send({ message: message.postNotFound });
        }

        await postService.deletePostById(postId);

        res.status(200).send({ message: 'Postagem removida com sucesso.' });
    } catch (error) {
        console.error('Erro ao excluir postagem:', error);
        res.status(500).send({ message: 'Ocorreu um erro ao excluir a postagem.', error: error.message });
    }
};



module.exports = { createPost, findAllPosts, findById, findByUsername, addCommentToPost, toggleLikeOnPost, deletePost };
