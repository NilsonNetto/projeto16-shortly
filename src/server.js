import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouters from "./routers/auth.router.js";
import urlsRouters from "./routers/urls.router.js";
import usersRouters from "./routers/users.router.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(authRouters);

app.use(urlsRouters);

app.use(usersRouters);

app.listen(process.env.PORT, () => {
  console.log(`Magic happens on ${process.env.PORT}`);
});