const Post = require("../models/Post");

const create = async (body) => {
    return Post.create(body);
};

const findAllServices = () => {
    return Post.find();
};

const findByIdService = (id) => {
    return Post.findById(id)
    
}
const findByUsernameService = async (body) => {
    try {
        const { username } = body;
        const userPosts = await Post.find({ username: { $regex: new RegExp(username, 'i') } });
        return userPosts;
    } catch (error) {
        throw new Error(`Erro ao buscar posts por username: ${error.message}`);
    }
};

const deletePostById = async (postId) => {
    return Post.findOneAndDelete({ _id: postId });
};

const deleteAllPostsByUserId = async (userId) =>{
    return Post.deleteMany({id_user: userId})
}

module.exports = { create, findAllServices, findByUsernameService,findByIdService,deletePostById,deleteAllPostsByUserId};
