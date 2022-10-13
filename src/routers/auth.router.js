import express from "express";
import * as authController from "../controllers/auth.controller.js";
import newUserValidation from "../middlewares/newUser.middleware.js";
import newSessionValidation from "../middlewares/newSession.middleware.js";
import tokenValidation from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/signup', newUserValidation, authController.createUser);

router.post('/signin', newSessionValidation, authController.createSession);

router.post('/signout', tokenValidation, authController.endSession);

export default router;
