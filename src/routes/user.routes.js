import {Router} from "express";
import { registerUser } from "../controllers/user.controller.js";
const router= Router()
router.route("/register").post(registerUser)
//Frontend calls POST http://localhost:5000/users/register with user data.
//Express finds this line → runs registerUser to save the user.
export default router