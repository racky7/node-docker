const express = require("express")

const postController = require("../controllers/postController")

const protect = require("../middleware/authMiddleware")

const {getAllPosts, getOnePost, createPost, updatePost, deletePost} = postController

const router = express.Router()

router
    .route("/")
    .get(getAllPosts)
    .post(protect, createPost)

router
    .route("/:id")
    .get(getOnePost)
    .patch(protect, updatePost)
    .delete(protect, deletePost)

module.exports = router