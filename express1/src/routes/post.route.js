const express = require("express");
const route = express.Router();
const postController = require('../controllers/Post.controller');

route.post("/", postController.createPost);
route.get("/", postController.findAllPosts);
route.get("/:id", postController.findById);
route.get("/feed", postController.findByUsername);
route.post("/comentario",postController.addCommentToPost);
route.post("/curtida",postController.toggleLikeOnPost);

module.exports = route;
