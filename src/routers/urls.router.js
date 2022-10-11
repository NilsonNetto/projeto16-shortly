import express from "express";
import * as urlsControllers from "../controllers/urls.controller.js";
import tokenValidation from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/urls/shorten', tokenValidation, urlsControllers.shortenUrl);

router.get('/urls/open/:shortUrl', urlsControllers.redirectUrl);

export default router;
