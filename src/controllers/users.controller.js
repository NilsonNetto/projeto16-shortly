import connection from "../db/db.js";

const listUser = async (req, res) => {

  try {

    const userData = (await connection.query(`
    SELECT 
    u1.id, 
    u1.name, 
    SUM(u2."visitCount") AS "visitCount"
    FROM users u1 
    JOIN urls u2 
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

    //tem aquele caso o usuário não existe, mas acho que deve ser se não houver links dele
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
    u2.id, 
    u2.name, 
    COUNT(u1."userId") AS "linksCount", 
    SUM(u1."visitCount") AS "visitCount" 
    FROM urls u1 
    JOIN users u2 
    ON u1."userId" = u2.id 
    GROUP BY u2.id 
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