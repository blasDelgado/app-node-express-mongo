import { config } from "dotenv"

config();

export default {

    secret: process.env.token,
    password: process.env.databasePassword,
    user: process.env.databaseUser

};