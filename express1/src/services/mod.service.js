const Mod = require('../models/Mod')

const deletePost = async (userId, friendId) => {
    try {
        const user1 = await findByIdService(userId);
        const user2 = await findByIdService(friendId);

        if (!user1 || !user2) {
            throw new Error('Usuário não encontrado.');
        }

        const isFriendAdded = user1.friends.some(friend => friend.username === user2.username);

        if (isFriendAdded) {
            user1.friends = user1.friends.filter(friend => friend.username !== user2.username);
            await user1.save();
        }

        return { message: 'Amigo removido com sucesso.' };
    } catch (error) {
        console.error('Erro ao remover amigo no serviço:', error);
        throw new Error('Ocorreu um erro ao remover o amigo.');
    }
};

module.exports = {deletePost}