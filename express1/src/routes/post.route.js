const express = require("express");
const router = express.Router();
const postController = require('../controllers/Post.controller');

router.post("/", postController.createPost);
router.get("/", postController.findAllPosts);
router.post("/feed", postController.findByUsername);
router.post("/comentario",postController.addCommentToPost)
router.post("/curtida",postController.toggleLikeOnPost)

module.exports = router;
