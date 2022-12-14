import { nanoid } from "nanoid";
import connection from "../db/db.js";

const shortenUrl = async (req, res) => {
  const { url } = res.locals;

  const shortUrl = nanoid(13);

  try {
    await connection.query(`
    INSERT INTO urls 
    ("userId","shortUrl", url) 
    VALUES ($1,$2,$3);`,
      [res.locals.userId, shortUrl, url]);


    res.status(201).send({ shortUrl });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const redirectUrl = async (req, res) => {
  const { shortUrl } = req.params;

  try {
    const url = await connection.query(`
    SELECT id, url
    FROM urls 
    WHERE "shortUrl" = $1;`,
      [shortUrl]);

    if (url.rowCount === 0) {
      return res.sendStatus(404);
    }

    await connection.query(`
    UPDATE urls
     SET
     "visitCount" = "visitCount" + 1,
     "lastVisit" = NOW() 
     WHERE id = $1;`,
      [url.rows[0].id]);

    res.redirect(url.rows[0].url);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }

};

const viewUrl = async (req, res) => {
  const urlId = req.params.id;

  try {

    const url = await connection.query(`
    SELECT id, "shortUrl", url 
    FROM urls 
    WHERE id = $1;`,
      [urlId]);

    if (url.rowCount === 0) {
      return res.sendStatus(404);
    }

    res.status(200).send(url.rows[0]);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

const deleteUrl = async (req, res) => {
  const urlId = req.params.id;

  try {
    const url = await (connection.query(`
    SELECT id, "userId" 
    FROM urls 
    WHERE id = $1;`,
      [urlId]));

    if (url.rowCount === 0) {
      return res.sendStatus(404);
    }
    if (url.rows[0].userId === res.locals.userId) {
      await connection.query(`
      DELETE FROM urls 
      WHERE id = $1;`,
        [urlId]);
      return res.sendStatus(204);
    }
    res.sendStatus(401);

  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export { shortenUrl, redirectUrl, viewUrl, deleteUrl };