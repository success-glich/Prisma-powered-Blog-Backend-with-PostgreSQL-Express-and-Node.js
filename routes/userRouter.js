import { Router } from "express";
import { createUser, deleteUser, getUsers, showUser, updateUser } from "../controller/UserController.js";


const router = Router();
router.route("/").get(getUsers).post(createUser);
router.put("/:id", updateUser);
router.get("/:id", showUser);

router.delete("/:id", deleteUser);


export default router;