import { Router } from "express";
import { createPost, deletePost, getPosts, showPost, updatePost, searchPost } from "../controller/PostController.js";


const router = Router();
router.route("/").get(getPosts).post(createPost);
router.get('/search', searchPost)
router.delete("/:id", deletePost);
router.put("/:id", updatePost);
router.get("/:id", showPost);


// * Search route
export default router;