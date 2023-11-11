import { Router } from "express";
import userRoutes from "./userRouter.js";
import postRoutes from "./postRouter.js";
import commentRoutes from "./commentRoutes.js";
const router = Router();

router.use("/api/user", userRoutes);

// * For Post Routes
router.use("/api/post", postRoutes);


// * For Comment Routes
router.use("/api/comment", commentRoutes);


export default router;