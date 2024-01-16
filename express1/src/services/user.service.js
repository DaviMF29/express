const User = require("../models/User");

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
            return { success: false, error: 'Usuário não encontrado' };
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
            console.log('Usuário não encontrado.');
            return [];
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

const findAllFriendsService = async (userId) => {
    try {
        const user = await findFriendByIdService(userId);

        if (!user) {
            throw new Error('Usuário não encontrado.');
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
            throw new Error('Usuário não encontrado.');
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
            throw new Error('Usuário ou amigo não encontrado.');
        }

        const isFriendAlreadyAdded = user.friends.some(f => f.username === friend.username);

        if (isFriendAlreadyAdded) {
            throw new Error('Este usuário já é seu amigo.');
        }

        user.friends.push({ username: friend.username });
        await user.save();

        return { message: 'Amigo adicionado com sucesso.' };
    } catch (error) {
        console.error('Erro ao adicionar o amigo no serviço:', error);
        throw new Error('Ocorreu um erro ao adicionar o amigo. Por favor, tente novamente mais tarde.');
    }
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
};
