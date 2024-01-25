const express = require("express");
const route = express.Router();
const postController = require('../controllers/Post.controller');
const { authMiddleware } = require('../middlewares/auth.middlewares');
const { validPostId, checkModerator,checkPostOwner,validModeratorOrOwner} = require('../middlewares/global.middlewares');


route.post("/",authMiddleware, postController.createPost);
route.get("/", postController.findAllPosts);
route.get("/:idPost",validPostId, postController.findById);
route.get("/search/:username", postController.findByUsername);
route.post("/comentario",authMiddleware, postController.addCommentToPost);
route.post("/curtida",authMiddleware, postController.toggleLikeOnPost);
route.delete("/delete/:idPost",authMiddleware,validModeratorOrOwner,postController.deletePost)

module.exports = route;
