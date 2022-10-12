import express from "express";
import * as usersController from "../controllers/users.controller.js";
import tokenValidation from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get('/users/me', tokenValidation, usersController.listUser);

router.get('/ranking', usersController.listRanking);

export default router;
