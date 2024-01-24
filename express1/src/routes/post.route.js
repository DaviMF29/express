const express = require("express");
const route = express.Router();
const postController = require('../controllers/Post.controller');
const { authMiddleware } = require('../middlewares/auth.middlewares');
const { validPostId} = require('../middlewares/global.middlewares');


route.post("/",authMiddleware, postController.createPost);
route.get("/", postController.findAllPosts);
route.get("/:idPost",validPostId, postController.findById);
route.get("/search/:username", postController.findByUsername);
route.post("/comentario",authMiddleware, postController.addCommentToPost);
route.post("/curtida",authMiddleware, postController.toggleLikeOnPost);
route.post("/delete",authMiddleware,postController.deletePost)

module.exports = route;
