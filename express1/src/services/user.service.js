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

module.exports = {
    create,
    findAllServices,
    findByIdService,
    findByUsernameService,
    updateService,
};
