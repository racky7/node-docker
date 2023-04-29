const express = require("express")

const postController = require("../controllers/postController")

const {getAllPosts, getOnePost, createPost, updatePost, deletePost} = postController

const router = express.Router()

router
    .route("/")
    .get(getAllPosts)
    .post(createPost)

router
    .route("/:id")
    .get(getOnePost)
    .patch(updatePost)
    .delete(deletePost)

module.exports = router