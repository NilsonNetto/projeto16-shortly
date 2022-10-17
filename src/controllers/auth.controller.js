import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import connection from "../db/db.js";

const createUser = async (req, res) => {
  const { name, email, password } = res.locals.body;

  const passwordHash = bcrypt.hashSync(password, 13);

  try {
    await connection.query(`
    INSERT INTO users 
    (name, email, "passwordHash") 
    VALUES ($1,LOWER($2),$3);`,
      [name, email, passwordHash]);

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const createSession = async (req, res) => {
  const { password, userId, passwordHash } = res.locals.body;

  try {

    const passwordValidation = bcrypt.compareSync(password, passwordHash);

    if (passwordValidation) {
      const token = nanoid();

      await connection.query(`
      INSERT INTO sessions
      ("userId", token)
      VALUES ($1,$2);`,
        [userId, token]);

      return res.status(200).send({ token });
    }
    return res.sendStatus(401);;
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const endSession = async (req, res) => {

  try {
    await connection.query(`
    DELETE FROM sessions 
    WHERE token = $1;`,
      [res.locals.token]);

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export { createUser, createSession, endSession };