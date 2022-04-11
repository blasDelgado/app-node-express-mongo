import mongoose from "mongoose"
import config from "./config";

mongoose.connect(

   `mongodb+srv://${config.user}:${config.password}@cluster0.6gbsk.mongodb.net/boca2021?retryWrites=true&w=majority`
)
   .then((db) => console.log('DB is connected'))
   .catch((e) => console.error(e));


