import { Router } from "express";
import { createComment } from "../controller/CommentController.js";


const router = Router();
router.route("/").post(createComment);
// router.put("/:id", updatePost);
// router.get("/:id", showPost);

// router.delete("/:id", deletePost);


export default router;