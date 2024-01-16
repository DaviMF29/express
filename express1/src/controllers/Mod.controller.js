const modService = require('../services/mod.service')

const deletePost = async (req, res) => {
    try {
        const { userId, friendId } = req.body;

        const result = await modService.removeFriendService(userId, friendId);

        res.status(200).send(result);
    } catch (error) {
        console.error('Erro ao remover amigo:', error);
        res.status(500).send({ message: 'Ocorreu um erro ao remover o amigo.', error: error.message });
    }
};

module.exports = {deletePost}