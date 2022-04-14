import mongoose from "mongoose"
import config from "./config.js";

let db;

try {

   db = mongoose.connect(`mongodb+srv://${config.user}:${config.password}@cluster0.6gbsk.mongodb.net/boca2021?retryWrites=true&w=majority`);
   console.log("Connected to MongoDB");

} catch (error) {

   console.log(error);

};

export default db;