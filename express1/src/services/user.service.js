const User = require("../models/User");
const message = require("./messageErrorConfirm.service")

const create = async (body) => {
    return User.create(body);
};

const findAllServices = () => {
    return User.find()
}

const findByIdService = (id) => {
    return User.findById(id)
}

const findByUsernameService = (username) => {
    return User.findOne({ username: { $regex: new RegExp(username, 'i') } });
};

const updateService = (id, newData) => {
    try {
        return User.findOneAndUpdate({ _id: id }, newData, { new: true });
    } catch (error) {
        throw new Error('Erro ao atualizar o usuário');
    }
};

const findFriendByIdService = async (id) => {
    try {
        const user = await findByIdService(id);

        if (!user) {
            return { success: false, message: message.userNotFound };
        }

        const friends = user.friends || [];

        return { success: true, friends };
    } catch (error) {
        console.error('Erro ao buscar amigos por ID:', error);
        return { success: false, error: 'Erro ao buscar amigos por ID' };
    }
};

const findCommonFriendsService = async (userId, friendId) => {
    try {
        const user1 = await findByIdService(userId);
        const user2 = await findByIdService(friendId);

        if (!user1 || !user2) {
            return res.status(404).send({ message: message.userNotFound });
        }


        const friends1 = user1.friends.map(friend => friend.username);
        const friends2 = user2.friends.map(friend => friend.username);

        const commonFriends = friends1.filter(friend => friends2.includes(friend));
        return commonFriends;
    } catch (error) {
        console.error('Erro em findCommonFriendsService:', error);
        throw new Error('Ocorreu um erro ao encontrar amigos em comum.');
    }
};

const removeFriendService = async (userId, friendId) => {
    try {
        const user1 = await findByIdService(userId);
        const user2 = await findByIdService(friendId);

        if (!user1 || !user2) {
            return res.status(404).send({ message: message.userNotFound });
        }

        const isFriendAdded = user1.friends.some(friend => friend.username === user2.username);

        if (isFriendAdded) {
            user1.friends = user1.friends.filter(friend => friend.username !== user2.username);

            const isFriendAddedBack = user2.friends.some(friend => friend.username === user1.username);
            if (isFriendAddedBack) {
                user2.friends = user2.friends.filter(friend => friend.username !== user1.username);
                await user2.save();
            }

            await user1.save();

            return { message: 'Amizade removida com sucesso.' };
        } else {
            throw new Error('Esses usuários não são amigos.');
        }
    } catch (error) {
        console.error('Erro ao remover amigo no serviço:', error);
        throw new Error('Ocorreu um erro ao remover a amizade.');
    }
};

const findAllFriendsService = async (userId) => {
    try {
        const user = await findFriendByIdService(userId);

        if (!user) {
            return res.status(404).send({ message: message.userNotFound });
        }

        const friends = user.friends;

        return { friends };
    } catch (error) {
        console.error('Erro ao encontrar amigos no serviço:', error);
        throw new Error('Ocorreu um erro ao buscar os amigos. Por favor, tente novamente mais tarde.');
    }
};

const addRemovePostToFavoritesService = async (postId, userId) => {
    try {
        const user = await findByIdService(userId);

        if (!user) {
            return res.status(404).send({ message: message.userNotFound });
        }

        const index = user.favoritePosts.indexOf(postId);

        if (index !== -1) {
            user.favoritePosts.splice(index, 1);
            await user.save();
            return { message: 'Postagem removida dos favoritos com sucesso.' };
        } else {
            user.favoritePosts.push(postId);
            await user.save();
            return { message: 'Postagem adicionada aos favoritos com sucesso.' };
        }
    } catch (error) {
        console.error('Erro ao adicionar/remover dos favoritos no serviço:', error);
        throw new Error('Ocorreu um erro ao adicionar/remover dos favoritos. Por favor, tente novamente mais tarde.');
    }
};

const addFriendService = async (userId, friendId) => {
    try {
        const user = await findByIdService(userId);
        const friend = await findByIdService(friendId);

        if (!user || !friend) {
            return res.status(404).send({ message: message.userNotFound });
        }

        const isFriendAlreadyAdded = user.friends.some(f => f.username === friend.username);

        if (isFriendAlreadyAdded) {
            throw new Error('Este usuário já é seu amigo.');
        }

        // Adicionar amigo ao usuário
        user.friends.push({ username: friend.username });

        // Adicionar usuário ao amigo (tornar amizade bidirecional)
        friend.friends.push({ username: user.username });

        await Promise.all([user.save(), friend.save()]);

        return { message: 'Amigo adicionado com sucesso.' };
    } catch (error) {
        console.error('Erro ao adicionar o amigo no serviço:', error);
        throw new Error('Ocorreu um erro ao adicionar o amigo. Por favor, tente novamente mais tarde.');
    }
};

const promoteToModeratorService = async (userId) => {
    try {
        const user = await findByIdService(userId);

        if (!user) {
            return { success: false, message: message.userNotFound };
        }

        if (user.role === 'moderador') {
            return { alreadyModerator: true, message: 'Usuário já é moderador.' };
        }

        user.role = 'moderador';
        await user.save();

        return { success: true, message: 'Usuário agora é moderador.' };
    } catch (error) {
        console.error('Erro ao promover usuário a moderador:', error);
        return { success: false, message: 'Ocorreu um erro ao promover o usuário a moderador.' };
    }
};

const deleteUserById = async (userId) => {
    return User.findOneAndDelete({ _id: userId });
};


module.exports = {
    create,
    findAllServices,
    findByIdService,
    findByUsernameService,
    updateService,
    findFriendByIdService,
    findCommonFriendsService,
    removeFriendService,
    findAllFriendsService,
    addRemovePostToFavoritesService,
    addFriendService,
    promoteToModeratorService,
    deleteUserById,
};
