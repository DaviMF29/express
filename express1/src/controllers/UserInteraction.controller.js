const userService = require('../services/user.service');


const addPostToFavorites = async (req, res) => {
    try {
        const { postId, userId } = req.body;
        
        const user = await userService.findByIdService(userId);

        if (!user) {
            return res.status(404).send({ message: 'Usuário não encontrado.' });
        }

        const index = user.favoritePosts.indexOf(postId);
        if (index !== -1) {                                   //se o índice for diferente de -1, isso significa que o elemento foi encontrado no array 
            user.favoritePosts.splice(index, 1);
            await user.save();
            res.status(200).send({ message: 'Postagem removida dos favoritos com sucesso.' });
        } else {
            user.favoritePosts.push(postId);
            await user.save();
            res.status(201).send({ message: 'Postagem adicionada aos favoritos com sucesso.' });
        }
    } catch (error) {
        console.error('Erro ao adicionar/remover dos favoritos:', error);
        res.status(500).send({ message: 'Ocorreu um erro ao adicionar/remover dos favoritos.', error: error.message });
    }
};

const findAllFriends = async (req, res) => {
    try {
        const userId = req.body.userId;
        const user = await userService.findByIdService(userId);

        if (!user) {
            return res.status(404).send({ message: 'Usuário não encontrado.' });
        }

        const friends = user.friends;

        return res.status(200).send({ friends });
    } catch (error) {
        console.error('Erro ao encontrar amigos:', error);
        res.status(500).send({ message: 'Ocorreu um erro ao buscar os amigos. Por favor, tente novamente mais tarde.' });
    }
};


module.exports = {addPostToFavorites,findAllFriends}