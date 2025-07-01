import express from 'express';

import {createUser, loginUser,logOutCurrentUser} from '../controllers/userController.js'
const router = express.Router();

router.route("/").post(createUser);


router.post("/auth", loginUser);

router.post("/logout", logOutCurrentUser)

export default router;