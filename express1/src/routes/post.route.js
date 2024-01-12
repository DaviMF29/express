const express = require("express");
const route = express.Router();
const postController = require('../controllers/Post.controller');
const { authMiddleware } = require('../middlewares/auth.middlewares');


route.post("/",authMiddleware, postController.createPost);
route.get("/", postController.findAllPosts);
route.get("/:id",authMiddleware, postController.findById);
route.get("/feed",authMiddleware, postController.findByUsername);
route.post("/comentario",authMiddleware, postController.addCommentToPost);
route.post("/curtida",authMiddleware, postController.toggleLikeOnPost);

module.exports = route;
