import express from "express";
import * as urlsControllers from "../controllers/urls.controller.js";
import tokenValidation from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post('/urls/shorten', tokenValidation, urlsControllers.shortenUrl);

router.get('/urls/:id', urlsControllers.viewUrl);

router.get('/urls/open/:shortUrl', urlsControllers.redirectUrl);

router.delete('/urls/:id', tokenValidation, urlsControllers.deleteUrl);

export default router;
