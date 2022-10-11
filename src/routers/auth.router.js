import express from "express";
import * as authController from "../controllers/auth.controller.js";
import tokenValidation from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/signup', authController.createUser);

router.post('/signin', authController.createSession);

router.post('/signout', tokenValidation, authController.endSession);

export default router;
