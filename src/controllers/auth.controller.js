import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import connection from "../db/db.js";


const createUser = async (req, res) => {
  const { name, email, password, confirPassword } = req.body;

  const passwordHash = bcrypt.hashSync(password, 13);

  try {
    await connection.query(`
    INSERT INTO users 
    (name, email, "passwordHash") 
    VALUES ($1,$2,$3)`,
      [name, email, passwordHash]);

    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const createSession = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = (await connection.query(`
    SELECT * 
    FROM users 
    WHERE email = $1`,
      [email])).rows[0];

    const passwordValidation = bcrypt.compareSync(password, user.passwordHash);

    if (passwordValidation) {
      const token = nanoid();
      await connection.query(`
      INSERT INTO sessions
      ("userId", token)
      VALUES ($1,$2)`,
        [user.id, token]);

      return res.status(200).send(token);
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
    WHERE token = $1`,
      [res.locals.token]);

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export { createUser, createSession, endSession };