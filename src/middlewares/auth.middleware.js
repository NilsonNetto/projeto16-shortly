import connection from "../db/db.js";

const tokenValidation = async (req, res, next) => {
  const { authorization } = req.headers;

  const token = authorization?.replace('Bearer ', '');

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    const session = (await connection.query(`SELECT * FROM sessions WHERE token = $1`, [token])).rows[0];

    if (!session) {
      return res.sendStatus(401);
    }

    res.locals.userId = session.userId;
    res.locals.token = session.token;
    next();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export default tokenValidation;