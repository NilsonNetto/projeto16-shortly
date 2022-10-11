import pg from "pg";

const { Pool } = pg;

const databaseConfig = {
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: '123456',
  database: 'shortly'
};

const connection = new Pool(databaseConfig);

export default connection;