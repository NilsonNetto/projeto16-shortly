import connection from "../db/db.js";
import joi from "joi";

const signupSchema = joi.object({
  name: joi.string().min(3).trim().required(),
  email: joi.string().email().trim().required(),
  password: joi.string().min(6).trim().required(),
  confirmPassword: joi.any().valid(joi.ref('password'))
    .required()
    .label('Confirm password')
    .options({ messages: { 'any.only': '{{#label}} does not match' } })
}).unknown(false);

const newUserValidation = async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  const validation = signupSchema.validate({
    name,
    email,
    password,
    confirmPassword
  }, { abortEarly: false });

  if (validation.error) {
    const errors = validation.error.details.map(error => error.message);
    return res.status(422).send(errors);
  }

  try {

    const isRepeated = (await connection.query(`SELECT id FROM users WHERE email = $1`, [email])).rows[0];

    if (isRepeated) {
      return res.sendStatus(409);
    }

    res.locals.body = { name, email, password };
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export default newUserValidation;