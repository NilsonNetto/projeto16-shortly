import connection from "../db/db.js";

const listUser = async (req, res) => {

  try {

    const userData = (await connection.query(`
    SELECT 
    u1.id, 
    u1.name, 
    SUM(COALESCE(u2."visitCount",0)) AS "visitCount"
    FROM users u1 
    LEFT JOIN urls u2 
    ON u1.id = u2."userId" 
    WHERE u1.id = $1 
    GROUP BY u1.id ;`,
      [res.locals.userId])).rows[0];

    const userShortenedUrls = (await connection.query(`
    SELECT 
    id, "shortUrl", url, "visitCount" 
    FROM urls
    WHERE "userId" = $1;`,
      [res.locals.userId])).rows;

    const response = {
      ...userData,
      shortenedUrls: userShortenedUrls
    };

    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};


const listRanking = async (req, res) => {

  try {

    const ranking = (await connection.query(`
    SELECT 
    u1.id, 
    u1.name, 
    COUNT(u2."userId") AS "linksCount", 
    SUM(COALESCE(u2."visitCount",0)) AS "visitCount" 
    FROM users u1 
    LEFT JOIN urls u2 
    ON u1.id = u2."userId" 
    GROUP BY u1.id 
    ORDER BY "visitCount" DESC 
    LIMIT 10; 
    `)).rows;

    res.status(200).send(ranking);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

export { listUser, listRanking };