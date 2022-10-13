import connection from "../db/db.js";
import joi from "joi";

const signinSchema = joi.object({
  email: joi.string().email().trim().required(),
  password: joi.string().min(6).trim().required()
}).unknown(false);


const newSessionValidation = async (req, res, next) => {
  const { email, password } = req.body;

  const validation = signinSchema.validate({
    email,
    password,
  }, { abortEarly: false });

  if (validation.error) {
    const errors = validation.error.details.map(error => error.message);
    return res.status(422).send(errors);
  }

  try {

    const userExists = (await connection.query(`
    SELECT
    id, "passwordHash" 
    FROM users 
    WHERE email = $1`,
      [email])).rows[0];

    if (!userExists) {
      return res.sendStatus(401);
    }

    res.locals.body = {
      password,
      userId: userExists.id,
      passwordHash: userExists.passwordHash
    };
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export default newSessionValidation;