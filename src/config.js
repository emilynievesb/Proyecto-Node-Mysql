import dotenv from "dotenv";

dotenv.config();

const config = JSON.parse(process.env.MY_SERVER);

export default config;
