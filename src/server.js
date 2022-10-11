import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouters from "./routers/auth.router.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use(authRouters);

app.listen(process.env.PORT, () => {
  console.log(`Magic happens on ${process.env.PORT}`);
});