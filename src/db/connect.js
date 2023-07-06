import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const connection = mysql.createPool(JSON.parse(process.env.MY_CONFIG));

const getConnection = () => {
  return connection;
};

export default getConnection;
